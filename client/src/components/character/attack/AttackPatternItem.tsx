import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash } from "lucide-react";
import { DamageTypeMap, DamageDegreeMap } from '@/types/character';
import { IMugenCharacter, IMugenAttack } from '@/types/mugen';
import { EquipmentAffixMap } from '@/types/inventory';


interface AttackPatternItemProps {
  attackPattern: IMugenAttack;
  character: IMugenCharacter;
  action?: React.ReactNode;
  onUpdate?: (attackPattern: IMugenAttack) => void;
  onDelete?: (id: number) => void;
}

export default function AttackPatternItem({
  attackPattern,
  character,
  action,
  onUpdate,
  onDelete
}: AttackPatternItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // This is a simplified version - the original had complex rule rendering logic
  // You would need to implement the proper rule rendering based on your data structure
  const renderRuleValue = (value: number) => {
    return value;
  };
  
  const handleDelete = async () => {
    try {
      // Replace with your Context API call
      // await AttackPatternStore.delete(attackPattern.id)
      if (onDelete) {
        onDelete(attackPattern.id);
      }
      toast({
        title: "成功",
        description: "攻击预设已删除",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "删除攻击预设失败",
        variant: "destructive",
      });
    }
  };
  
  const handleUpdate = async (values: any) => {
    try {
      // Replace with your Context API call
      // const response = await AttackPatternStore.update(attackPattern.id, values)
      if (onUpdate) {
        // Mocked response
        onUpdate({...attackPattern, ...values});
      }
      toast({
        title: "成功",
        description: "攻击预设已更新",
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "错误",
        description: "更新攻击预设失败",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{attackPattern.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                  <AlertDialogDescription>
                    确认要删除该攻击预设吗？此操作无法撤销。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    删除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">攻击规则</h4>
            <div className="grid grid-cols-3 gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 bg-muted rounded-md">
                      <div className="text-xs text-muted-foreground">攻击检定(dp)</div>
                      <div className="font-medium">{renderRuleValue(attackPattern.attackCheckRule.value)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>攻击检定规则详情</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 bg-muted rounded-md">
                      <div className="text-xs text-muted-foreground">额外成功</div>
                      <div className="font-medium">{renderRuleValue(attackPattern.attackAdditionSuccessRule.value)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>额外成功规则详情</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-2 bg-muted rounded-md">
                      <div className="text-xs text-muted-foreground">攻击上限</div>
                      <div className="font-medium">{renderRuleValue(attackPattern.limitRule.value)}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>攻击上限规则详情</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">伤害</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">伤害类型</div>
                <div className="font-medium">{DamageTypeMap[attackPattern.damageType]}</div>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">伤害级别</div>
                <div className="font-medium">{DamageDegreeMap[attackPattern.damageDegree]}</div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">参数</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">高速</div>
                <div className="font-medium">{attackPattern.highSpeed}</div>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">破甲</div>
                <div className="font-medium">{attackPattern.armorPenetration}</div>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <div className="text-xs text-muted-foreground">破魔</div>
                <div className="font-medium">{attackPattern.magicPenetration}</div>
              </div>
            </div>
          </div>
          
          {attackPattern.affixes.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="text-sm font-medium">词缀</h4>
                <div className="flex flex-wrap gap-1">
                  {attackPattern.affixes.map((affix) => (
                    <TooltipProvider key={affix}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="secondary">{EquipmentAffixMap[affix]}</Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>词缀详情</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
        
        {action && (
          <CardFooter className="border-t pt-4">
            {action}
          </CardFooter>
        )}
      </Card>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>编辑攻击预设</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {/* Replace with your actual AttackPatternForm component */}
            <p className="text-center py-10">攻击预设编辑表单</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => handleUpdate({})}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}