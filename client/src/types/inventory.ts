export enum GoodsType {
    NORMAL = 0,
    CONSUMABLES = 1,
    EQUIPMENT = 2,
}

export const GoodsTypeMAP={
    [GoodsType.NORMAL]: '普通',
    [GoodsType.CONSUMABLES]: '消耗品',
    [GoodsType.EQUIPMENT]: '装备',
}


export enum EquipmentPosition {
    AMULET = 'amulet',
    CLOAK = 'cloak',
    BELT = 'belt',
    HARMOR = 'harmor',
    ARMOR = 'armor',
    GLOVE = 'glove',
    RING = 'ring',
    FOOT = 'foot',
    HAND = 'hand',
    MAGICWEAPON = 'magic_weapon',
    HEAD = 'head',
    CONCEPT = 'concept',
}

export const EquipmentPositionMap = {
    [EquipmentPosition.AMULET]: '护符',
    [EquipmentPosition.CLOAK]: '披风',
    [EquipmentPosition.BELT]: '腰带',
    [EquipmentPosition.HARMOR]: '重甲',
    [EquipmentPosition.ARMOR]: '轻甲',
    [EquipmentPosition.GLOVE]: '手套',
    [EquipmentPosition.RING]: '戒指',
    [EquipmentPosition.FOOT]: '鞋袜',
    [EquipmentPosition.HAND]: '手持',
    [EquipmentPosition.MAGICWEAPON]: '法宝',
    [EquipmentPosition.HEAD]: '头部',
    [EquipmentPosition.CONCEPT]: '概念武装',
}

export enum WeaponClassify {
    NATURE = 'nature',
    GLOVES = 'gloves',
    SWORD = 'sword',
    KNIFE = 'knife',
    HAMMER = 'hammer',
    STICK = 'stick',
    DAGGER = 'dagger',
    SICKLE = 'sickle',
    AXE = 'axe',
    SPEAR = 'spear',
    WHIP = 'whip',
    FAN = 'fan',
    SHIELD = 'shield',
    BOW = 'bow',
    CROSSBOW = 'crossbow',
    PISTOL = 'pistol',
    RIFLE = 'rifle',
    MACHINE_GUN = 'machine_gun',
    CANNON = 'cannon',
}

export const WeaponClassifyMap = {
    [WeaponClassify.NATURE]:      '天生',
    [WeaponClassify.GLOVES]:      '拳套',
    [WeaponClassify.SWORD]:       '剑',
    [WeaponClassify.KNIFE]:       '刀',
    [WeaponClassify.HAMMER]:      '锤',
    [WeaponClassify.STICK]:       '棍',
    [WeaponClassify.DAGGER]:      '匕首',
    [WeaponClassify.SICKLE]:      '镰刀',
    [WeaponClassify.AXE]:         '斧',
    [WeaponClassify.SPEAR]:       '矛',
    [WeaponClassify.WHIP]:        '鞭',
    [WeaponClassify.FAN]:         '扇',
    [WeaponClassify.SHIELD]:      '盾',
    [WeaponClassify.BOW]:         '弓',
    [WeaponClassify.CROSSBOW]:    '弩',
    [WeaponClassify.PISTOL]:      '手枪',
    [WeaponClassify.RIFLE]:       '步枪',
    [WeaponClassify.MACHINE_GUN]: '机枪',
    [WeaponClassify.CANNON]:      '炮',
}

export enum EquipmentAffix {
    FIGHT_WEAPON = 'fight_weapon',               // 肉搏武器
    POLEARMS_WEAPON = 'polearms_weapon',         // 长柄武器
    ENERGY_WEAPON = 'energy_weapon',             // 能量武器
    LIGHT_THROW_WEAPON = 'light_throw_weapon',   // 轻投掷武器
    HEAVY_THROW_WEAPON = 'heavy_throw_weapon',   // 重投掷武器
    HIDDEN_WEAPON = 'hidden_weapon',             // 暗器
    SOFT_WEAPON = 'soft_weapon',                 // 软兵器
    TWO_HAND = 'two_hand',                       // 双手
    HEAVY = 'heavy',                             // 沉重
    BINDING = 'binding',                         // 认主
    RUN_THROUGH = 'run_through',                 // 贯穿
    SUPER_RUN_THROUGH = 'super_run_through',     // 超级贯穿
    MAGIC = 'magic',                             // 魔法
    SPECTRAL = 'spectral',                       // 幽冥
    HOLY = 'holy',                               // 神圣
    BLASPHEMY = 'blasphemy',                     // 亵渎
    VERTIGO = 'vertigo',                         // 眩晕
    BLOW_FLY = 'blow_fly',                       // 击飞
    MIGHTY = 'mighty',                           // 威猛
    BOOMERANG = 'boomerang',                     // 回力
    BURST_ARROW = 'burst_arrow',                 // 爆矢
    CANNONRY = 'cannonry',                       // 炮击
    STAND = 'stand',                             // 支架
    GUIDANCE = 'guidance',                       // 制导
    AUTO_GUIDANCE = 'auto_guidance',             // 自动制导
    TRACE = 'trace',                             // 追踪
    SHORT_SHOT = 'short_shot',                   // 短点射
    LONG_SHOT = 'long_shot',                     // 长点射
    CONTINUOUS_SHOT = 'continuous_shot',         // 连射
    SUPPRESSIVE_FIRE = 'suppressive_fire',       // 火力压制
    INFINITE_AMMUNITION = 'infinite_ammunition', // 无限弹药
    PARRY = 'parry',                             // 格挡
    BULLET_PROOF = 'bullet_proof',               // 防弹
    ENERGY_PROOF = 'energy_proof',               // 防能量武器
    THREE_PROOF = 'three_proof',                 // 三防
    EIGHT_DICE_BONUS = 'eight_dice_bonus',       // 8加骰
    NINE_DICE_BONUS = 'nine_dice_bonus',         // 9加骰
}

