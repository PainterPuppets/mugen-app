import { useState } from "react";
import { useCharacter } from "@/contexts/CharacterContext";
import {
  BaseAttribute,
  DerivedAttribute,
  AttributeMap,
  DefenseAttribute,
} from "@/types/character";
import {
  SkillCategoryMap,
  CategoryToSkillDict,
  SkillCategory,
} from "@/types/skill";
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
                <div
                  key={key}
                  className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium text-gray-700">
                    {AttributeMap[key]}
                  </span>
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
                <div
                  key={key}
                  className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium text-gray-700">
                    {AttributeMap[key]}
                  </span>
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

                {/* <div className="space-y-2">
                  {CategoryToSkillDict[category as SkillCategory].map(
                    (skillFlag) => {
                      const skill = (characterDetail.skills ?? []).find(
                        (s) => s.flag === skillFlag,
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
                    },
                  )}
                </div> */}
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
                    <p className="text-sm text-gray-500">
                      {s.speciality.description}
                    </p>
                  </div>
                  <div>Lv.{s.currentLevel}</div>
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
