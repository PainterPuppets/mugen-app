import { useCharacter } from "@/contexts/CharacterContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CharacterScrollPanel from "./CharacterScrollPanel";
import { EquipmentPositionMap } from "@/types/inventory";

// This is a simplified version of the GoodsPopover component
function GoodsPopover({ goods }: { goods: any }) {
  return (
    <div className="w-80 max-w-sm">
      <h4 className="font-bold mb-1">{goods.name}</h4>
      <p className="text-sm text-muted-foreground mb-2">{goods.description}</p>
      
      {goods.bonuses && goods.bonuses.length > 0 && (
        <div className="mb-2">
          <h5 className="text-sm font-medium mb-1">属性加成:</h5>
          <div className="flex flex-wrap gap-1">
            {goods.bonuses.map((bonus: any, index: number) => (
              <Badge key={index} variant="outline">
                {bonus.key}: +{bonus.value}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {goods.affixes && goods.affixes.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-1">词缀:</h5>
          <div className="flex flex-wrap gap-1">
            {goods.affixes.map((affix: string, index: number) => (
              <Badge key={index}>{affix}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// This is a simplified version of the InventoryItem component
function InventoryItem({ inventory, onRefresh }: { inventory: any; onRefresh: () => void }) {
  return (
    <Card className="mb-3">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{inventory.goods.name}</CardTitle>
            <CardDescription>数量: {inventory.stock}</CardDescription>
          </div>
          <Badge variant={inventory.isEquipped ? "default" : "outline"}>
            {inventory.isEquipped ? "已装备" : "未装备"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">{inventory.goods.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                装备
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>点击装备物品</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">
                使用
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>点击使用物品</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive border-destructive">
                丢弃
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>点击丢弃物品</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}

export default function CharacterInventory() {
  const { characterDetail, loading, refreshCharacterData } = useCharacter();

  if (loading || !characterDetail) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="col-span-1">
        <CharacterScrollPanel title="装备">
          <div className="space-y-2">
            {characterDetail.equipmentSlots && characterDetail.equipmentSlots.map((slot, index) => {
              if (slot.goods) {
                return (
                  <TooltipProvider key={`${slot.position}-${index}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex justify-between items-center p-3 bg-muted rounded-md cursor-pointer hover:bg-muted/80 transition-colors">
                          <span className="text-sm font-medium">{EquipmentPositionMap[slot.position]}</span>
                          <span className="text-sm">{slot.goods.name}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="start" className="p-0">
                        <GoodsPopover goods={slot.goods} />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              }

              return (
                <div 
                  key={`${slot.position}-${index}`}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-md"
                >
                  <span className="text-sm font-medium">{EquipmentPositionMap[slot.position]}</span>
                  <span className="text-sm text-muted-foreground">空</span>
                </div>
              );
            })}
          </div>
        </CharacterScrollPanel>
      </div>
      
      <div className="col-span-1 md:col-span-2">
        <CharacterScrollPanel title="背包">
          {!characterDetail.inventories || characterDetail.inventories.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>背包没有物品</AlertDescription>
            </Alert>
          ) : (
            characterDetail.inventories.map((inventory) => (
              <InventoryItem
                key={inventory.goods.uuid}
                inventory={inventory}
                onRefresh={refreshCharacterData}
              />
            ))
          )}
        </CharacterScrollPanel>
      </div>
    </div>
  );
}