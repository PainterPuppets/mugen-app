import { useReducer, useEffect, useState } from "react";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, MinusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BaseAttributeType, Attributes } from "@/types/character";

// Mock enum and maps - replace with actual data
enum AttributeCategory {
  Physiology = "physiology",
  Mental = "mental",
  Interaction = "interaction"
}

const AttributeCategoryMap: Record<AttributeCategory, string> = {
  [AttributeCategory.Physiology]: "生理",
  [AttributeCategory.Mental]: "心智",
  [AttributeCategory.Interaction]: "互动"
};

const AttributeToCategoryDict: Record<BaseAttributeType, AttributeCategory> = {
  strength: AttributeCategory.Physiology,
  dexterity: AttributeCategory.Physiology,
  constitution: AttributeCategory.Physiology,
  intelligence: AttributeCategory.Mental,
  perception: AttributeCategory.Mental
};

const CategoryToAttributeDict: Record<AttributeCategory, BaseAttributeType[]> = {
  [AttributeCategory.Physiology]: [
    BaseAttributeType.Strength,
    BaseAttributeType.Dexterity,
    BaseAttributeType.Constitution
  ],
  [AttributeCategory.Mental]: [
    BaseAttributeType.Intelligence,
    BaseAttributeType.Perception
  ],
  [AttributeCategory.Interaction]: []
};

const AttributeMap: Record<string, string> = {
  [BaseAttributeType.Strength]: "力量",
  [BaseAttributeType.Dexterity]: "敏捷",
  [BaseAttributeType.Constitution]: "体质",
  [BaseAttributeType.Intelligence]: "智力",
  [BaseAttributeType.Perception]: "感知"
};

// Specification for tooltips
const Specification: Record<string, string> = {
  [BaseAttributeType.Strength]: "力量表示角色的肌肉力量、体格和身体威严",
  [BaseAttributeType.Dexterity]: "敏捷表示角色的反应速度、身体协调性和平衡能力",
  [BaseAttributeType.Constitution]: "体质表示角色的耐力、健康和抵抗疾病能力",
  [BaseAttributeType.Intelligence]: "智力表示角色的思考能力、记忆力和逻辑分析能力",
  [BaseAttributeType.Perception]: "感知表示角色的警觉性、注意力和对环境变化的敏感度"
};

// Helper functions
const getResidualPoint = (attributes: Attributes) => {
  let result = 9;
  (Object.keys(attributes) as Array<BaseAttributeType>).map((key) => {
    let value = attributes[key];
    if (value === undefined) {
      return;
    }

    result -= value > 4 ? value : value - 1;
  });

  return result;
};

const getCategoryDict = (attributes: Attributes) => {
  let CategoryDict = {
    [AttributeCategory.Physiology]: 0,
    [AttributeCategory.Mental]: 0,
    [AttributeCategory.Interaction]: 0,
  };

  Object.keys(attributes).map((key) => {
    let value = attributes[key as BaseAttributeType];
    if (value === undefined) {
      return;
    }
    const category = AttributeToCategoryDict[key as BaseAttributeType];
    if (category) {
      CategoryDict[category] += value > 4 ? value : value - 1;
    }
  });

  return CategoryDict;
};

const canIncrement = (attributes: Attributes, attr: BaseAttributeType) => {
  let residual = getResidualPoint(attributes);
  if (residual === 0) {
    return false;
  }

  if (attributes[attr] > 4) {
    return false;
  }

  if (attributes[attr] === 4 && residual < 2) {
    return false;
  }

  let MAX_RULE: { [key: number]: number } = {
    0: 3,
    1: 2,
    2: 1,
  };

  let dict = getCategoryDict(attributes);
  let sortableValue = Object.values(dict).sort((a, b) => b - a);
  let categoryValue = dict[AttributeToCategoryDict[attr]];

  let index = sortableValue.findIndex((v) => v === categoryValue);
  let n = 3;
  sortableValue.map((v, i) => {
    n -= Math.max(v - MAX_RULE[i], 0);
    if (i === index) {
      categoryValue -= Math.max(v - MAX_RULE[i], 0);
    }
  });

  if (attributes[attr] === 4) {
    categoryValue += 1;
  }

  return categoryValue < MAX_RULE[index] + n;
};

const canDecrement = (attributes: Attributes, attr: BaseAttributeType) => {
  if (attributes[attr] <= 1) {
    return false;
  }

  return true;
};

