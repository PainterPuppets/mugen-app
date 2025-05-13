export enum SkillCategory {
  Physiology = "physiology",
  Mental = "mental",
  Interaction = "interaction",
}

export const SkillCategoryMap = {
  [SkillCategory.Physiology]: "生理系",
  [SkillCategory.Mental]: "心智系",
  [SkillCategory.Interaction]: "互动系",
};

export enum SkillFlag {
  // 生理系
  Athletics = 'athletics',
  Fight = 'fight',
  Drive = 'drive',
  Firearms = 'firearms',
  Larceny = 'larceny',
  Stealth = 'stealth',
  Survival = 'survival',
  Blade = 'blade',
  Bow = 'bow',

  // 心智系
  Academics = 'academics',
  Computer = 'computer',
  Craft = 'craft',
  Investigation = 'investigation',
  Medicine = 'medicine',
  Occult = 'occult',
  Science = 'science',

  // 互动系
  Beastmastery = 'beastmastery',
  Empathy = 'empathy',
  Expression = 'expression',
  Intimidation = 'intimidation',
  Socialize = 'socialize',
  Subterfuge = 'subterfuge',
}

export const CategoryToSkillDict: {
  [key in SkillCategory]: Array<SkillFlag>
} = {
  [SkillCategory.Physiology]: [
    SkillFlag.Athletics,
    SkillFlag.Fight,
    SkillFlag.Drive,
    SkillFlag.Firearms,
    SkillFlag.Larceny,
    SkillFlag.Stealth,
    SkillFlag.Survival,
    SkillFlag.Blade,
    SkillFlag.Bow,
  ],
  [SkillCategory.Mental]: [
    SkillFlag.Academics,
    SkillFlag.Computer,
    SkillFlag.Craft,
    SkillFlag.Investigation,
    SkillFlag.Medicine,
    SkillFlag.Occult,
    SkillFlag.Science,
  ],
  [SkillCategory.Interaction]: [
    SkillFlag.Beastmastery,
    SkillFlag.Empathy,
    SkillFlag.Expression,
    SkillFlag.Intimidation,
    SkillFlag.Socialize,
    SkillFlag.Subterfuge,
  ],
}

type SkillToCategoryDictType = {
  [key in SkillFlag]: SkillCategory
};
const convertDictToArray = (category: SkillCategory) => CategoryToSkillDict[category].map((skill) => [skill, category])
const mergeArray = <T>(a: Array<T>, b: Array<T>) => a.concat(b);
const mergeArrayToDict = (a: any, b: Array<string>, index: number): any => ({...a, [b[0]]: b[1]})

export const SkillToCategoryDict: SkillToCategoryDictType = (Object.keys(CategoryToSkillDict) as Array<SkillCategory>).map(convertDictToArray).reduce(mergeArray).reduce(mergeArrayToDict, {});


export const SkillMap = {
  [SkillFlag.Athletics]: '运动',
  [SkillFlag.Fight]: '肉搏',
  [SkillFlag.Drive]: '驾驶',
  [SkillFlag.Firearms]: '枪械',
  [SkillFlag.Larceny]: '手上功夫',
  [SkillFlag.Stealth]: '躲藏',
  [SkillFlag.Survival]: '求生',
  [SkillFlag.Blade]: '白刃',
  [SkillFlag.Bow]: '弓箭',
  [SkillFlag.Academics]: '学识',
  [SkillFlag.Computer]: '计算机',
  [SkillFlag.Craft]: '手艺',
  [SkillFlag.Investigation]: '调查',
  [SkillFlag.Medicine]: '医学',
  [SkillFlag.Occult]: '神秘学',
  [SkillFlag.Science]: '科学',
  [SkillFlag.Beastmastery]: '动物沟通',
  [SkillFlag.Empathy]: '感受',
  [SkillFlag.Expression]: '表达',
  [SkillFlag.Intimidation]: '胁迫',
  [SkillFlag.Socialize]: '交际',
  [SkillFlag.Subterfuge]: '掩饰',
}

