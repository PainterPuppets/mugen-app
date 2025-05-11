import { useState } from "react";
import { useCharacter } from "@/contexts/CharacterContext";
import { BaseAttributeType } from "@/types/character";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import CharacterScrollPanel from "./CharacterScrollPanel";
import CharacterAttributeValue from "./CharacterAttributeValue";
import BaseCharacterAttributeItem from "./BaseCharacterAttributeItem";

// Define attribute arrays (replace with your actual attribute lists)
const BaseAttribute: BaseAttributeType[] = [
  BaseAttributeType.Strength,
  BaseAttributeType.Dexterity,
  BaseAttributeType.Constitution,
  BaseAttributeType.Intelligence,
  BaseAttributeType.Perception,
];

const DerivedAttribute: string[] = [
  "size",
  "willpower",
  "initiative",
];

const DefenseAttribute: string[] = [
  "physical_defense",
  "magical_defense",
];

const AttributeMap: Record<string, string> = {
  [BaseAttributeType.Strength]: "力量",
  [BaseAttributeType.Dexterity]: "敏捷",
  [BaseAttributeType.Constitution]: "体质",
  [BaseAttributeType.Intelligence]: "智力",
  [BaseAttributeType.Perception]: "感知",
  "size": "体型",
  "willpower": "意志",
  "initiative": "先攻",
  "physical_defense": "物理防御",
  "magical_defense": "魔法防御",
};

// Placeholder for SkillCategory and related data
enum SkillCategory {
  Physiology = "physiology",
  Mental = "mental",
  Interaction = "interaction",
}

const SkillCategoryMap: Record<SkillCategory, string> = {
  [SkillCategory.Physiology]: "生理",
  [SkillCategory.Mental]: "心智",
  [SkillCategory.Interaction]: "交际",
};

// Placeholder for CategoryToSkillDict
const CategoryToSkillDict: Record<SkillCategory, string[]> = {
  [SkillCategory.Physiology]: ["attack", "defense"],
  [SkillCategory.Mental]: ["knowledge", "survival"],
  [SkillCategory.Interaction]: ["social"],
};

export default function CharacterAttribute() {
  const { characterDetail, loading } = useCharacter();
  const [specialityModalOpen, setSpecialityModalOpen] = useState(false);

  if (loading || !characterDetail) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-[500px]" />
        <Skeleton className="h-[500px]" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Character Figure would go here */}
        
        <div className="col-span-1 md:col-span-4">
          <CharacterScrollPanel title="属性">
            <div className="space-y-1">
              {BaseAttribute.map((key) => (
                <BaseCharacterAttributeItem
                  key={key}
                  character={characterDetail}
                  attribute={key}
                />
              ))}
            </div>
            
            <Separator className="my-4" />
            <h4 className="text-sm font-medium mb-2">衍生属性</h4>
            
            <div className="space-y-1">
              {DerivedAttribute.map((key) => (
                <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-700">{AttributeMap[key]}</span>
                  <CharacterAttributeValue
                    character={characterDetail}
                    attributeKey={key}
                  />
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            <h4 className="text-sm font-medium mb-2">防御属性</h4>
            
            <div className="space-y-1">
              {DefenseAttribute.map((key) => (
                <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-700">{AttributeMap[key]}</span>
                  <CharacterAttributeValue
                    character={characterDetail}
                    attributeKey={key}
                  />
                </div>
              ))}
            </div>
          </CharacterScrollPanel>
        </div>
        
        <div className="col-span-1 md:col-span-4">
          <CharacterScrollPanel title="技能">
            {Object.entries(SkillCategoryMap).map(([category, label]) => (
              <div key={category} className="mb-4">
                <Separator className="my-4" />
                <h4 className="text-sm font-medium mb-2">{label}技能</h4>
                
                <div className="space-y-2">
                  {CategoryToSkillDict[category as SkillCategory].map((skillFlag) => {
                    const skill = characterDetail.skills?.find(
                      (s) => s.flag === skillFlag
                    );
                    
                    if (!skill) {
                      return null;
                    }
                    
                    // Replace with your actual CharacterSkillItem component
                    return (
                      <div key={skillFlag} className="p-2 border rounded-md">
                        {skillFlag}: {skill.grade}级
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </CharacterScrollPanel>
        </div>
        
        <div className="col-span-1 md:col-span-4">
          <CharacterScrollPanel title="专长">
            <div className="mb-4">
              <Button 
                className="w-full" 
                onClick={() => setSpecialityModalOpen(true)}
              >
                获取新专长
              </Button>
            </div>
            
            {characterDetail.specialities?.map((s) => (
              <div key={s.speciality.id} className="p-3 border rounded-md mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{s.speciality.name}</h4>
                    <p className="text-sm text-gray-500">{s.speciality.description}</p>
                  </div>
                  <div>
                    Lv.{s.currentLevel}
                  </div>
                </div>
              </div>
            ))}
          </CharacterScrollPanel>
        </div>
      </div>
      
      <Dialog open={specialityModalOpen} onOpenChange={setSpecialityModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>购买新专长</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4">
            {/* Insert SpecialityPanel component here */}
            <div className="p-4 border rounded">
              <p>专长列表将在这里显示</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}