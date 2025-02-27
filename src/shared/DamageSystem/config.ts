import { ItemHashes } from "../inventory/ItemHashes"

export type DamageOnWeapon = {
    standard: number,
    critical: number,
    power: number,
    bash: number,
    sneak: number,
    stamin: number
}

export const DamageConfig: Record<string, DamageOnWeapon> = {
    [ItemHashes.HANDS]: {
        standard: 1,
        power: 2,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 2
    },
    [ItemHashes.IRON_SWORD]: {
        standard: 7,
        power: 14,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.STEEL_SWORD]: {
        standard: 8,
        power: 16,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.ORCISH_SWORD]: {
        standard: 9,
        power: 18,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.DWARVEN_SWORD]: {
        standard: 10,
        power: 20,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.ELVEN_SWORD]: {
        standard: 11,
        power: 22,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.GLASS_SWORD]: {
        standard: 12,
        power: 24,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.EBONY_SWORD]: {
        standard: 13,
        power: 26,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.DAEDRIC_SWORD]: {
        standard: 14,
        power: 28,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.DRAGONBONE_SWORD]: {
        standard: 15,
        power: 30,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 7
    },
    [ItemHashes.IRON_DAGGER]: {
        standard: 4,
        power: 8,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.STEEL_DAGGER]: {
        standard: 5,
        power: 10,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.ORCISH_DAGGER]: {
        standard: 6,
        power: 12,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.DWARVEN_DAGGER]: {
        standard: 7,
        power: 14,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.ELVEN_DAGGER]: {
        standard: 8,
        power: 16,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.GLASS_DAGGER]: {
        standard: 9,
        power: 18,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.EBONY_DAGGER]: {
        standard: 10,
        power: 20,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.DAEDRIC_DAGGER]: {
        standard: 11,
        power: 22,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.DRAGONBONE_DAGGER]: {
        standard: 12,
        power: 24,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.IRON_MACE]: {
        standard: 9,
        power: 18,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.STEEL_MACE]: {
        standard: 10,
        power: 20,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.ORCISH_MACE]: {
        standard: 11,
        power: 22,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.DWARVEN_MACE]: {
        standard: 12,
        power: 24,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.ELVEN_MACE]: {
        standard: 13,
        power: 26,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.GLASS_MACE]: {
        standard: 14,
        power: 28,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.EBONY_MACE]: {
        standard: 15,
        power: 30,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.DAEDRIC_MACE]: {
        standard: 16,
        power: 32,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.DRAGONBONE_MACE]: {
        standard: 17,
        power: 34,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 9
    },
    [ItemHashes.IRON_WAR_AXE]: {
        standard: 8,
        power: 16,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.STEEL_WAR_AXE]: {
        standard: 9,
        power: 18,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.ORCISH_WAR_AXE]: {
        standard: 10,
        power: 20,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.DWARVEN_WAR_AXE]: {
        standard: 11,
        power: 22,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.ELVEN_WAR_AXE]: {
        standard: 12,
        power: 24,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.GLASS_WAR_AXE]: {
        standard: 13,
        power: 26,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.EBONY_WAR_AXE]: {
        standard: 14,
        power: 28,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.DAEDRIC_WAR_AXE]: {
        standard: 15,
        power: 30,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.DRAGONBONE_WAR_AXE]: {
        standard: 16,
        power: 32,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 8
    },
    [ItemHashes.IRON_GREATSWORD]: {
        standard: 15,
        power: 30,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.STEEL_GREATSWORD]: {
        standard: 17,
        power: 34,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.ORCISH_GREATSWORD]: {
        standard: 18,
        power: 36,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.DWARVEN_GREATSWORD]: {
        standard: 19,
        power: 38,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.ELVEN_GREATSWORD]: {
        standard: 20,
        power: 40,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.GLASS_GREATSWORD]: {
        standard: 21,
        power: 42,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.EBONY_GREATSWORD]: {
        standard: 22,
        power: 44,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.DAEDRIC_GREATSWORD]: {
        standard: 24,
        power: 48,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.DRAGONBONE_GREATSWORD]: {
        standard: 25,
        power: 50,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 18
    },
    [ItemHashes.IRON_WARHAMMER]: {
        standard: 18,
        power: 36,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.STEEL_WARHAMMER]: {
        standard: 20,
        power: 40,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.ORCISH_WARHAMMER]: {
        standard: 21,
        power: 42,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.DWARVEN_WARHAMMER]: {
        standard: 22,
        power: 44,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.ELVEN_WARHAMMER]: {
        standard: 23,
        power: 46,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.GLASS_WARHAMMER]: {
        standard: 24,
        power: 48,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.EBONY_WARHAMMER]: {
        standard: 25,
        power: 50,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.DAEDRIC_WARHAMMER]: {
        standard: 27,
        power: 54,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.DRAGONBONE_WARHAMMER]: {
        standard: 28,
        power: 56,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 20
    },
    [ItemHashes.IRON_BATTLEAXE]: {
        standard: 16,
        power: 32,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.STEEL_BATTLEAXE]: {
        standard: 18,
        power: 36,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.ORCISH_BATTLEAXE]: {
        standard: 19,
        power: 38,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.DWARVEN_BATTLEAXE]: {
        standard: 20,
        power: 40,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.ELVEN_BATTLEAXE]: {
        standard: 21,
        power: 42,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.GLASS_BATTLEAXE]: {
        standard: 22,
        power: 44,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.EBONY_BATTLEAXE]: {
        standard: 23,
        power: 46,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.DAEDRIC_BATTLEAXE]: {
        standard: 25,
        power: 50,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.DRAGONBONE_BATTLEAXE]: {
        standard: 26,
        power: 52,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 19
    },
    [ItemHashes.LONG_BOW]: {
        standard: 12,
        power: 24,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.HUNTING_BOW]: {
        standard: 14,
        power: 28,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 5
    },
    [ItemHashes.ORCISH_BOW]: {
        standard: 20,
        power: 40,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 4
    },
    [ItemHashes.DWARVEN_BOW]: {
        standard: 24,
        power: 48,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 4
    },
    [ItemHashes.ELVEN_BOW]: {
        standard: 26,
        power: 52,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 3
    },
    [ItemHashes.GLASS_BOW]: {
        standard: 30,
        power: 60,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 3
    },
    [ItemHashes.EBONY_BOW]: {
        standard: 34,
        power: 68,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 3
    },
    [ItemHashes.DAEDRIC_BOW]: {
        standard: 38,
        power: 76,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 3
    },
    [ItemHashes.DRAGONBONE_BOW]: {
        standard: 40,
        power: 80,
        critical: 0,
        bash: 0,
        sneak: 0,
        stamin: 3
    },
}