import { useEffect } from "react";
import { useParams } from "wouter";
import { useCharacter } from "@/contexts/CharacterContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CharacterAttribute from "@/components/character/CharacterAttribute";
import CharacterExchangeRecord from "@/components/character/CharacterExchangeRecord";

export default function CharacterDetailPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const { characterDetail, loading, fetchCharacterDetail, detailReady } = useCharacter();

  useEffect(() => {
    if (uuid) {
      fetchCharacterDetail(uuid);
    }
  }, [uuid, fetchCharacterDetail]);

  if (loading && !characterDetail) {
    return (
      <div className="container py-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </div>
    );
  }

  if (!characterDetail) {
    return (
      <div className="container py-8">
        <div className="text-center py-20">
          <h1 className="text-xl font-medium">未找到角色信息</h1>
          <p className="text-gray-500 mt-2">请尝试刷新页面或检查角色ID是否正确</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{characterDetail.name}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            编辑角色
          </Button>
          <Button variant="default">
            特殊能力
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">角色资源</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-sm font-medium text-gray-500">经验</div>
              <div className="text-2xl font-bold">{characterDetail.experience}</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-sm font-medium text-gray-500">积分</div>
              <div className="text-2xl font-bold">{characterDetail.credit}</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="text-sm font-medium text-gray-500">支线点</div>
              <div className="text-2xl font-bold">{characterDetail.branchPoint}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="attributes" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="attributes">角色属性</TabsTrigger>
          <TabsTrigger value="inventory">背包物品</TabsTrigger>
          <TabsTrigger value="exchange">兑换记录</TabsTrigger>
          <TabsTrigger value="overview">角色概览</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attributes">
          <CharacterAttribute />
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium">物品背包</h3>
            <p className="text-gray-500 mt-2">物品背包功能正在开发中...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="exchange">
          <CharacterExchangeRecord />
        </TabsContent>
        
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                  <img 
                    src={characterDetail.figureUrl} 
                    alt={characterDetail.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="col-span-2">
                  <h2 className="text-xl font-bold mb-2">{characterDetail.name}</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-gray-500">性别：</span>
                      <span>{characterDetail.gender === "male" ? "男" : "女"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">身高：</span>
                      <span>{characterDetail.height}cm</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">角色外貌</h3>
                    <p className="text-gray-700">{characterDetail.appearance}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">角色概述</h3>
                    <p className="text-gray-700">{characterDetail.overview}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}