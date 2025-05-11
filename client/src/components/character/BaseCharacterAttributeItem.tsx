import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PlusIcon } from "lucide-react";
import { useCharacter } from "@/contexts/CharacterContext";
import { IMugenCharacter, BaseAttributeType } from "@/types/character";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AttributeMapType {
  [key: string]: string;
}

// Placeholder for AttributeMap - replace with actual values
const AttributeMap: AttributeMapType = {
  strength: "力量",
  dexterity: "敏捷",
  constitution: "体质",
  intelligence: "智力",
  perception: "感知",
};

// Replace with actual implementation
const getLegendKey = (key: string) => `legend_${key}`;
const getBaseKey = (key: string) => key;

interface BaseCharacterAttributeItemProps {
  character: IMugenCharacter;
  attribute: BaseAttributeType;
}

export default function BaseCharacterAttributeItem({ 
  character, 
  attribute 
}: BaseCharacterAttributeItemProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { refreshCharacterData, upgradeAttribute } = useCharacter();
  const { toast } = useToast();

  const getAttributeUpgradCredit = (attrValue: number) => {
    return attrValue * 200;
  };

  const getAttributeUpgradExp = (attrValue: number) => {
    return attrValue * 4;
  };

  const handleUpgrade = async (method: "credit" | "experience") => {
    setLoading(true);
    setIsOpen(false);
    try {
      await upgradeAttribute(character.uuid, attribute, method);
      toast({
        title: "成功",
        description: "升级属性成功",
      });
      await refreshCharacterData();
    } catch (error) {
      toast({
        title: "错误",
        description: "升级属性失败",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canUpgradeWithCredit = character.credit >= getAttributeUpgradCredit(character.attributes[attribute]);
  const canUpgradeWithExp = character.experience >= getAttributeUpgradExp(character.attributes[attribute]);
  const canUpgrade = canUpgradeWithCredit || canUpgradeWithExp;

  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-medium text-gray-700">{AttributeMap[attribute]}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>属性说明</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center space-x-3">
        {character.attributes[getLegendKey(attribute)] > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-primary font-bold">
                  {character.attributes[getLegendKey(attribute)]}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>传奇属性</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        <span className="font-semibold text-lg">{character.attributes[attribute]}</span>
        
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-6 w-6 rounded-full"
              disabled={!canUpgrade}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="flex flex-col space-y-2">
              <Button
                variant="default"
                className="w-full"
                disabled={!canUpgradeWithCredit || loading}
                onClick={() => handleUpgrade("credit")}
              >
                花费 {getAttributeUpgradCredit(character.attributes[getBaseKey(attribute)])} 点积分提升1级
              </Button>
              <Button
                variant="default"
                className="w-full"
                disabled={!canUpgradeWithExp || loading}
                onClick={() => handleUpgrade("experience")}
              >
                花费 {getAttributeUpgradExp(character.attributes[getBaseKey(attribute)])} 点经验提升1级
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}