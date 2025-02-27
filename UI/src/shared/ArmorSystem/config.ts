import { ItemHashes } from "../inventory/ItemHashes"

export type Armor = {
    physical: number,
    magic: number
}

export const ArmorConfig: Record<string, Armor> = {
    [ItemHashes.LEATHER_HELMET]: {
        physical: 12,
        magic: 0
    },
    [ItemHashes.LEATHER_ARMOR]: {
        physical: 26,
        magic: 0
    },
    [ItemHashes.LEATHER_BRACERS]: {
        physical: 7,
        magic: 0
    },
    [ItemHashes.LEATHER_BOOTS]: {
        physical: 7,
        magic: 0
    },
    [ItemHashes.HIDE_HELMET]: {
        physical: 10,
        magic: 0
    },
    [ItemHashes.HIDE_ARMOR]: {
        physical: 20,
        magic: 0
    },
    [ItemHashes.HIDE_BRACERS]: {
        physical: 5,
        magic: 0
    },
    [ItemHashes.HIDE_BOOTS]: {
        physical: 5,
        magic: 0
    },
    [ItemHashes.HIDE_SHIELD]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.ELVEN_HELMET]: {
        physical: 13,
        magic: 0
    },
    [ItemHashes.ELVEN_ARMOR]: {
        physical: 29,
        magic: 0
    },
    [ItemHashes.ELVEN_BRACERS]: {
        physical: 8,
        magic: 0
    },
    [ItemHashes.ELVEN_BOOTS]: {
        physical: 8,
        magic: 0
    },
    [ItemHashes.ELVEN_SHIELD]: {
        physical: 21,
        magic: 0
    },
    [ItemHashes.SCALED_HELMET]: {
        physical: 14,
        magic: 0
    },
    [ItemHashes.SCALED_ARMOR]: {
        physical: 22,
        magic: 0
    },
    [ItemHashes.SCALED_BRACERS]: {
        physical: 9,
        magic: 0
    },
    [ItemHashes.SCALED_BOOTS]: {
        physical: 9,
        magic: 0
    },
    [ItemHashes.GLASS_HELMET]: {
        physical: 16,
        magic: 0
    },
    [ItemHashes.GLASS_ARMOR]: {
        physical: 38,
        magic: 0
    },
    [ItemHashes.GLASS_BRACERS]: {
        physical: 16,
        magic: 0
    },
    [ItemHashes.GLASS_BOOTS]: {
        physical: 16,
        magic: 0
    },
    [ItemHashes.GLASS_SHIELD]: {
        physical: 27,
        magic: 0
    },
    [ItemHashes.DRAGONSCALE_HELMET]: {
        physical: 17,
        magic: 0
    },
    [ItemHashes.DRAGONSCALE_ARMOR]: {
        physical: 41,
        magic: 0
    },
    [ItemHashes.DRAGONSCALE_BRACERS]: {
        physical: 12,
        magic: 0
    },
    [ItemHashes.DRAGONSCALE_BOOTS]: {
        physical: 12,
        magic: 0
    },
    [ItemHashes.DRAGONSCALE_SHIELD]: {
        physical: 29,
        magic: 0
    },
    [ItemHashes.IRON_HELMET]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.IRON_ARMOR]: {
        physical: 25,
        magic: 0
    },
    [ItemHashes.IRON_BRACERS]: {
        physical: 10,
        magic: 0
    },
    [ItemHashes.IRON_BOOTS]: {
        physical: 10,
        magic: 0
    },
    [ItemHashes.IRON_SHIELD]: {
        physical: 20,
        magic: 0
    },
    [ItemHashes.STEEL_HELMET]: {
        physical: 17,
        magic: 0
    },
    [ItemHashes.STEEL_ARMOR]: {
        physical: 31,
        magic: 0
    },
    [ItemHashes.STEEL_BRACERS]: {
        physical: 12,
        magic: 0
    },
    [ItemHashes.STEEL_BOOTS]: {
        physical: 12,
        magic: 0
    },
    [ItemHashes.STEEL_SHIELD]: {
        physical: 24,
        magic: 0
    },
    [ItemHashes.ORCISH_HELMET]: {
        physical: 20,
        magic: 0
    },
    [ItemHashes.ORCISH_ARMOR]: {
        physical: 40,
        magic: 0
    },
    [ItemHashes.ORCISH_BRACERS]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.ORCISH_BOOTS]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.ORCISH_SHIELD]: {
        physical: 30,
        magic: 0
    },
    [ItemHashes.DWARVEN_HELMET]: {
        physical: 18,
        magic: 0
    },
    [ItemHashes.DWARVEN_ARMOR]: {
        physical: 34,
        magic: 0
    },
    [ItemHashes.DWARVEN_BRACERS]: {
        physical: 13,
        magic: 0
    },
    [ItemHashes.DWARVEN_BOOTS]: {
        physical: 13,
        magic: 0
    },
    [ItemHashes.DWARVEN_SHIELD]: {
        physical: 26,
        magic: 0
    },
    [ItemHashes.EBONY_HELMET]: {
        physical: 21,
        magic: 0
    },
    [ItemHashes.EBONY_ARMOR]: {
        physical: 43,
        magic: 0
    },
    [ItemHashes.EBONY_BRACERS]: {
        physical: 16,
        magic: 0
    },
    [ItemHashes.EBONY_BOOTS]: {
        physical: 16,
        magic: 0
    },
    [ItemHashes.EBONY_SHIELD]: {
        physical: 32,
        magic: 0
    },
    [ItemHashes.DAEDRIC_HELMET]: {
        physical: 23,
        magic: 0
    },
    [ItemHashes.DAEDRIC_ARMOR]: {
        physical: 49,
        magic: 0
    },
    [ItemHashes.DAEDRIC_BRACERS]: {
        physical: 18,
        magic: 0
    },
    [ItemHashes.DAEDRIC_BOOTS]: {
        physical: 18,
        magic: 0
    },
    [ItemHashes.DAEDRIC_SHIELD]: {
        physical: 36,
        magic: 0
    },
    [ItemHashes.DRAGONPLATE_HELMET]: {
        physical: 22,
        magic: 0
    },
    [ItemHashes.DRAGONPLATE_ARMOR]: {
        physical: 46,
        magic: 0
    },
    [ItemHashes.DRAGONPLATE_BRACERS]: {
        physical: 17,
        magic: 0
    },
    [ItemHashes.DRAGONPLATE_BOOTS]: {
        physical: 17,
        magic: 0
    },
    [ItemHashes.DRAGONPLATE_SHIELD]: {
        physical: 34,
        magic: 0
    },
    [ItemHashes.NORDIC_CARVED_HELMET]: {
        physical: 2,
        magic: 0
    },
    [ItemHashes.NORDIC_CARVED_ARMOR]: {
        physical: 43,
        magic: 0
    },
    [ItemHashes.NORDIC_CARVED_BRACERS]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.NORDIC_CARVED_BOOTS]: {
        physical: 15,
        magic: 0
    },
    [ItemHashes.NORDIC_CARVED_SHIELD]: {
        physical: 27,
        magic: 0
    },
}