export enum SkillMajor {
    // 运动
    LIGHT_THROW = 'light_throw',             // 轻投掷武器
    HEAVY_THROW = 'heavy_throw',             // 重投掷武器
    REFLEX = 'reflex',                       // 反射（自我保护）
    RAY = 'ray',                             // 射线
    SPIT = 'spit',                           // 喷吐
    ENERGY_SHOOTING = 'energy_shooting',     // 能量射击
    OVERRUN = 'overrun',                     // 闯越
    BALANCE = 'balance',                     // 平衡感
    JUMP = 'jump',                           // 跳跃
    CLIMB = 'climb',                         // 攀爬
    ESCAPE = 'escape',                       // 逃脱
    SWIM = 'swim',                           // 游泳

    // 肉搏
    HAND_FIGHT = 'hand_fight',           // 手
    LEG_FIGHT = 'leg_fight',             // 腿
    TOOTH_FIGHT = 'tooth_fight',         // 牙齿
    WING_FIGHT = 'wing_fight',           // 翅膀
    TENTACLE_FIGHT = 'tentacle_fight',   // 触手
    TAIL_FIGHT = 'tail_fight',           // 尾巴
    GLOVES = 'gloves',                   // 拳套
    GRAPPLE = 'grapple',                 // 擒抱
    BUMP = 'bump',                       // 冲撞
    WINGCLIP = 'wingclip',               // 摔绊
    FIGHT_PARRY = 'fight_parry',         // 肉搏格挡

    // 驾驶
    LIGHT_VEHICLE = 'light_vehicle',     // 轻型载具
    HEAVY_VEHICLE = 'heavy_vehicle',     // 重型载具
    HUMANOID_ROBOT = 'humanoid_robot',   // 人形机器人
    EVA = 'eva',                         // EVA
    GUNDAM = 'gundam',                   // 高达

    // 枪械
    PISTOL = 'pistol',                   // 手枪
    MACHINE_GUN = 'machine_gun',         // 机枪
    RIFLE = 'rifle',                     // 步枪
    CANNON = 'cannon',                   // 炮
    CROSSBOW = 'crossbow',               // 弩
    FIREARMS_AIM = 'firearms_aim',       // 枪械瞄准
    FIREARMS_PARRY = 'firearms_parry',   // 枪械格挡

    // 手上功夫
    UNLOCK = 'unlock',       // 开锁
    STEAL = 'steal',         // 盗窃
    HIDE_ITEM = 'hide_item', // 隐藏物品
    TIEDUP = 'tiedup',       // 捆绑

    // 躲藏
    HIDE = 'hide',           // 隐藏
    STEALTH = 'stealth',     // 潜行

    // 求生
    WILDERNESS_SURVIVAL = 'wilderness_survival', // 野外求生
    FORTITUDE = 'fortitude',                     // 强韧（自我保护）
    TRACE = 'trace',                             // 追踪

    // 白刃
    SWORD = 'sword',             // 剑
    KNIFE = 'knife',             // 刀
    HAMMER = 'hammer',           // 锤
    STICK = 'stick',             // 棍
    DAGGER = 'dagger',           // 匕首
    SICKLE = 'sickle',           // 镰刀
    AXE = 'axe',                 // 斧
    SPEAR = 'spear',             // 矛
    WHIP = 'whip',               // 鞭
    FAN = 'fan',                 // 扇
    SHIELD = 'shield',           // 盾
    BLADE_PARRY = 'blade_parry', // 白刃格挡

    // 弓箭
    BOW = 'bow',             // 弓箭
    BOW_AIM = 'bow_aim',     // 弓箭瞄准
    BOW_PARRY = 'bow_parry', // 弓箭格挡

    //// 心智系
    // 学识
    FILE_DECRYPTION = 'file_decryption', // 文件解读
    GEOGRAPHY = 'geography',             // 地理
    HISTORY = 'history',                 // 历史
    MONSTER = 'monster',                 // 怪物

    // 电脑
    HACKER = 'hacker',               // 黑客
    FIREWALL = 'firewall',           // 防火墙
    COMPUTER_GAME = 'computer_game', // 电子游戏
    COMPUTER_USE = 'computer_use',   // 电脑使用

    // 手艺
    DANDAO = 'dandao',       // 丹道
    XIANGONG = 'xiangong',   // 仙工

    // 调查
    SEARCH = 'search',       // 搜索
    LISTEN = 'listen',       // 聆听
    RECON = 'recon',         // 侦查
    READ_LIP = 'read_lip',   // 读唇

    // 医学
    FIRST_AID = 'first_aid', // 急救
    NURSE = 'nurse',         // 长线治疗
    DIAGNOSIS = 'diagnosis', // 诊断
    CURE = 'cure',           // 治疗