function reducer(
  state: Attributes,
  action: { attr: BaseAttributeType; type: "increment" | "decrement" }
) {
  switch (action.type) {
    case "increment":
      if (!canIncrement(state, action.attr)) {
        return state;
      }

      return {
        ...state,
        [action.attr]: state[action.attr] + 1
      };
    case "decrement":
      if (!canDecrement(state, action.attr)) {
        return state;
      }

      return {
        ...state,
        [action.attr]: state[action.attr] - 1
      };
    default:
      throw new Error("Unknown action");
  }
}

export function checkAttributes(attributes: Attributes) {
  return getResidualPoint(attributes) === 0;
}

export default function CharacterCreateAttributePanel() {
  const { attributes, setAttributes } = useCharacterCreate();
  const [localAttributes, dispatch] = useReducer(reducer, attributes);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  useEffect(() => {
    setAttributes(localAttributes);
  }, [localAttributes, setAttributes]);

  const getCategoryPoint = (category: AttributeCategory) => {
    return getCategoryDict(localAttributes)[category];
  };

  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <CardTitle>角色属性</CardTitle>
          <div>
            <Button 
              variant="link" 
              onClick={() => setHelpDialogOpen(true)} 
              className="text-primary"
            >
              属性是什么？教我建卡
            </Button>
          </div>
        </div>
        <CardDescription>
          剩余属性点：<span className="font-medium text-primary">{getResidualPoint(localAttributes)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
        {(Object.keys(CategoryToAttributeDict) as Array<AttributeCategory>).map(
          (category) => (
            <div key={category} className="mb-6">
              <h3 className="text-base font-medium mb-2">
                {AttributeCategoryMap[category]} 
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (当前已分配：{getCategoryPoint(category)})
                </span>
              </h3>
              <div className="space-y-2">
                {CategoryToAttributeDict[category].map((attr) => (
                  <div key={attr} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="font-medium cursor-help">{AttributeMap[attr]}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{Specification[attr]}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={!canDecrement(localAttributes, attr)}
                        onClick={() => dispatch({ attr, type: "decrement" })}
                      >
                        <MinusIcon className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-5 text-center font-medium">{localAttributes[attr]}</span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        disabled={!canIncrement(localAttributes, attr)}
                        onClick={() => dispatch({ attr, type: "increment" })}
                      >
                        <PlusIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {category !== AttributeCategory.Interaction && <Separator className="my-4" />}
            </div>
          )
        )}
      </CardContent>
      
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">建卡-属性段</DialogTitle>
            <DialogDescription>
              角色属性的详细说明和建卡指南
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">什么是属性？</h3>
              <p className="text-muted-foreground">
                属性是衡量一个角色在各方面能力上的数值化体现。<br />
                对于角色来说一共有9维属性，分为生理/心智/互动三个大类。<br />
                简单来说，如果你想让你的人物非常强壮，请在<span className="font-medium text-primary">力量</span>上多分配一些点数。<br />
                或者你觉得你的角色非常敏锐，能快速洞察周围发生了什么事。那就分配一些点数在<span className="font-medium text-primary">感知</span>上吧。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">属性数值含义</h3>
              <p className="text-muted-foreground">
                在无限恐怖的世界中，1代表的是大多数普通人在这项属性上的平均值，而5则是人类的极限水平。<br />
                而作为玩家来说，在获得一些强化之后突破人类极限也是常有的事。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">属性分配规则</h3>
              <p className="text-muted-foreground">
                首先，我们需要将1/2/3点的点数任意分别分配给生理、心智、互动三类属性，然后将点数加在各项属性上。<br />
                然后，将3点自由点数任意加在想要提高的属性上。另外，将一项已经加到4的属性提升到5，需要耗费2点点数。<br />
                在这张卡里面这些计算都是自动进行的，并且属性类型上也会标出已经分配了多少点，所以不用担心会算不清楚。
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">给新手的话</h3>
              <p className="text-muted-foreground">
                如果你不知道该分配什么属性的话，我这里有一些推荐。<br />
                如果你想玩一个远程的弓箭手，那么请点高敏捷和感知这两项属性。<br />
                如果你想玩一个近战战士的话，请点一些力量和体质吧。<br />
                如果你想玩法师，请点一些智力吧，会对施法有很大的帮助。
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}