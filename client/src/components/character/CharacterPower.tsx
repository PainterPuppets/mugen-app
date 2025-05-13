import { useCharacter } from "@/contexts/CharacterContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import CharacterScrollPanel from "./CharacterScrollPanel";
import { AttributeMap } from "@/types/character";
import { PowerTypeMap, LevelMap } from "@/types/power";

export default function CharacterPower() {
  const { characterDetail, loading } = useCharacter();

  if (loading || !characterDetail) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  if (!characterDetail.powers || characterDetail.powers.length === 0) {
    return (
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>角色能力</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>没有特殊能力</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <CharacterScrollPanel title="角色能力">
        {characterDetail.powers.map((power) => (
          <div key={power.id} className="mb-6">
            <Separator className="mb-2" />
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <Badge variant="outline" className="mr-2">
                {PowerTypeMap[power.type] || power.type}
              </Badge>
              {power.name}
            </h3>
            
            <div className="space-y-4">
              {power.levels.map((level, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <span className="font-medium">
                        {LevelMap[level.level] || level.level}级{level.name ? `: ${level.name}` : ''}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {level.description && (
                      <div className="text-sm">
                        <span className="font-medium">描述：</span>
                        <span>{level.description}</span>
                      </div>
                    )}
                    
                    <div className="text-sm">
                      <span className="font-medium">属性：</span>
                      {level.bonuses && level.bonuses.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {level.bonuses.map((bonus, idx) => (
                            <Badge key={idx} variant="secondary">
                              {AttributeMap[bonus.key] || bonus.key} +{bonus.value}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">无</span>
                      )}
                    </div>
                    
                    {level.properties && level.properties.length > 0 && (
                      <div className="space-y-2 mt-2">
                        <Separator />
                        {level.properties.map((property) => (
                          <div key={property.uuid} className="text-sm">
                            <span className="font-medium">{property.name}: </span>
                            <span>{property.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </CharacterScrollPanel>
    </div>
  );
}