    // 神秘学
    DIVINATION = 'divination',       // 预言
    CONJURATION = 'conjuration',     // 咒法
    EVOCATION = 'evocation',         // 塑能
    NECROMANCY = 'necromancy',       // 死灵
    ILLUSION = 'illusion',           // 幻象
    ABJURATION = 'abjuration',       // 防护
    TRANSMUTATION = 'transmutation', // 变化
    ENCHANTMENT = 'enchantment',     // 惑控
    WARD = 'ward',                   // 结界
    CREATE = 'create',               // 创造
    CURESE = 'curese',               // 诅咒
    SAGECRAFT = 'sagecraft',         // 附魔
    SPELLCRAFT = 'spellcraft',       // 法术辨识
    TAOIST_MAGIC = 'taoist_magic',   // 道术

    // 科学
    CLASSICAL_PHYSICS = 'classical_physics', // 经典物理
    OPTICS = 'optics',                       // 光学
    MECHANICS = 'mechanics',                 // 力学
    QUANTUM_SPHYSICS = 'quantum_sphysics',   // 量子物理
    CHEMISTRY = 'chemistry',                 // 化学
    BIOLOGY = 'biology',                     // 生物学
    MATHEMATICS = 'mathematics',             // 数学
    BLUEPRINT = 'blueprint',                 // 解读图纸

    // 互动系
    // 动物沟通
    HORSEMANSHIP = 'horsemanship',       // 骑术
    BEASTMASTERY = 'beastmastery',       // 驯兽
    BEAST_LANGUAGE = 'beast_language',   // 兽语

    // 感受
    FIRM_STAND = 'firm_stand',       // 坚定立场
    SENSE_MOTIVE = 'sense_motive',   // 察言观色

    // 表达
    SING = 'sing',                       // 唱歌
    PLAY = 'play',                       // 演奏
    DANCE = 'dance',                     // 舞蹈
    PHYSICALLY_ACT = 'physically_act',   // 肢体表演
    SPEECH = 'speech',                   // 演讲

    // 胁迫
    INTIMIDATE = 'intimidate',   // 威吓
    ROAR = 'roar',               // 咆哮

    // 交际
    NEGOTIATE = 'negotiate',               // 交涉
    CONVINCE = 'convince',                 // 说服
    COLLECTING_INFO = 'collecting_info',   // 收集情报

    // 掩饰
    FEINT = 'feint',             // 虚招
    BLUFFING = 'bluffing',       // 唬骗
    DISGUISE = 'disguise',       // 易容
    CAMOUFLAGE = 'camouflage',   // 伪装
}

