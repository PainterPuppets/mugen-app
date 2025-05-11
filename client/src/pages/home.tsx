import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bookmark, BookOpen, Shield, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">无限恐怖</span>
          <span className="ml-2">角色管理系统</span>
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          创建你的角色，管理属性和技能，开始冒险之旅
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/characters/create">
            <Button size="lg" className="mr-4">
              创建新角色
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/characters">
            <Button variant="outline" size="lg">
              查看角色列表
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <Shield className="h-10 w-10 text-primary mb-2" />
            <CardTitle>角色属性</CardTitle>
            <CardDescription>管理角色的基本属性和派生属性</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              为你的角色分配力量、敏捷、体质等基本属性，系统将自动计算派生属性。
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/characters/create">
              <Button variant="ghost" className="text-primary">
                开始创建
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-2" />
            <CardTitle>技能系统</CardTitle>
            <CardDescription>分配技能点数并选择专业方向</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              在格斗、射击、调查等技能上分配点数，并选择更加专业的方向来定制你的角色。
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/characters/create">
              <Button variant="ghost" className="text-primary">
                开始创建
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Bookmark className="h-10 w-10 text-primary mb-2" />
            <CardTitle>物品管理</CardTitle>
            <CardDescription>管理角色的装备和道具</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              查看和管理角色的背包物品和已装备的装备，了解其属性加成和特殊效果。
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/characters">
              <Button variant="ghost" className="text-primary">
                查看角色
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 rounded-2xl p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">准备好开始冒险了吗？</h2>
        <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
          无论你是想创建一个强力战士、敏捷的弓箭手，还是神秘的法师，
          这个系统都能帮助你轻松管理角色的各项属性和能力。
        </p>
        <Link href="/characters/create">
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
            立即创建角色
          </Button>
        </Link>
      </div>
    </div>
  );
}
