import { useEffect } from "react";
import { Link } from "wouter";
import { useCharacter } from "@/contexts/CharacterContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, User, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";

export default function CharacterListPage() {
  const {
    characters,
    loading,
    initialized,
    initCharacterList,
    delete: deleteCharacter,
  } = useCharacter();
  const { toast } = useToast();

  useEffect(() => {
    if (!initialized) {
      initCharacterList();
    }
  }, [initialized, initCharacterList]);

  const handleDeleteCharacter = async (uuid: string) => {
    try {
      await deleteCharacter(uuid);
      toast({
        title: "成功",
        description: "角色已成功删除",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "删除角色时出错",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">我的角色</h1>
        <Link href="/characters/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建角色
          </Button>
        </Link>
      </div>

      {loading && !initialized ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[180px] w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : characters.length === 0 ? (
        <div className="text-center py-20 border rounded-lg">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-lg font-medium">没有角色</h2>
          <p className="mt-2 text-gray-500">点击"创建角色"按钮来开始你的冒险</p>
          <Link href="/characters/create">
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              创建角色
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card key={character.uuid} className="overflow-hidden">
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${character.figureUrl})` }}
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{character.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-more-vertical"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        编辑角色
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除角色
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>确认删除</AlertDialogTitle>
                            <AlertDialogDescription>
                              您确定要删除角色"{character.name}
                              "吗？此操作无法撤销。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>取消</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteCharacter(character.uuid)
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              删除
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">积分:</span>
                    <span className="font-medium">{character.credit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">经验:</span>
                    <span className="font-medium">{character.experience}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/character/${character.uuid}`}>
                  <Button className="w-full">查看详情</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