export const SkillMajorMap = {
    [SkillMajor.LIGHT_THROW]:     '轻投掷武器',
    [SkillMajor.HEAVY_THROW]:     '重投掷武器',
    [SkillMajor.REFLEX]:          '反射（自我保护）',
    [SkillMajor.RAY]:             '射线',
    [SkillMajor.SPIT]:            '喷吐',
    [SkillMajor.ENERGY_SHOOTING]: '能量射击',
    [SkillMajor.OVERRUN]:         '闯越',
    [SkillMajor.BALANCE]:         '平衡感',
    [SkillMajor.JUMP]:            '跳跃',
    [SkillMajor.CLIMB]:           '攀爬',
    [SkillMajor.ESCAPE]:          '逃脱',
    [SkillMajor.SWIM]:            '游泳',
    [SkillMajor.HAND_FIGHT]:      '手',
    [SkillMajor.LEG_FIGHT]:       '腿',
    [SkillMajor.TOOTH_FIGHT]:     '牙齿',
    [SkillMajor.WING_FIGHT]:      '翅膀',
    [SkillMajor.TENTACLE_FIGHT]:  '触手',
    [SkillMajor.TAIL_FIGHT]:      '尾巴',
    [SkillMajor.GLOVES]:          '拳套',
    [SkillMajor.GRAPPLE]:         '擒抱',
    [SkillMajor.BUMP]:            '冲撞',
    [SkillMajor.WINGCLIP]:        '摔绊',
    [SkillMajor.FIGHT_PARRY]:     '肉搏格挡',
    [SkillMajor.LIGHT_VEHICLE]:   '轻型载具',
    [SkillMajor.HEAVY_VEHICLE]:   '重型载具',
    [SkillMajor.HUMANOID_ROBOT]:  '人形机器人',
    [SkillMajor.EVA]:             'EVA',
    [SkillMajor.GUNDAM]:          '高达',
    [SkillMajor.PISTOL]:          '手枪',
    [SkillMajor.MACHINE_GUN]:     '机枪',
    [SkillMajor.RIFLE]:           '步枪',
    [SkillMajor.CANNON]:          '炮',
    [SkillMajor.CROSSBOW]:        '弩',
    [SkillMajor.FIREARMS_AIM]:    '枪械瞄准',
    [SkillMajor.FIREARMS_PARRY]:  '枪械格挡',
    [SkillMajor.UNLOCK]:          '开锁',
    [SkillMajor.STEAL]:           '盗窃',
    [SkillMajor.HIDE_ITEM]:       '隐藏物品',
    [SkillMajor.TIEDUP]:          '捆绑',
    [SkillMajor.HIDE]:            '隐藏',
    [SkillMajor.STEALTH]:         '潜行',
    [SkillMajor.WILDERNESS_SURVIVAL]: '野外求生',
    [SkillMajor.FORTITUDE]:           '强韧（自我保护）',
    [SkillMajor.TRACE]:               '追踪',
    [SkillMajor.SWORD]:           '剑',
    [SkillMajor.KNIFE]:           '刀',
    [SkillMajor.HAMMER]:          '锤',
    [SkillMajor.STICK]:           '棍',
    [SkillMajor.DAGGER]:          '匕首',
    [SkillMajor.SICKLE]:          '镰刀',
    [SkillMajor.AXE]:             '斧',
    [SkillMajor.SPEAR]:           '矛',
    [SkillMajor.WHIP]:            '鞭',
    [SkillMajor.FAN]:             '扇',
    [SkillMajor.SHIELD]:          '盾',
    [SkillMajor.BLADE_PARRY]:     '白刃格挡',
    [SkillMajor.BOW]:             '弓箭',
    [SkillMajor.BOW_AIM]:         '弓箭瞄准',
    [SkillMajor.BOW_PARRY]:       '弓箭格挡',
    [SkillMajor.FILE_DECRYPTION]: '文件解读',
    [SkillMajor.GEOGRAPHY]:       '地理',
    [SkillMajor.HISTORY]:         '历史',
    [SkillMajor.MONSTER]:         '怪物',
    [SkillMajor.HACKER]:          '黑客',
    [SkillMajor.FIREWALL]:        '防火墙',
    [SkillMajor.COMPUTER_GAME]:   '电子游戏',
    [SkillMajor.COMPUTER_USE]:    '电脑使用',
    [SkillMajor.DANDAO]:          '丹道',
    [SkillMajor.XIANGONG]:        '仙工',
    [SkillMajor.SEARCH]:          '搜索',
    [SkillMajor.LISTEN]:          '聆听',
    [SkillMajor.RECON]:           '侦查',
    [SkillMajor.READ_LIP]:        '读唇',
    [SkillMajor.FIRST_AID]:       '急救',
    [SkillMajor.NURSE]:           '长线治疗',
    [SkillMajor.DIAGNOSIS]:       '诊断',
    [SkillMajor.CURE]:            '治疗',
    [SkillMajor.DIVINATION]:      '预言',
    [SkillMajor.CONJURATION]:     '咒法',
    [SkillMajor.EVOCATION]:       '塑能',
    [SkillMajor.NECROMANCY]:      '死灵',
    [SkillMajor.ILLUSION]:        '幻象',
    [SkillMajor.ABJURATION]:      '防护',
    [SkillMajor.TRANSMUTATION]:   '变化',
    [SkillMajor.ENCHANTMENT]:     '惑控',
    [SkillMajor.WARD]:            '结界',
    [SkillMajor.CREATE]:          '创造',
    [SkillMajor.CURESE]:          '诅咒',
    [SkillMajor.SAGECRAFT]:       '附魔',
    [SkillMajor.SPELLCRAFT]:      '法术辨识',
    [SkillMajor.TAOIST_MAGIC]:    '道术',
    [SkillMajor.CLASSICAL_PHYSICS]:   '经典物理',
    [SkillMajor.OPTICS]:              '光学',
    [SkillMajor.MECHANICS]:           '力学',
    [SkillMajor.QUANTUM_SPHYSICS]:    '量子物理',
    [SkillMajor.CHEMISTRY]:           '化学',
    [SkillMajor.BIOLOGY]:             '生物学',
    [SkillMajor.MATHEMATICS]:         '数学',
    [SkillMajor.BLUEPRINT]:           '解读图纸',
    [SkillMajor.HORSEMANSHIP]:    '骑术',
    [SkillMajor.BEASTMASTERY]:    '驯兽',
    [SkillMajor.BEAST_LANGUAGE]:  '兽语',
    [SkillMajor.FIRM_STAND]:      '坚定立场',
    [SkillMajor.SENSE_MOTIVE]:    '察言观色',
    [SkillMajor.SING]:            '唱歌',
    [SkillMajor.PLAY]:            '演奏',
    [SkillMajor.DANCE]:           '舞蹈',
    [SkillMajor.PHYSICALLY_ACT]:  '肢体表演',
    [SkillMajor.SPEECH]:          '演讲',
    [SkillMajor.INTIMIDATE]:      '威吓',
    [SkillMajor.ROAR]:            '咆哮',
    [SkillMajor.NEGOTIATE]:       '交涉',
    [SkillMajor.CONVINCE]:        '说服',
    [SkillMajor.COLLECTING_INFO]: '收集情报',
    [SkillMajor.FEINT]:           '虚招',
    [SkillMajor.BLUFFING]:        '唬骗',
    [SkillMajor.DISGUISE]:        '易容',
    [SkillMajor.CAMOUFLAGE]:      '伪装',
}