export const EquipmentAffixMap = {
    [EquipmentAffix.FIGHT_WEAPON] :'肉搏武器',
    [EquipmentAffix.POLEARMS_WEAPON] :'长柄武器',
    [EquipmentAffix.ENERGY_WEAPON] :'能量武器',
    [EquipmentAffix.LIGHT_THROW_WEAPON] :'轻投掷武器',
    [EquipmentAffix.HEAVY_THROW_WEAPON] :'重投掷武器',
    [EquipmentAffix.HIDDEN_WEAPON] :'暗器',
    [EquipmentAffix.SOFT_WEAPON] :'软兵器',
    [EquipmentAffix.TWO_HAND] :'双手',
    [EquipmentAffix.HEAVY] :'沉重',
    [EquipmentAffix.BINDING] :'认主',
    [EquipmentAffix.RUN_THROUGH] :'贯穿',
    [EquipmentAffix.SUPER_RUN_THROUGH] :'超级贯穿',
    [EquipmentAffix.MAGIC] :'魔法',
    [EquipmentAffix.SPECTRAL] :'幽冥',
    [EquipmentAffix.HOLY] :'神圣',
    [EquipmentAffix.BLASPHEMY] :'亵渎',
    [EquipmentAffix.VERTIGO] :'眩晕',
    [EquipmentAffix.BLOW_FLY] :'击飞',
    [EquipmentAffix.MIGHTY] :'威猛',
    [EquipmentAffix.BOOMERANG] :'回力',
    [EquipmentAffix.BURST_ARROW] :'爆矢',
    [EquipmentAffix.CANNONRY] :'炮击',
    [EquipmentAffix.STAND] :'支架',
    [EquipmentAffix.GUIDANCE] :'制导',
    [EquipmentAffix.AUTO_GUIDANCE] :'自动制导',
    [EquipmentAffix.TRACE] :'追踪',
    [EquipmentAffix.SHORT_SHOT] :'短点射',
    [EquipmentAffix.LONG_SHOT] :'长点射',
    [EquipmentAffix.CONTINUOUS_SHOT] :'连射',
    [EquipmentAffix.SUPPRESSIVE_FIRE] :'火力压制',
    [EquipmentAffix.INFINITE_AMMUNITION] :'无限弹药',
    [EquipmentAffix.PARRY] :'格挡',
    [EquipmentAffix.BULLET_PROOF] :'防弹',
    [EquipmentAffix.ENERGY_PROOF] :'防能量武器',
    [EquipmentAffix.THREE_PROOF] :'三防',
    [EquipmentAffix.EIGHT_DICE_BONUS] :'8加骰',
    [EquipmentAffix.NINE_DICE_BONUS] :'9加骰',
}

export enum Essence {
    NATURE = 'nature',
    SCIENCE = 'science',
    MAGIC = 'magic',
    PECULIAR = 'peculiar',
}

export const EssenceMap = {
    [Essence.NATURE] :'自然本质',
    [Essence.SCIENCE] :'科技本质',
    [Essence.MAGIC] :'魔幻本质',
    [Essence.PECULIAR] :'特异本质',
}


export enum GoodsLevel {
    N = 0,
    D = 1,
    C = 2,
    B = 3,
    A = 4,
    S = 5,
}

export const GoodsLevelMAP = {
    [GoodsLevel.N]: '无支线物品',
    [GoodsLevel.D]: 'D级物品',
    [GoodsLevel.C]: 'C级物品',
    [GoodsLevel.B]: 'B级物品',
    [GoodsLevel.A]: 'A级物品',
    [GoodsLevel.S]: 'S级物品',
}