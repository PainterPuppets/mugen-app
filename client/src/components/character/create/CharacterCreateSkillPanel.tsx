import { useReducer, useState, useEffect } from "react";
import { useCharacterCreate } from "@/contexts/CharacterCreateContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, MinusIcon, Lightbulb } from "lucide-react";
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
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SkillFlag,
  SkillMajor,
  CategoryToSkillDict,
  SkillCategory,
  SkillCategoryMap,
  SkillMap,
  SkillToCategoryDict,
  MajorToSkillDict,
  SkillToMajorDict,
  SkillMajorMap,
  Specification,
  Skills,
  initSkills
} from "@/types/skill";

// Helper functions
const getResidualPoint = (skills: Skills) => {
  let result = 20;
  (Object.keys(skills) as Array<SkillFlag>).map((key) => {
    let value = skills[key];
    if (value === undefined) {
      return;
    }

    result -= value.grade;
  });

  return result;
};

const getCategoryDict = (skills: Skills) => {
  let CategoryDict = {
    [SkillCategory.Physiology]: 0,
    [SkillCategory.Mental]: 0,
    [SkillCategory.Interaction]: 0,
  };

  (Object.keys(skills) as Array<SkillFlag>).map((key) => {
    let value = skills[key];
    if (value === undefined) {
      return;
    }
    CategoryDict[SkillToCategoryDict[key]] += value.grade;
  });

  return CategoryDict;
};

const canIncrementSkill = (skills: Skills, skill: SkillFlag) => {
  let residualPoint = getResidualPoint(skills);
  if (residualPoint === 0) {
    return false;
  }

  if (skills[skill].grade > 2) {
    return false;
  }

  let CATEGORY_MAX_RULE: { [key: number]: number } = {
    0: 6,
    1: 5,
    2: 4,
  };

  let dict = getCategoryDict(skills);
  let skillCategoryValue = dict[SkillToCategoryDict[skill]];
  let sortableValue = Object.values(dict).sort((a, b) => b - a);

  let index = sortableValue.findIndex((v) => v === skillCategoryValue);
  let n = 5;
  sortableValue.map((v, i) => {
    n -= Math.max(v - CATEGORY_MAX_RULE[i], 0);
    if (i === index) {
      skillCategoryValue -= Math.max(v - CATEGORY_MAX_RULE[i], 0);
    }
  });

  return skillCategoryValue < CATEGORY_MAX_RULE[index] + n;
};

const canDecrementSkill = (skills: Skills, skill: SkillFlag) => {
  if (skills[skill].grade === 0) {
    return false;
  }

  return true;
};

const getResidualMajorPoint = (skills: Skills) =>
  3 -
  (Object.keys(skills) as Array<SkillFlag>).reduce<number>(
    (a, b) =>
      a +
      (skills[b].grade > 2
        ? Math.max(skills[b].majors.length - 1, 0)
        : skills[b].majors.length),
    0
  );

const getResidualSkillMajorPointDict = (skills: Skills) => {
  return (Object.keys(skills) as Array<SkillFlag>).reduce((a, b) => {
    if (skills[b].grade < 3) {
      return {...a, [b]: 0}
    }

    if (skills[b].majors.length > 0) {
      return {...a, [b]: 0}
    }

    return {...a, [b]: 1}
  }, {} as {[key in SkillFlag]: number});
};

const getResidualSkillMajorPoint = (skills: Skills, skill: SkillFlag) => {
  let dict = getResidualSkillMajorPointDict(skills);
  return dict[skill];
};

export const checkSkills = (skills: Skills) => {
  if (getResidualMajorPoint(skills) !== 0) {
    return false
  }

  if (getResidualPoint(skills) !== 0) {
    return false
  }

  return true
};

const canAddMajor = (skills: Skills, skill: SkillFlag) => {
  if (skills[skill].grade === 0) {
    return false;
  }
  if (getResidualMajorPoint(skills) === 0) {
    return getResidualSkillMajorPoint(skills, skill) === 1;
  }

  return true;
};

const canRemoveMajor = (skills: Skills, major: SkillMajor) => {
  let index = skills[MajorToSkillDict[major]].majors.findIndex(
    (m) => m === major
  );

  if (index === -1) {
    return false;
  }

  return true;
};

enum reducerType {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  ADDMAJOR = "addMajor",
  REMOVEMAJOR = "removeMajor",
}

type skillAction = {
  type: reducerType.INCREMENT | reducerType.DECREMENT;
  skill: SkillFlag;
}

type majorAction = {
  type: reducerType.ADDMAJOR | reducerType.REMOVEMAJOR;
  major: SkillMajor;
}