export const SkillToMajorDict = {
  [SkillFlag.Athletics]: [
    SkillMajor.LIGHT_THROW,
    SkillMajor.HEAVY_THROW,
    SkillMajor.REFLEX,
    SkillMajor.RAY,
    SkillMajor.SPIT,
    SkillMajor.ENERGY_SHOOTING,
    SkillMajor.OVERRUN,
    SkillMajor.BALANCE,
    SkillMajor.JUMP,
    SkillMajor.CLIMB,
    SkillMajor.ESCAPE,
    SkillMajor.SWIM,
  ],
  [SkillFlag.Fight]: [
    SkillMajor.HAND_FIGHT,
    SkillMajor.LEG_FIGHT,
    SkillMajor.TOOTH_FIGHT,
    SkillMajor.WING_FIGHT,
    SkillMajor.TENTACLE_FIGHT,
    SkillMajor.TAIL_FIGHT,
    SkillMajor.GLOVES,
    SkillMajor.GRAPPLE,
    SkillMajor.BUMP,
    SkillMajor.WINGCLIP,
    SkillMajor.FIGHT_PARRY, 
  ],
  [SkillFlag.Drive]: [
    SkillMajor.LIGHT_VEHICLE,
    SkillMajor.HEAVY_VEHICLE,
    SkillMajor.HUMANOID_ROBOT,
    SkillMajor.EVA,
    SkillMajor.GUNDAM,
  ],
  [SkillFlag.Firearms]: [
    SkillMajor.PISTOL,
    SkillMajor.MACHINE_GUN,
    SkillMajor.RIFLE,
    SkillMajor.CANNON,
    SkillMajor.CROSSBOW,
    SkillMajor.FIREARMS_AIM,
    SkillMajor.FIREARMS_PARRY,
  ],
  [SkillFlag.Larceny]: [
    SkillMajor.UNLOCK,
    SkillMajor.STEAL,
    SkillMajor.HIDE_ITEM,
    SkillMajor.TIEDUP,
    
  ],
  [SkillFlag.Stealth]: [
    SkillMajor.HIDE,
    SkillMajor.STEALTH,
  ],
  [SkillFlag.Survival]: [
    SkillMajor.WILDERNESS_SURVIVAL,
    SkillMajor.FORTITUDE,
    SkillMajor.TRACE,
  ],
  [SkillFlag.Blade]: [
    SkillMajor.SWORD,
    SkillMajor.KNIFE,
    SkillMajor.HAMMER,
    SkillMajor.STICK,
    SkillMajor.DAGGER,
    SkillMajor.SICKLE,
    SkillMajor.AXE,
    SkillMajor.SPEAR,
    SkillMajor.WHIP,
    SkillMajor.FAN,
    SkillMajor.SHIELD,
    SkillMajor.BLADE_PARRY,
  ],
  [SkillFlag.Bow]: [
    SkillMajor.BOW,
    SkillMajor.BOW_AIM,
    SkillMajor.BOW_PARRY,
  ],
  [SkillFlag.Academics]: [
    SkillMajor.FILE_DECRYPTION,
    SkillMajor.GEOGRAPHY,
    SkillMajor.HISTORY,
    SkillMajor.MONSTER,
  ],
  [SkillFlag.Computer]: [
    SkillMajor.HACKER,
    SkillMajor.FIREWALL,
    SkillMajor.COMPUTER_GAME,
    SkillMajor.COMPUTER_USE,
  ],
  [SkillFlag.Craft]: [
    SkillMajor.DANDAO,
    SkillMajor.XIANGONG,
  ],
  [SkillFlag.Investigation]: [
    SkillMajor.SEARCH,
    SkillMajor.LISTEN,
    SkillMajor.RECON,
    SkillMajor.READ_LIP,
  ],
  [SkillFlag.Medicine]: [
    SkillMajor.FIRST_AID,
    SkillMajor.NURSE,
    SkillMajor.DIAGNOSIS,
    SkillMajor.CURE,
  ],
  [SkillFlag.Occult]: [
    SkillMajor.DIVINATION,
    SkillMajor.CONJURATION,
    SkillMajor.EVOCATION,
    SkillMajor.NECROMANCY,
    SkillMajor.ILLUSION,
    SkillMajor.ABJURATION,
    SkillMajor.TRANSMUTATION,
    SkillMajor.ENCHANTMENT,
    SkillMajor.WARD,
    SkillMajor.CREATE,
    SkillMajor.CURESE,
    SkillMajor.SAGECRAFT,
    SkillMajor.SPELLCRAFT,
    SkillMajor.TAOIST_MAGIC,
  ],
  [SkillFlag.Science]: [
    SkillMajor.CLASSICAL_PHYSICS,
    SkillMajor.OPTICS,
    SkillMajor.MECHANICS,
    SkillMajor.QUANTUM_SPHYSICS,
    SkillMajor.CHEMISTRY,
    SkillMajor.BIOLOGY,
    SkillMajor.MATHEMATICS,
    SkillMajor.BLUEPRINT,
  ],
  [SkillFlag.Beastmastery]: [
    SkillMajor.HORSEMANSHIP,
    SkillMajor.BEASTMASTERY,
    SkillMajor.BEAST_LANGUAGE,
  ],
  [SkillFlag.Empathy]: [
    SkillMajor.FIRM_STAND,
    SkillMajor.SENSE_MOTIVE,
  ],
  [SkillFlag.Expression]: [
    SkillMajor.SING,
    SkillMajor.PLAY,
    SkillMajor.DANCE,
    SkillMajor.PHYSICALLY_ACT,
    SkillMajor.SPEECH,  
  ],
  [SkillFlag.Intimidation]: [
    SkillMajor.INTIMIDATE,
    SkillMajor.ROAR,
  ],
  [SkillFlag.Socialize]: [
    SkillMajor.NEGOTIATE,
    SkillMajor.CONVINCE,
    SkillMajor.COLLECTING_INFO,
  ],
  [SkillFlag.Subterfuge]: [
    SkillMajor.FEINT,
    SkillMajor.BLUFFING,
    SkillMajor.DISGUISE,
    SkillMajor.CAMOUFLAGE,
  ],
}

type MajorToSkillDictType = {
  [key in SkillMajor]: SkillFlag
};

const convertSkillDictToArray = (skill: SkillFlag) => SkillToMajorDict[skill].map((major) => [major, skill])
export const MajorToSkillDict: MajorToSkillDictType = (Object.keys(SkillToMajorDict) as Array<SkillFlag>).map(convertSkillDictToArray).reduce(mergeArray).reduce(mergeArrayToDict, {});

export const NOT_PUNISHMENT_MAJORS = [
  SkillMajor.REFLEX,
  SkillMajor.FORTITUDE,
  SkillMajor.BOW_AIM,
  SkillMajor.FIREARMS_AIM,
  SkillMajor.FIRM_STAND,
]

export const NOT_BONUS_MAJORS = [
  SkillMajor.BLADE_PARRY,
  SkillMajor.BOW_PARRY,
  SkillMajor.FIGHT_PARRY,
  SkillMajor.FIREARMS_PARRY,
  SkillMajor.BOW_AIM,
  SkillMajor.FIREARMS_AIM,
]