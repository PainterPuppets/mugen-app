import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { CharacterCreateProvider, useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Gender, GenderMap } from "@/types/character";
import CharacterCreateAttributePanel from "@/components/character/create/CharacterCreateAttributePanel";
import CharacterCreateSkillPanel from "@/components/character/create/CharacterCreateSkillPanel";
import { checkAttributes } from "@/components/character/create/CharacterCreateAttributePanel";
import { checkSkills } from "@/components/character/create/CharacterCreateSkillPanel";

const STEP_LABELS = ["基础信息", "属性分配", "技能分配", "完成"];

function CharacterCreatePageContent() {
  const {
    step,
    setStep,
    name,
    setName,
    gender,
    setGender,
    figureUrl,
    setFigureUrl,
    height,
    setHeight,
    appearance,
    setAppearance,
    overview,
    setOverview,
    attributes,
    skills,
    getCreateData
  } = useCharacterCreate();
  
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const handleNext = () => {
    // Validate current step
    if (step === 0) {
      if (!name) {
        toast({
          title: "错误",
          description: "请输入角色名称",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 1) {
      if (!checkAttributes(attributes)) {
        toast({
          title: "错误",
          description: "属性点数未分配完毕，请确保所有点数都已分配",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!checkSkills(skills)) {
        toast({
          title: "错误",
          description: "技能点数或专业点数未分配完毕，请确保所有点数都已分配",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Go to next step
    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1);
    }
  };
  
  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      const data = getCreateData();
      console.log("提交角色创建数据:", data);
      
      // 这里应该调用API创建角色
      // const response = await apiRequest('/api/characters', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // });
      
      toast({
        title: "成功",
        description: "角色创建成功！",
      });
      
      // Navigate to character list page
      navigate("/characters");
    } catch (error) {
      toast({
        title: "错误",
        description: "创建角色失败，请重试",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="border shadow-md bg-card">
        <CardHeader>
          <CardTitle className="text-2xl">创建新角色</CardTitle>
          <CardDescription>
            按照步骤创建你的角色，填写必要信息
          </CardDescription>
          
          <div className="mt-4">
            <Progress value={((step + 1) / STEP_LABELS.length) * 100} className="h-2" />
            <div className="flex justify-between mt-2">
              {STEP_LABELS.map((label, index) => (
                <div 
                  key={index} 
                  className={`text-sm ${index <= step ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">角色名称</Label>
                  <Input
                    id="name"
                    placeholder="输入角色名称"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-base">性别</Label>
                  <Select value={gender} onValueChange={(value) => setGender(value as Gender)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Gender.M}>{GenderMap[Gender.M]}</SelectItem>
                      <SelectItem value={Gender.F}>{GenderMap[Gender.F]}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="figureUrl" className="text-base">角色形象链接</Label>
                <Input
                  id="figureUrl"
                  placeholder="输入角色形象图片URL"
                  value={figureUrl}
                  onChange={(e) => setFigureUrl(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height" className="text-base">身高 (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="输入角色身高"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="appearance" className="text-base">外貌描述</Label>
                <Textarea
                  id="appearance"
                  placeholder="描述角色的外貌特征"
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="overview" className="text-base">角色概述</Label>
                <Textarea
                  id="overview"
                  placeholder="描述角色的背景故事、性格特点等"
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          )}
          
          {step === 1 && (
            <CharacterCreateAttributePanel />
          )}
          
          {step === 2 && (
            <CharacterCreateSkillPanel />
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">角色创建完成</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">基本信息</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-muted-foreground">名称:</span> {name}
                    </div>
                    <div>
                      <span className="text-muted-foreground">性别:</span> {GenderMap[gender]}
                    </div>
                    <div>
                      <span className="text-muted-foreground">身高:</span> {height} cm
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">属性</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(attributes).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-muted-foreground">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">技能</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(skills).filter(([_, skill]) => skill.grade > 0).map(([key, skill]) => (
                      <div key={key} className="p-2 bg-muted/40 rounded-md">
                        <div className="font-medium">{key} (等级: {skill.grade})</div>
                        {skill.majors.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {skill.majors.map((major) => (
                              <Badge key={major} variant="outline" className="text-xs">
                                {major}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-2">外貌描述</h3>
                  <p className="text-muted-foreground">{appearance || "无"}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">角色概述</h3>
                  <p className="text-muted-foreground">{overview || "无"}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={step === 0}
          >
            上一步
          </Button>
          
          {step < STEP_LABELS.length - 1 ? (
            <Button onClick={handleNext}>下一步</Button>
          ) : (
            <Button onClick={handleSubmit}>提交</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default function CharacterCreatePage() {
  return (
    <CharacterCreateProvider>
      <CharacterCreatePageContent />
    </CharacterCreateProvider>
  );
}