function reducer(
  skills: Skills,
  action: skillAction | majorAction
) {
  switch (action.type) {
    case reducerType.INCREMENT:
      if (!canIncrementSkill(skills, (action as skillAction).skill)) {
        return skills;
      }

      skills[(action as skillAction).skill].grade += 1;
      return { ...skills };
    case reducerType.DECREMENT:
      if (!canDecrementSkill(skills, (action as skillAction).skill)) {
        return skills;
      }

      skills[(action as skillAction).skill].grade -= 1;
      if (skills[(action as skillAction).skill].grade === 0) {
        skills[(action as skillAction).skill].majors = [];
      }

      if (getResidualMajorPoint(skills) < 0) {
        skills[(action as skillAction).skill].majors = [];
      }

      return { ...skills };
    case reducerType.ADDMAJOR:
      if (!canAddMajor(skills, MajorToSkillDict[(action as majorAction).major])) {
        return skills;
      }

      skills[MajorToSkillDict[(action as majorAction).major]].majors.push((action as majorAction).major);

      return { ...skills };
    case reducerType.REMOVEMAJOR:
      if (!canRemoveMajor(skills, (action as majorAction).major)) {
        return skills;
      }

      let index = skills[MajorToSkillDict[(action as majorAction).major]].majors.findIndex(
        (m) => m === (action as majorAction).major
      );
      skills[MajorToSkillDict[(action as majorAction).major]].majors.splice(index, 1);

      return { ...skills };
    default:
      throw new Error("Unknown action");
  }
}

type MajorTagProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  major: SkillMajor;
};

