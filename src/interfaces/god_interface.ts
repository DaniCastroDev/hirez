export default interface God {
    Ability1: string;
    Ability2: string;
    Ability3: string;
    Ability4: string;
    Ability5: string;
    AbilityId1: number;
    AbilityId2: number;
    AbilityId3: number;
    AbilityId4: number;
    AbilityId5: number;
    Ability_1: Ability;
    Ability_2: Ability;
    Ability_3: Ability;
    Ability_4: Ability;
    Ability_5: Ability;
    AttackSpeed: number;
    AttackSpeedPerLevel: number;
    Cons: string;
    HP5PerLevel: number;
    Health: number;
    HealthPerFive: number;
    HealthPerLevel: number;
    Lore: string;
    MP5PerLevel: number;
    MagicProtection: number;
    MagicProtectionPerLevel: number;
    MagicalPower: number;
    MagicalPowerPerLevel: number;
    Mana: number;
    ManaPerFive: number;
    ManaPerLevel: number;
    Name: string;
    OnFreeRotation: string;
    Pantheon: string;
    PhysicalPower: number;
    PhysicalPowerPerLevel: number;
    PhysicalProtection: number;
    PhysicalProtectionPerLevel: number;
    Pros: string;
    Roles: string;
    Speed: number;
    Title: string;
    Type: string;
    abilityDescription1: AbilityDescription1;
    abilityDescription2: AbilityDescription1;
    abilityDescription3: AbilityDescription1;
    abilityDescription4: AbilityDescription1;
    abilityDescription5: AbilityDescription1;
    basicAttack: AbilityDescription1;
    godAbility1_URL: string;
    godAbility2_URL: string;
    godAbility3_URL: string;
    godAbility4_URL: string;
    godAbility5_URL: string;
    godCard_URL: string;
    godIcon_URL: string;
    id: number;
    latestGod: string;
    ret_msg: string;
}

interface Ability {
    Description: AbilityDescription1;
    Id: number;
    Summary: string;
    URL: string;
}

interface AbilityDescription1 {
    itemDescription: ItemDescription;
}

interface ItemDescription {
    cooldown: string;
    cost: string;
    description: string;
    menuitems: Item[];
    rankitems: Item[];
}

interface Item {
    description: string;
    value: string;
}