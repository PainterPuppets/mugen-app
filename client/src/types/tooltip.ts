import { Attribute } from "./character";
import { SkillFlag, SkillMajor } from "./skill";
import { EquipmentAffix } from './inventory';

export const Specification = {
    // 属性
    [Attribute.STRENGTH]: `推拉物体、举起重物等的相关属性，包括了爆发力和负重能力，因此也影响奔走或挥动物体的速度、击打时所能造成的伤害程度。任何能够对物体施加物理作用的存在都拥有力量值。`,
    [Attribute.DEXTERITY]: `全身的协调能力、动作的精确性和灵活性、反应神经等，快速有效运动身体的能力。任何能够活动和移动的物体都拥有敏捷值。`,
    [Attribute.CONSTITUTION]: `身体的健康程度和抵抗力、新陈代谢的活跃度等，抵挡伤病的能力。任何活着的东西都拥有耐力值。`,
    [Attribute.INTELLIGENCE]: `逻辑思维的能力、计算能力、分析能力和记忆力等，有时也代表了人物对超自然能量的分配和控制。任何能够理解语言并且能进行分析和推理的存在都拥有智力值。`,
    [Attribute.WISDOM]: `留意环境并查觉变化的能力，洞察力、直觉、快速分辨细节的能力。这一属性代表人物的注意力和对信息的分辨能力，因此近视眼不一定感知就低。任何能够感知外界的存在都拥有感知值。`,
    [Attribute.DETERMINATION]: `人物果敢的决断力和决定的坚定程度，也代表了人物顽固的程度。在超自然意义上，代表了人物的精神的强度。任何能够有目的行动的存在都拥有决心值。`,
    [Attribute.CHARISMA]: `人物的气质、风度和存在感，不由地引起旁人兴趣的能力。在超自然意义上，也代表了人物在多大程度上超脱了自然本质。虽然与相貌有关，但数值高并不意味着长得帅或美丽，数值低也不一定是丑八怪。任何能够将自己与环境区分开的存在都拥有风度值。`,
    [Attribute.CONTROL]: `影响他人的能力，言行的感染力，煽动别人、让别人依你的想法行事的能力。任何能够表达自己意愿的存在都拥有操控值。任何操控值达到2或更高的个体，都应该具有某种明确、主动、自觉表达自己意图的手段，如语言。`,
    [Attribute.COMPOSURE]: `镇定自若的能力，头脑的反应速度，在压力下或紧急情况下保持冷静的能力。在超自然意义上，代表了人物心智的活力。任何有意愿应对外界刺激的存在都拥有沉着值。`,
    
    [Attribute.LEGEND_STRENGTH]: `传奇力量通用效果：在力量相关的检定上获得n个附加成功，人物获得额外500*2^(n-1)公斤的负重，基础投掷距离n+1倍，进行力量相关的检定时获得nDP加值，以力量进行攻击时，你的伤害上限提升n(n+1)/2。`,
    [Attribute.LEGEND_DEXTERITY]: `传奇敏捷通用效果：在敏捷相关的检定上获得n个附加成功，获得n点防御附加成功，闪避防御增加n，基础移动速度提高3n米，在判断基础速度翻倍的时候，这个加值加在翻倍之前。`,
    [Attribute.LEGEND_CONSTITUTION]: `传奇耐力通用效果：在耐力相关的检定上获得n个附加成功，生命值额外增加n(n+1)/2点，角色可以2^(n-1)周不吃不喝不睡，屏息时间2^n倍。`,
    [Attribute.LEGEND_INTELLIGENCE]: `传奇智力通用效果：在智力相关的检定上获得n个附加成功。在每次影片结束结算经验时，你根据本场恐怖片中你最低的传奇智力数获得额外的3*n点经验红利，任何情况下，红利无法产生红利。可以使人物将n种语言提升1级。`,
    [Attribute.LEGEND_WISDOM]: `传奇感知通用效果：在感知相关的检定上获得n个附加成功，获得n点防御附加成功，获得可以叠加的n点洞察防御，可以和其它来源的洞察加值叠加，基础敏感范围增加20n米。`,
    [Attribute.LEGEND_DETERMINATION]: `传奇决心通用效果：在决心相关的检定上获得n个附加成功，意志值提升n，意志检定获得nDP加值。`,
    [Attribute.LEGEND_CHARISMA]: `传奇风度通用效果：在风度相关的检定上获得n个附加成功，角色在进行基因锁解锁检定或任何机运骰检定时，在检定结果上+n，但是这不会让你获得机运骰的加骰。`,
    [Attribute.LEGEND_CONTROL]: `传奇操控通用效果：在操控相关的检定上获得n个附加成功，角色每部电影获得n次重骰机会，可以在投骰结束后对结果不满意再使用，取较好的结果。`,
    [Attribute.LEGEND_COMPOSURE]: `传奇沉着通用效果：在沉着相关的检定上获得n个附加成功，意志值提升n，先攻提升n。`,

    [Attribute.SIZE]: '普通成年人体积为5。通过选择对应的专长或缺陷，你可以将体积扩大到6或降低到4。',
    [Attribute.SPEED]: `速度分为三种：
    基础速度：基础速度表示人物用一次移动动作能移动多远的距离，初始值为力量+敏捷+体积，单位是米。
    陆行速度：这种速度为角色在陆地上移动的速度，初始一般为基础速度，但是可能会因为某些能力而改变。
    飞行速度：这种速度为角色在天空中移动的速度，角色必须拥有特殊能力才可以飞行，在获得能力时，能力会说明角色的飞行速度。`,
    [Attribute.INITIATIVE]: '用于决定战斗中的行动顺序，初始值为敏捷+沉着',
    [Attribute.REFLEX]: '有些规则中的其他场合会使用反射检定，即此项，常用于回避范围攻击，反射判定的初始DP等于敏捷+运动（自我保护）',
    [Attribute.FORTITUDE]: '有些规则中的其他场合会使用强韧检定，即此项，常用于抵抗生理影响，强韧判定的初始DP等于耐力+求生（自我保护）。',
    [Attribute.WILL]: '意志值是象征人物心志坚定程度的参数，基础数值为决心+沉着。',
    [Attribute.HEALTH]: '大小为耐力+体积。',
    [Attribute.SENSITIVE_RANGE]: '敏感范围是指玩家可以清晰感觉到的范围，比如在这个范围之内玩家可以清楚看到对面角色的面容，以及清晰听到他们的对话等，角色的敏感范围初始值为感知*10米，一般情况下，大部分生物都是使用视觉才可以精确定位，若没有特殊能力的话，一个以视觉精确定位的生物通过听觉只能进行模糊定位。只有拥有“敏感嗅觉”的生物才可以通过嗅觉进行模糊定位。',
    [Attribute.BLUR_RANGE]: '这个范围下，角色只能观察到那里有一个目标，但是无法看清楚样貌，角色的模糊敏感范围初始值为敏感范围*10米。一般而言，在没有特殊能力的情况下，模糊范围只有视距存在。',

    [Attribute.BASE_DEFENSE]: '用于决定人物的防御值，初始值为敏捷和感知中较低者。基础防御是可以与其他能力带来的基础防御叠加的。',
    [Attribute.NATURAL_DEFENSE]: '天生防御一般来源于特殊能力，可以理解为躯体上的甲壳或者类似阻止抵挡伤害的能力，是被动防御的一种，不会被【措手不及】影响，但是会被【破甲】影响',
    [Attribute.LONG_RANGE_ARMOR_DEFENSE]: '盔甲针对近距离武器和远距离武器的防御是不一样的，大多数情况下，对于远程攻击的防御手段更加有效，这是被动防御的一种，不会被【措手不及】影响，但是会被【破甲】影响',
    [Attribute.ARMOR_DEFENSE]: '盔甲防御一般来源于身上的装备，这是被动防御的一种，不会被【措手不及】影响，但是会被【破甲】影响',
    [Attribute.DODGE_DEFENSE]: '可以理解为身体十分灵巧闪过了伤害或者躲开了致命处。这是一种主动防御，会被【措手不及】状态所影响',
    [Attribute.INSIGHT_DEFENSE]: '可以理解为对于攻击来源的观察力十分敏锐，依靠此躲开了攻击。这是一种主动防御，会被【措手不及】状态所影响',
    [Attribute.PARRY_DEFENSE]: '格挡防御，只有处于格挡状态下才会拥有格挡防御，是被动防御的一种，不会被【措手不及】影响，但是会被【破甲】影响',
    [Attribute.FIELD_DEFENSE]: '力场防御，它意味者有一個力场效果正在輔助你的某一方面。',
    [Attribute.DEFLECTION_DEFENSE]: '偏斜加值一般加在防禦和對抗範圍效果的判定上，它意味著攻擊或敵意物質會部分地與你的身體錯開，這有可能是因為你的身體並不在它看起來的位置，也可能是空間扭曲。',

    // 技能
    [SkillFlag.Athletics]: `行走、跑步、跳跃、投掷武器，各种型态的运动。`,
    [SkillFlag.Fight]: '空手打架的能力，拳脚功夫、各种武术等。',
    [SkillFlag.Drive]: '泛指驾驶各种交通工具的技能，也包括撞击、追车之类的能力。但是不完全表示你能在坦克和莲花跑车之间游走自如，这会表现在环境惩罚上。',
    [SkillFlag.Firearms]: '从手枪到重型机关枪，各种枪枝使用、保养、修理的技能。',
    [SkillFlag.Larceny]: '从破坏安全系统到开锁到扒窃，此方面所有的能力。',
    [SkillFlag.Stealth]: '在不被别人发现状态下，移动、追踪、隐藏的技能。',
    [SkillFlag.Survival]: '在户外生存的技能，包括寻觅食料、栖息处所、避免野兽的袭击等，还有对抗毒素和疾病，以及追踪目标的能力。',
    [SkillFlag.Blade]: '从刀剑到棍棒、枪、矛等等的使用技能。',
    [SkillFlag.Bow]: '使用弓箭的能力，包括以弓箭射击等。',

    [SkillFlag.Academics]: '哲学、历史、文学等等，广泛的各种知识。',
    [SkillFlag.Computer]: '能够自由运用现代最高科技电脑及其各种相关系统、软体等的知识。',
    [SkillFlag.Craft]: '人物熟悉某项工艺、谋生技能或艺术。例如炼金术、制造防具、制造武器、切割宝石、制造载具等。',
    [SkillFlag.Investigation]: '可以观察到常人容易忽略的线索，对于同样的事物会比常人发现更多情报。',
    [SkillFlag.Medicine]: '从急救处置到外科手术，到人体相关的所有知识。',
    [SkillFlag.Occult]: '诅咒、魔法、传说、黑暗世界等等（不管是真是假）的相关知识。',
    [SkillFlag.Science]: '对于物理、化学、生物、地质等等理科相关的知识，不但熟知而且懂得如何运用。',

    [SkillFlag.Beastmastery]: '了解动物的习性和情感等，并且融洽相处、加以训练的技能。',
    [SkillFlag.Empathy]: '理解别人的感情、动机，并且产生共鸣的能力，也容易受别人情绪影响。',
    [SkillFlag.Expression]: '人物熟悉某种表演技能。例如演讲，演奏，唱歌等。',
    [SkillFlag.Intimidation]: '利用肉体上的暴力或是精神上的威胁，让对方产生恐惧而遵造你的指示行动。',
    [SkillFlag.Socialize]: '和口才相关的大部分技巧，例如达成交易、快速交谈、引诱、鼓动，说服等等。',
    [SkillFlag.Subterfuge]: '隐藏自己，并欺骗对方，玩弄花言巧语、瞒天过海的能力。',

    // 专业
    [SkillMajor.LIGHT_THROW]: `敏捷+运动（轻投掷武器）战斗相关，当使用轻投掷武器进行投掷攻击时，使用该专业进行检定`,
    [SkillMajor.HEAVY_THROW]: `力量+运动（重投掷武器）战斗相关，当使用重投掷武器进行投掷攻击时，使用该专业进行检定`,
    [SkillMajor.REFLEX]: `反射检定：敏捷+运动（自我保护）当在需要使用反射豁免的场合，使用该专业进行检定。由于自我保护是人类的本能，所以进行反射豁免检定时，就算角色没有“自我保护”专业，也不会受到没有专业的惩罚。`,
    [SkillMajor.RAY]: `射线攻击：敏捷+运动（射线）。本项目一般都无法通过自然本质获得，一般都是通过超自然能力才可获得，具体的效果和内容参考对应能力。`,
    [SkillMajor.SPIT]: `喷吐攻击：敏捷+运动（喷吐）。本项目一般都无法通过自然本质获得，一般都是通过超自然能力才可获得，具体的效果和内容参考对应能力。`,
    [SkillMajor.ENERGY_SHOOTING]: `能量：敏捷+运动（射击）。本项目一般都无法通过自然本质获得，一般都是通过超自然能力才可获得，具体的效果和内容参考对应能力。`,
    [SkillMajor.OVERRUN]: `闯越：敏捷+运动（闯越）或者力量+运动（闯越）`,
    [SkillMajor.BALANCE]: `平衡感：敏捷+运动（平衡感）当人物走索、窄梁、突出岩石、或穿越凹凸不平的地面时，本技能可使其保持平衡。平衡感检定受到盔甲减值影响。每有1点盔甲减值，则平衡感检定失去1DP。`,
    [SkillMajor.JUMP]: `跳跃：力量+运动（跳跃）本技能可跳过陷坑、围篱，或接触低垂的树枝。以及跳起来够到某些物品。跳跃检定受到盔甲减值影响。每有1点盔甲减值，则跳跃检定检定失去2DP。`,
    [SkillMajor.CLIMB]: `攀爬：力量+运动（攀爬）本技能可以攀登悬崖，房屋，绳索等。攀爬检定受到盔甲减值影响。每有1点盔甲减值，则攀爬检定检定失去1DP。`,
    [SkillMajor.ESCAPE]: `逃脱：敏捷+运动（逃脱）本技能可以挣脱捆绑，摆脱擒抱，穿越狭小空间等。`,
    [SkillMajor.SWIM]: `游泳：力量+运动（游泳）本技能可以让没有水下行动能力的陆地生物游泳，潜水，在水下行动。`,
    
    [SkillMajor.GLOVES]: `使用拳套进行攻击：力量+肉搏（拳套）。当你使用拳套进行搏斗时。使用本技能进行检定`,
    [SkillMajor.HAND_FIGHT]: `使用双手天生武器进行攻击：力量+肉搏（手）。当你使用双手或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.LEG_FIGHT]: `使用双脚天生武器进行攻击：力量+肉搏（腿）。当你使用腿或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.TOOTH_FIGHT]: `使用牙齿进行攻击：力量+肉搏（牙齿）。当你使用牙或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.WING_FIGHT]: `使用翅膀进行攻击：力量+肉搏（翅膀）。当你使用翅膀或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.TENTACLE_FIGHT]: `使用触手进行攻击：力量+肉搏（触手）。当你使用触手或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.TAIL_FIGHT]: `使用尾巴进行攻击：力量+肉搏（尾巴）。当你使用尾巴或者类似器官进行搏斗时。使用本技能进行检定`,
    [SkillMajor.GRAPPLE]: `擒抱：力量+肉搏（擒抱）`,
    [SkillMajor.BUMP]: `冲撞：力量+肉搏（冲撞）`,
    [SkillMajor.WINGCLIP]: `摔绊：力量+肉搏（摔绊）`,
    [SkillMajor.FIGHT_PARRY]: `肉搏格挡。这是一个防御行为，无需检定。这个专业非常特殊，因为其并不增加你的DP，而是在你进行”格挡防御”时，给你再额外提供1点格挡防御。`,
    
    [SkillMajor.LIGHT_VEHICLE]: `驾驶轻型载具。获得本专业意味着你学会了驾驶轻型载具的技能，在相关检定上可以获得加值`,
    [SkillMajor.HEAVY_VEHICLE]: `驾驶重型载具。获得本专业意味着你学会了驾驶重型载具的技能，在相关检定上可以获得加值`,
    [SkillMajor.HUMANOID_ROBOT]: `驾驶人形机器人。获得本专业意味着你学会了驾驶人形机器人的技能，在相关检定上可以获得加值`,
    [SkillMajor.EVA]: `驾驶EVA。获得本专业意味着你学会了驾驶EVA的技能，在相关检定上可以获得加值`,
    [SkillMajor.GUNDAM]: `驾驶高达。获得本专业意味着你学会了驾驶高达的技能，在相关检定上可以获得加值`,
    
    [SkillMajor.PISTOL]: `敏捷+枪械（手枪）战斗相关，使用手枪射击时，使用该专业进行检定`,
    [SkillMajor.MACHINE_GUN]: `敏捷+枪械（机枪）战斗相关，使用机枪射击时，使用该专业进行检定`,
    [SkillMajor.RIFLE]: `敏捷+枪械（步枪）战斗相关，使用步枪射击时，使用该专业进行检定`,
    [SkillMajor.CANNON]: `智力+枪械（炮）战斗相关，使用炮轰击时，使用该专业进行检定`,
    [SkillMajor.CROSSBOW]: `敏捷+枪械（弩）战斗相关，使用弩射击时，使用该专业进行检定`,
    [SkillMajor.FIREARMS_AIM]: `枪械瞄准。这个专业非常特殊，因为其并不增加你的DP，而是可以让你更快的进行瞄准。当你进行瞄准时，你第一轮的瞄准视为已经瞄准了2轮，这意味着你第一轮的瞄准轮数+1。需要注意的是，你只有第一轮的瞄准会变为瞄准2轮，不会影响后续的瞄准。`,
    [SkillMajor.FIREARMS_PARRY]: `枪械格挡。这是一个防御行为，无需检定。这个专业非常特殊，一般情况下，当你持有”枪械”进行格挡时，使用的是你的白刃格挡。所以，本专业在一般情况下没有任何意义。但是若你有任何能力可以让你使用枪械技能值进行”枪械格挡”。在此情况下，你在进行”枪械格挡防御”时，给你再额外提供1点格挡防御。`,
    
    [SkillMajor.UNLOCK]: `智力+手上功夫（开锁）本专业可以帮助你打开有锁孔和钥匙的锁。需要注意的是，使用本专业进行开锁时手边一定要有合适的工具（凿子、撬杆、钥匙模、铁丝等）`,
    [SkillMajor.STEAL]: `敏捷+手上功夫（盗窃）本专业可使你偷走他人的物品。`,
    [SkillMajor.HIDE_ITEM]: `智力+手上功夫（隐藏物品）本专业可以让你将一些不想见人的东西藏匿在身上，从而带到某个地方。`,
    [SkillMajor.TIEDUP]: `智力+手上功夫（捆绑）本专业可以在你进行捆绑检定的时候提供专业加值`,
    
    [SkillMajor.HIDE]: `敏捷+躲藏（隐藏）本专业可以在你潜藏身形时提供专业加值`,
    [SkillMajor.STEALTH]: `敏捷+躲藏（潜行）本技能可以让你悄无声息的靠近目标，或者偷偷跑路。`,
    
    [SkillMajor.WILDERNESS_SURVIVAL]: `感知+求生（野外求生）本技能可追迹、在野外打猎、带领队伍安全穿越冰原、辨识附近是否住有枭头熊、预测天气、或避开流沙等自然危险等。`,
    [SkillMajor.FORTITUDE]: `强韧检定：耐力+求生（自我保护）当在需要使用强韧豁免的场合，使用该专业进行检定。由于自我保护是人类的本能，所以进行强韧豁免检定时，就算角色没有“自我保护”专业，也不会受到没有专业的惩罚。`,
    [SkillMajor.TRACE]: `感知+求生（追踪）你可以追踪目标的踪迹。`,
    
    [SkillMajor.SWORD]: `力量+白刃（剑）使用剑进行白刃攻击`,
    [SkillMajor.KNIFE]: `力量+白刃（刀）使用刀进行白刃攻击`,
    [SkillMajor.HAMMER]: `力量+白刃（锤子）使用锤子进行白刃攻击`,
    [SkillMajor.STICK]: `力量+白刃（刺）使用刺进行白刃攻击`,
    [SkillMajor.DAGGER]: `力量+白刃（匕首）使用匕首进行白刃攻击`,
    [SkillMajor.SICKLE]: `力量+白刃（镰刀）使用镰刀进行白刃攻击`,
    [SkillMajor.AXE]: `力量+白刃（斧子）使用斧子进行白刃攻击`,
    [SkillMajor.SPEAR]: `力量+白刃（矛）使用矛进行白刃攻击`,
    [SkillMajor.WHIP]: `力量+白刃（鞭子）使用鞭子进行白刃攻击`,
    [SkillMajor.FAN]: `力量+白刃（扇子）使用扇子进行白刃攻击`,
    [SkillMajor.SHIELD]: `力量+白刃（盾牌）使用盾牌进行白刃攻击`,
    [SkillMajor.BLADE_PARRY]: `白刃格挡。这是一个防御行为，无需检定。这个专业非常特殊，因为其并不增加你的DP，而是改为当你使用白刃技能值进行”白刃格挡防御”时，给你再额外提供1点格挡防御。`,
    
    [SkillMajor.BOW]: `敏捷+弓箭（弓箭）使用弓箭进行弓箭攻击`,
    [SkillMajor.BOW_AIM]: `弓箭瞄准。这个专业非常特殊，因为其并不增加你的DP，而是可以让你更快的进行瞄准。当你进行瞄准时，你第一轮的瞄准视为已经瞄准了2轮，这意味着你第一轮的瞄准轮数+1。`,
    [SkillMajor.BOW_PARRY]: `弓箭格挡。这是一个防御行为，无需检定。这个专业非常特殊，一般情况下，当你持有”弓箭”进行格挡时，使用的是你的白刃格挡。所以，本专业在一般情况下没有任何意义。但是若你有任何能力可以让你使用弓箭技能值进行”弓箭格挡”。在此情况下，你在进行”弓箭格挡防御”时，给你再额外提供1点格挡防御。`,
    
    [SkillMajor.FILE_DECRYPTION]: `文件解读：智力+学识（文件解读）本技能可以解析密码，藏宝图上文字，神秘壁画，象形文字，古代文献的意义。`,
    [SkillMajor.GEOGRAPHY]: `智力+学识（地理）土壤，地质，地形，气候，人文，动物，季节轮替，气候等相关的研究。`,
    [SkillMajor.HISTORY]: `智力+学识（历史）皇室，神话，宗教，战争，殖民，王朝等相关的研究。`,
    [SkillMajor.MONSTER]: `智力+学识（怪物）本技能可以帮助角色得知一些神话中，电影中的怪物信息。`,
    
    [SkillMajor.HACKER]: `黑客入侵：智力+电脑（黑客）本技能可以帮助角色入侵其他目标的电子设备。`,
    [SkillMajor.FIREWALL]: `防火墙：智力+电脑（防火墙）本技能可以防止其他角色入侵你的电子设备。`,
    [SkillMajor.COMPUTER_GAME]: `打游戏：智力+电脑（电子游戏）本技能可以帮助你打通电子游戏，或者在PVP电子游戏中击败对手。`,
    [SkillMajor.COMPUTER_USE]: `编程：智力+电脑（电脑使用）本技能可以让你使用电子设备。`,
    
    [SkillMajor.DANDAO]: `智力+手艺（丹道）本专业用以制作丹药。相关规则请查看“丹道造物”规则。`,
    [SkillMajor.XIANGONG]: `智力+手艺（仙工）本专业用以制作法宝。相关规则请查看“仙工造物”规则。`,
    
    [SkillMajor.SEARCH]: `搜索：智力+调查（搜索）本技能可以寻找物品，搜集线索，隐藏的宝物，密室或者其他被藏起来的“东西”。`,
    [SkillMajor.LISTEN]: `聆听：感知+调查（聆听）本技能可以听到细小的声音，察觉脚步声以及偷听其他人的谈话，还有一些奇怪的声音。`,
    [SkillMajor.RECON]: `侦查：感知+调查（侦查）本技能可以让你发现远处的敌人，躲起来的目标，察觉目标的易容，阴影中的怪物。`,
    [SkillMajor.READ_LIP]: `读唇：感知+调查（读唇）本技能可以让你不通过听觉，即可判断出目标所说的是什么内容。`,
    
    [SkillMajor.FIRST_AID]: `急救：敏捷+医学（急救）本技能可以让目标的伤势不再恶化，免于死亡。`,
    [SkillMajor.NURSE]: `长线治疗：智力+医学（长线治疗）本技能可以让目标的自然恢复加快，加速伤势的回复。`,
    [SkillMajor.DIAGNOSIS]: `诊断：智力+医学（诊断）本技能可以让你得知目标的身体情况。`,
    [SkillMajor.CURE]: `治疗：智力+医学（治疗）本技能可以让你帮助目标对抗疾病和毒素，回复健康。`,
    
    [SkillMajor.DIVINATION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.CONJURATION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.EVOCATION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.NECROMANCY]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.ILLUSION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.ABJURATION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.TRANSMUTATION]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.ENCHANTMENT]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.WARD]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.CREATE]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.CURESE]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.SAGECRAFT]: `施法检定：智力+神秘学（对应专业）施法检定时需要`,
    [SkillMajor.SPELLCRAFT]: `法术辨识：智力+神秘学（法术辨识）本技能可以让你辨识施展，或者正在作用中的法术及其效果。`,
    [SkillMajor.TAOIST_MAGIC]: `道术专业十分特殊。所有东方的道术法术，全部默认需要“道术”专业，并且某些特定的资源也需要“道术”专业。`,
    
    [SkillMajor.CLASSICAL_PHYSICS]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。只包括最简单的力学，光学等相关领域。`,
    [SkillMajor.OPTICS]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。特定的光谱学`,
    [SkillMajor.MECHANICS]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。特定的力学，包括浮力，重力，引力等。`,
    [SkillMajor.QUANTUM_SPHYSICS]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。研究微观的物理学。`,
    [SkillMajor.CHEMISTRY]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。研究物质的组成，结构，变化，用途等。`,
    [SkillMajor.BIOLOGY]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。研究生物的种类，结构，行为，功能，起源等。`,
    [SkillMajor.MATHEMATICS]: `知识：智力+科学（对应的科学专业）获得对应领域的一些信息。研究数量，结构，变化等概念的学科。`,
    [SkillMajor.BLUEPRINT]: `解读图纸：智力+科学（解读图纸）具体的检定请去查看“造物规则”中的解读图纸部分`,

    [SkillMajor.HORSEMANSHIP]: `骑乘战斗：操控+动物沟通（骑术），又名（骑乘）这是一个特殊的专业，获得本专业之后，你在进行骑乘战斗的所有检定可以获得1DP专业加值，本专业加值可以与其他专业加值叠加。并且若你没有本专业，则你在骑乘战斗时的所有技能检定受到没有专业的对应惩罚。`,
    [SkillMajor.BEASTMASTERY]: `训练动物：操控+动物沟通（驯兽）本技能可以训练动物让其做到一些工作，如拉车，战斗，看守等行为。`,
    [SkillMajor.BEAST_LANGUAGE]: `改善动物态度：操控+动物沟通（兽语）改善动物态度`,
    
    [SkillMajor.FIRM_STAND]: `检定立场：决心/沉着取高+感受（坚定立场）本专业的使用方法为对抗目标的交涉，说服，威吓，咆哮检定，具体的使用方法请查看“交涉”“说服”以及“威吓”“咆哮”的相关规则。`,
    [SkillMajor.SENSE_MOTIVE]: `察言观色：感知+感受（察言观色）本技能可以让你判断出目标的一些情绪，精神状态等。`,
    
    [SkillMajor.SING]: `唱歌：风度+表达（唱歌）唱歌是指歌者使用自身的声带进行发声，需要口腔发音，所以不具备语言能力的无法使用本技能，同时在使用本子技能时，任何语言相关的能力全部无法使用，视为被占用。`,
    [SkillMajor.PLAY]: `演奏：风度+表达（演奏）演奏是指通过乐器进行演奏的行为，需要手部动作，一般都是双手，所以演奏时无法使用手部动作，同时，某些特殊的乐器需要口腔一起（如小号），若为这种乐器，则语言相关能力则全部无法使用，视为被占用。`,
    [SkillMajor.DANCE]: `舞蹈：风度+表达（舞蹈）舞蹈是指舞者通过自身的形体进行表演，需要全身的动作。跳舞时一般手部不视为被占用，但是跳舞时由于舞蹈的原因无法使用任何带有姿势的能力，视为被占用。`,
    [SkillMajor.PHYSICALLY_ACT]: `肢体表演：风度+表达（肢体表演）肢体表演是指表演者通过自身的形体或者技巧进行表演，大部分需要全身的动作，偶尔需要一部分动作。如魔术，杂技皆在此列。一般而言，进行肢体表演的表演者无法使用任何带有姿势的能力。`,
    [SkillMajor.SPEECH]: `演讲：风度+表达-演讲（朗诵）演讲和朗诵是指通过说话来进行表演的行为，需要口腔发音，所以不具备语言能力的无法使用本技能，同时在使用本子技能时，任何语言相关的能力全部无法使用，视为被占用。`,
    
    [SkillMajor.INTIMIDATE]: `威吓：操控+胁迫（威吓）本技能可以让你通过恐吓，惊吓临时改变目标对你的态度，但是会损害你与目标之间长期性的关系。`,
    [SkillMajor.ROAR]: `咆哮：力量+胁迫（咆哮）本技能可以让你在战斗中恐吓对手，削弱敌人的信心。`,
    
    [SkillMajor.NEGOTIATE]: `交涉：操控+交际（交涉）本技能可以让你通过口才相关的手段，改变别人对你的态度。`,
    [SkillMajor.CONVINCE]: `说服：操控+交际（说服）本技能可以让你通过口才相关的手段，临时改变别人对一个事物的看法。`,
    [SkillMajor.COLLECTING_INFO]: `收集情报：操控+交际（收集情报）本技能可以让你通过一些渠道获知地方传言、散布谣言、或搜集一般资讯。`,
    
    [SkillMajor.FEINT]: `虚招：智力+掩饰（虚招）本专业可以在你进行虚招检定时获得专业加值`,
    [SkillMajor.BLUFFING]: `唬骗：操控+掩饰（唬骗）本技能可以让你将虚假的信息说的如同真的，给予欺骗别人的手段。`,
    [SkillMajor.DISGUISE]: `易容：智力/操控+掩饰（易容）本技能可以让你通过改变自己或者他人的样貌。`,
    [SkillMajor.CAMOUFLAGE]: `伪装：智力/操控+掩饰（伪装）本技能让你伪装成某个特定人群，而非某个特定的人物。`,

    [EquipmentAffix.FIGHT_WEAPON]: `这种武器一般都是拳套，或者套在天生武器上的，使用该武器进行攻击时，使用肉搏检定而非白刃检定，并且其效果与天生武器带来的效果叠加，若效果重复则取高，若效果冲突，则以天生武器为准，并且肉搏武器并不视为白刃武器，对于某些技能、专长、招式使用白刃才能发动的话，肉搏武器无法发动。`,
    [EquipmentAffix.POLEARMS_WEAPON]: `使用本武器进行攻击时，武器触及范围等于其体积计算触及后的二倍。`,
    [EquipmentAffix.ENERGY_WEAPON]: `远程的能量武器拥有【高速8】特性。用这类武器攻击时，最多将相当于武器伤害1/2的伤害值转换为恶性伤害。若没有特殊说明，能量武器造成纯能量伤害。`,
    [EquipmentAffix.LIGHT_THROW_WEAPON]: `说明本武器适合投掷，在使用投掷攻击时获得1DP的器械加值。`,
    [EquipmentAffix.HEAVY_THROW_WEAPON]: `在使用其进行投掷攻击时，以力量为关键属性进行判定。`,
    [EquipmentAffix.HIDDEN_WEAPON]: `暗器必然是轻投掷武器，并且使用暗器攻击时，目标需要进行一个感知+调查的检定，DC为1，若没有成功，则目标视为措手不及，这是无支线的措手不及。`,
    [EquipmentAffix.SOFT_WEAPON]: `装备拥有本特性的武器进行擒抱对抗或绊摔时，可以使用白刃技能代替肉搏技能进行检定。可以卷缠物品，并且武器触及范围等于其体积计算触及后的二倍。`,
    [EquipmentAffix.TWO_HAND]: `拥有本特性的武器被称为双手武器，没有的则是单手武器。通常这种武器比较大比较沉。单手持用双手武器时，力量需求额外增加1/2武器体积的数值。双手持用单手武器时，该武器的最低力量要求视为比实际值低1。`,
    [EquipmentAffix.HEAVY]: `这武器比看起来要重。所需力量额外增加相当于武器体积1/2的值，这将加在该武器的力量需求上。`,
    [EquipmentAffix.BINDING]: `认主的物品会与第一个能完美地运用它的人建立命运上的紧密联系，此后他人无法再使用这件物品。这件物品与主人灵魂绑定，若主人返回主神空间时该物品不在身边也可一同返回。若主人死亡后遗失该物品，则主人若复活，则该物品会自动出现在主人手中。物品的主人可以随时知晓它现在的方位和距离，这是一个影响心灵的效果，无法被任何方式隔断。`,
    [EquipmentAffix.RUN_THROUGH]: `当对一个目标成功造成伤害之后，可立即对在其同一直线上的另一个目标进行另外一次攻击检定，这次的攻击检定的攻击DP要减去上一次攻击造成伤害数的DP，直到没有合适的目标或者有一次检定没有造成剩余伤害为止。`,
    [EquipmentAffix.SUPER_RUN_THROUGH]: `如同【贯穿】，但是以它进行的攻击忽视轨迹上硬度低于其破甲值的障碍物，并对其造成正常伤害。同时攻击目标时并不承受正常的【贯穿】特性带来的减值。但如果轨迹上有硬度超过其破甲值的物体或角色，那么从穿过该物体开始，按照普通的【贯穿】攻击计算。它同时忽视等同于破甲值那么多点的掩蔽加值。`,
    [EquipmentAffix.MAGIC]: `拥有本特性的攻击可以穿透相应的伤害减免，并且在一定程度上伤害灵体和虚体生物。当具有此特质的武器攻击灵体或虚体生物时，投一个d10，若结果为6、7、8、9或10，则可以对虚体或灵体生物正常造成伤害。拥有本特性的物品、装备可以在科技无效的影片中使用。`,
    [EquipmentAffix.SPECTRAL]: `拥有本特性的物品可以直接影响和伤害灵体生物与虚体生物，且造成恶性伤害。`,
    [EquipmentAffix.HOLY]: `又称【光明】。此类武器对黑暗生物造成的伤害中会有最多不超过武器伤害的伤害提升1级。`,
    [EquipmentAffix.BLASPHEMY]: `又称【黑暗】。此类武器对光明生物造成的伤害中会有最多不超过武器伤害的伤害提升1级。`,
    [EquipmentAffix.VERTIGO]: `由于巨大的冲击力，如果本次伤害超过了目标的体积或耐力（取较高者），对方会获得相当于武器伤害的晕眩点数，强韧豁免，不可叠加。`,
    [EquipmentAffix.BLOW_FLY]: `这类武器能够造成巨大的冲击力将对手击飞，其造成的伤害中超出对方体积与耐力较高者的数值，每一点都会使对方被击退一米，方向由攻击者选择。被击飞者必须通过一个难度等同击飞距离（米）的反射判定，否则将倒地。`,
    [EquipmentAffix.MIGHTY]: `用这样的武器来攻击格挡中的敌人时，额外增加等同于武器体积一半的DP，最多不超过对方的格挡防御与盾牌防御的总和。`,
    [EquipmentAffix.BOOMERANG]: `拥有本特性的这类武器，弹药在进行投掷、射击等远程攻击后，在回合结束时会直接自动出现在使用者的手中。`,
    [EquipmentAffix.BURST_ARROW]: `被任何具有此特性的武器攻击的目标若是在计算破甲后其盔甲防御+天生防御的数值小于爆矢武器的武器伤害值，则其所受伤害会有等同于武器体积一半的数值转化为恶性。`,
    [EquipmentAffix.CANNONRY]: `发动炮击意味着对目标区域进行范围攻击，范围内的所有目标需要进行反射豁免。范围的直径为炮的体积，范围伤害为武器伤害，你进行一个正常的炮类攻击检定，本次判定没有武器伤害，并且需扣除对方除了基础、闪避、洞察、格挡以外的所有防御，并且你的破甲可以如常对目标的盔甲防御、天生防御、盾牌防御生效。对方用反射豁免，每有1点成功数，豁免1点伤害，并承担如同你成功数的减值，并且会承受高速减值。炮击由于要扣除对方的部分防御，所以应当对每一个攻击目标分别进行一次检定。`,
    [EquipmentAffix.STAND]: `这类武器若以一个整轮动作架起支架并支在稳固平面上，则所需力量降低为原来的一半。`,
    [EquipmentAffix.GUIDANCE]: `这类武器可以使用一个整轮动作进行“目标锁定”动作，你进行一次远程接触攻击（不计入武器伤害）检定对抗目标的反射或规避（如果是载具）判定，每胜出1点，则下一次你使用本武器攻击“被锁定的目标”时，可以将1DP转化为1点附加成功，最大不超过武器伤害值。制导类的武器通常必须锁定后才允许发射，并且无法因瞄准而得到好处。`,
    [EquipmentAffix.AUTO_GUIDANCE]: `本特性如同【制导】，但是不需要花费动作进行锁定，而是发射后自动锁定目标。`,
    [EquipmentAffix.TRACE]: `追踪必须建立在制导的基础上，这类武器攻击后，若本轮没有命中，则下一轮会承受递减的5DP减值继续对目标进行攻击，直到目标离开最大射程或没有骰数为止。`,
    [EquipmentAffix.SHORT_SHOT]: `你可以使用这类武器进行短点射，一般来说是一次发射3发弹药。这会为你的攻击带来1DP的完美加值。`,
    [EquipmentAffix.LONG_SHOT]: `你可以使用这类武器进行长点射，一般来说是一次发射5发弹药。这会为你的攻击带来2DP的完美加值，并且会在攻击目标的同时，自动同时攻击与其相邻的一个目标。每多攻击一个目标，你需要承担1DP的无名减值，针对一次攻击，受到攻击的目标不会反复受到本能力影响。`,
    [EquipmentAffix.CONTINUOUS_SHOT]: `你可以使用这类武器进行连射，一般来说是一次发射10发弹药。这会为你的攻击带来3DP的完美加值，并且会在攻击目标的同时，自动同时攻击与其相邻的所有目标，最多不超过所发射的弹药数。每多攻击一个目标，你需要承担1DP的无名减值，针对一次攻击，受到攻击的目标不会反复受到本能力影响。`,
    [EquipmentAffix.SUPPRESSIVE_FIRE]: `拥有这种特性的武器，可无减值对基础射程一半的线状范围或射程1/4的锥状范围内进行扫射，这视为一个范围攻击，一般会消耗等同于连射两倍数量的弹药，伤害等同于武器伤害。你进行一个正常的枪械攻击判定，本次判定没有武器伤害，并且需扣除对方除了基础、闪避、洞察、格挡以外的所有防御，并且你的破甲可以如常对目标的盔甲防御、天生防御、盾牌防御生效。对方用反射豁免，每有1点成功数，豁免1点伤害，并承担如同你成功数的减值，并且会承受高速减值。你可以有意避过一些范围内的目标，每避过一个目标，则你的枪械攻击检定失去1点成功。若你的力量小于武器要求，则进行火力压制时会承受相应数量的伤害减值。你可以选择再消耗双倍弹药，将火力压制维持到下一轮你的行动开始时。若你如此做，则任何在此期间进入你火力压制范围的生物也会受到伤害。火力压制由于要扣除对方的部分防御，所以应当对每一个攻击目标分别进行一次检定。`,
    [EquipmentAffix.INFINITE_AMMUNITION]: `一般拥有本特性的武器，都是发射类远程武器，这种武器的弹药或者能耗视为无限，无需对应的子弹或者能源。这种武器若为实体弹药类，则无法使用特种子弹，也无法进行子弹改造。这种武器的子弹或者能量无法以任何方式取出，只有在其正常进行攻击时，该弹药或者能量会自动按照刚刚好的数量填充上并马上发射。无限弹药的武器在射击时，每次攻击发射的子弹或者能量上限为该武器原本的装弹量（如果有）。`,
    [EquipmentAffix.PARRY]: `使用此武器格挡时，角色获得相当于武器体积的盾牌加值，其余格挡加值一起加在格挡带来的防御值中。人物只能从一件具有格挡特性的武器中获得好处。`,
    [EquipmentAffix.BULLET_PROOF]: `实弹枪械武器的攻击伤害对其降低一级（最低为冲击）`,
    [EquipmentAffix.ENERGY_PROOF]: `能量武器的攻击无法对其转化恶性伤害。`,
    [EquipmentAffix.THREE_PROOF]: `防高压、防宇宙、防极端温度。具有这种特性的甲胄将人物整个包裹。穿戴者免疫水压带来的伤害，以及海拔带来的影响。免疫真空和辐射带来的影响。免疫温度变化带来的影响。`,
    [EquipmentAffix.EIGHT_DICE_BONUS]: `当进行攻击检定时，骰掷出8以上的点数时可以获得一枚奖励骰`,
    [EquipmentAffix.NINE_DICE_BONUS]: `当进行攻击检定时，骰掷出9以上的点数时可以获得一枚奖励骰`,

    // resource
    "credit": "一般在完成恐怖片会后主神会根据任务完成程度来发放",
    "branchPoint": "一般在完成恐怖片会后主神会根据任务完成程度来发放，支线点分为D/C/B/A/S等5个等级，为三进制转换，即1S=3A=9B=27C=81D",
    "experience": "一般在完成恐怖片会后主神会根据玩家的扮演程度来发放",
};