const MajorTag = ({ checked, onChange, major }: MajorTagProps) => {
  return (
    <Badge 
      variant={checked ? "default" : "outline"}
      className="cursor-pointer m-1"
      onClick={() => onChange(!checked)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{SkillMajorMap[major]}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{Specification[major]}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Badge>
  );
};

interface SkillItemProps {
  skills: Skills;
  flag: SkillFlag;
  dispatch: (action: skillAction | majorAction) => void;
}

const CharacterCreateSkillItem = ({ skills, flag, dispatch }: SkillItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const skill = flag;

  return (
    <>
      <div key={skill} className="mb-4 pb-4 border-b border-muted last:border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto font-medium text-base"
                    onClick={() => setModalVisible(true)}
                  >
                    {SkillMap[skill]}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{Specification[skill]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {canAddMajor(skills, skill) && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 text-primary"
                      onClick={() => setModalVisible(true)}
                    >
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>获得新的专业</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={!canDecrementSkill(skills, skill)}
              onClick={() => dispatch({ type: reducerType.DECREMENT, skill })}
            >
              <MinusIcon className="h-3 w-3" />
            </Button>
            
            <span className="w-5 text-center font-medium">{skills[skill].grade}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={!canIncrementSkill(skills, skill)}
              onClick={() => dispatch({ type: reducerType.INCREMENT, skill })}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {skills[skill].majors.length > 0 && (
          <div className="mt-2 flex flex-wrap">
            {skills[skill].majors.map((major) => (
              <MajorTag
                key={major}
                checked={Boolean(
                  skills[skill].majors.find((m) => m === major)
                )}
                onChange={(checked) => 
                  dispatch({
                    type: checked ? reducerType.ADDMAJOR : reducerType.REMOVEMAJOR, 
                    major: major
                  })
                }
                major={major}
              />
            ))}
          </div>
        )}
      </div>
      
      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>获得新的{SkillMap[skill]}专业</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                您当前有
                <span className="font-bold mx-1 text-primary">{getResidualMajorPoint(skills)}</span>
                个自由专业点和
                <span className="font-bold mx-1 text-primary">{getResidualSkillMajorPoint(skills, skill)}</span>
                个奖励专业点
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {SkillToMajorDict[skill].map((major) => {
              const hasMajor = skills[skill].majors.find((m) => m === major) !== undefined;

              return (
                <div key={major} className="flex justify-between items-center p-3 border rounded-md">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="font-medium cursor-help">{SkillMajorMap[major]}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{Specification[major]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button 
                    variant={hasMajor ? "destructive" : "default"}
                    size="sm"
                    disabled={!hasMajor && getResidualMajorPoint(skills) === 0 && getResidualSkillMajorPoint(skills, skill) === 0}
                    onClick={() => {
                      dispatch({
                        type: hasMajor
                          ? reducerType.REMOVEMAJOR
                          : reducerType.ADDMAJOR,
                        major: major,
                      })
                    }}
                  >
                    {hasMajor ? "取消该专业" : "获取该专业"}
                  </Button>
                </div>
              );
            })}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setModalVisible(false)}>
              确定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function CharacterCreateSkillPanel() {
  const { skills: contextSkills, setSkills } = useCharacterCreate();
  const [localSkills, dispatch] = useReducer(reducer, contextSkills.length ? contextSkills : initSkills());
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  useEffect(() => {
    setSkills(localSkills);
  }, [localSkills, setSkills]);

  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <CardTitle>角色技能</CardTitle>
          <div>
            <Button
              variant="link"
              onClick={() => setHelpDialogOpen(true)}
              className="text-primary"
            >
              技能是什么？教我建卡
            </Button>
          </div>
        </div>
        <CardDescription>
          剩余技能点：<span className="font-medium text-primary">{getResidualPoint(localSkills)}</span>，
          剩余专业点：<span className="font-medium text-primary">{getResidualMajorPoint(localSkills)}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4 max-h-[500px] overflow-y-auto">
        {(Object.keys(CategoryToSkillDict) as Array<SkillCategory>).map(
          (category) => (
            <div key={category} className="mb-6">
              <h3 className="text-base font-medium mb-2">
                {SkillCategoryMap[category]}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (当前已分配：{getCategoryDict(localSkills)[category]} 点)
                </span>
              </h3>
              {CategoryToSkillDict[category].map((skill) => (
                <CharacterCreateSkillItem 
                  key={skill} 
                  skills={localSkills} 
                  flag={skill} 
                  dispatch={dispatch} 
                />
              ))}
            </div>
          )
        )}
      </CardContent>
      
      <Dialog open={helpDialogOpen} onOpenChange={setHelpDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">建卡-技能段</DialogTitle>
            <DialogDescription>
              角色技能的详细说明和建卡指南
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">什么是技能？</h3>
              <p className="text-muted-foreground">
                技能是区别每个角色的重要标识，代表了角色擅长做哪些事，以及不擅长做哪些事。<br />
                和属性一样，技能也分为生理/心智/互动三个大类。<br />
                每个类别下都有许多技能，如果你不清楚这些技能都是干什么的，将鼠标放在他们的名字上时就可以显示出这些技能所代表的意义。<br />
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">什么是技能专业？</h3>
              <p className="text-muted-foreground">
                即便是同一个技能，但是不同的方向也有可能会有很大的区别，比如虽然游泳和田径都属于运动技能。<br />
                但是会游泳的人不一定田径也好，所以<span className="font-medium text-primary">技能专业</span>代表了人物在这项技能的哪些方面上更加专业。<br />
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">技能分配规则</h3>
              <p className="text-muted-foreground">
                和属性类似。将6/5/4点的点数任意分别分配给生理、心智、互动三类技能，然后将各自的点数加在各项技能上。<br />
                然后，将5点自由点数任意加在需要的技能上。一般情况下，初始人物卡的技能等级上限为3。<br />
                另外，人物可以免费获得三个专业，人物可以将这些专业放在一个或多个至少1级的技能下。<br />
                特殊的是，将一项技能升到3级以及5级时将获得额外免费的专业点数。<br />
                在这张卡里面这些计算都是自动进行的，并且类型上也会标出已经分配了多少点，所以不用担心会算不清楚。<br />
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">给新手的话</h3>
              <p className="text-muted-foreground">
                我是新手？我该如何分配？<br />
                如果你不知道该分配什么技能的话，这里有一些推荐。<br />
                和战斗相关的技能有<span className="font-medium text-primary">格斗</span>、<span className="font-medium text-primary">白刃</span>、<span className="font-medium text-primary">弓箭</span>、<span className="font-medium text-primary">射击</span>、<span className="font-medium text-primary">神秘学</span>。<br />
                和防御相关的技能有<span className="font-medium text-primary">运动</span>、<span className="font-medium text-primary">生存</span>。<br />
                和交流相关的技能有<span className="font-medium text-primary">调查</span>、<span className="font-medium text-primary">感知</span>、<span className="font-medium text-primary">威吓</span>、<span className="font-medium text-primary">社交</span>、<span className="font-medium text-primary">欺诈</span>。<br />
                一些常用的技能有<span className="font-medium text-primary">驾驶</span>、<span className="font-medium text-primary">手艺</span>、<span className="font-medium text-primary">潜行</span>、<span className="font-medium text-primary">医疗</span>。<br />
                你可以想一下自己的人物应该擅长哪些方面的技能，然后选取其中一些分配点数。<br />
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}