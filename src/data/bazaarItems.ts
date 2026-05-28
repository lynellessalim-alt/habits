import { BazaarItem } from '../types';

export const BAZAAR_ITEMS_DATA: BazaarItem[] = [
  // SECTION 1: ALCHEMY & BUFFS
  {
    id: 'double_xp_potion',
    title: 'Double XP Potion',
    description: 'Doubles all XP earned for the next 24 hours.',
    cost: 120,
    icon: 'double_xp_potion',
    bonusXP: 100,
    category: 'alchemy'
  },
  {
    id: 'streak_shield',
    title: 'Streak Shield',
    description: 'Protects your streak if you miss 1 habit.',
    cost: 150,
    icon: 'streak_shield',
    bonusXP: 125,
    category: 'alchemy'
  },
  {
    id: 'motivation_fairy',
    title: 'Daily Motivation Fairy',
    description: 'Small fairy companion that gives encouraging quotes and bonus XP chances.',
    cost: 250,
    icon: 'motivation_fairy',
    bonusXP: 220,
    category: 'alchemy'
  },
  {
    id: 'crystal_luck_elixir',
    title: 'Crystal Luck Elixir',
    description: 'Earn 5 bonus crystals for each quest completed for 3 days.',
    cost: 180,
    icon: 'crystal_luck_elixir',
    bonusXP: 150,
    category: 'alchemy'
  },
  {
    id: 'phoenix_feather',
    title: 'Phoenix Feather',
    description: 'Revives a failed "Perfect Day" and restores all missed rewards.',
    cost: 230,
    icon: 'phoenix_feather',
    bonusXP: 200,
    category: 'alchemy'
  },
  {
    id: 'starfall_dice',
    title: 'Starfall Dice',
    description: 'Randomly grants surprise rewards like bonus XP, crystals, or temporary buffs after completing habits.',
    cost: 200,
    icon: 'starfall_dice',
    bonusXP: 180,
    category: 'alchemy'
  },

  // SECTION 2: AVATAR SHOP COSMETICS
  {
    id: 'cosmetic_butterfly_wings',
    title: 'Pastel butterfly wings',
    description: 'Beautiful wings radiating with pastel dust and magical light.',
    cost: 150,
    icon: 'pastel_butterfly_wings',
    bonusXP: 150,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_crystal_crown',
    title: 'Golden crystal crown',
    description: 'Stature of royalty, forged from pure gold and sparkling gems.',
    cost: 180,
    icon: 'golden_crystal_crown',
    bonusXP: 180,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_fairy_companion',
    title: 'Magical fairy pet companion',
    description: 'A pocket-sized companion who hovers near your shoulder to guide you.',
    cost: 250,
    icon: 'magical_fairy_companion',
    bonusXP: 250,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_sakura_outfit',
    title: 'Sakura blossom outfit',
    description: 'Exquisite silk robes patterned with falling pink cherry petals.',
    cost: 200,
    icon: 'sakura_blossom_outfit',
    bonusXP: 200,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_pink_star_wand',
    title: 'Pink Star Wand',
    description: 'Gilded sceptre tipped with an eternal glowing star.',
    cost: 120,
    icon: 'pink_star_wand',
    bonusXP: 120,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_princess_gown',
    title: 'Celestial princess gown',
    description: 'Magnificent indigo gown spun from starlight and celestial threads.',
    cost: 300,
    icon: 'celestial_princess_gown',
    bonusXP: 300,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_angel_halo',
    title: 'Angel halo effect',
    description: 'A radiant loop of heavenly golden light hovering above your head.',
    cost: 140,
    icon: 'angel_halo_effect',
    bonusXP: 140,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_rose_petal_magic',
    title: 'Rose petal magic effect',
    description: 'Passive swirling aura of freshly falling rose petals.',
    cost: 95,
    icon: 'rose_petal_magic_effect',
    bonusXP: 95,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_moonlight_wings',
    title: 'Moonlight fairy wings',
    description: 'Shimmering translucent wings reflecting the pale evening glow.',
    cost: 200,
    icon: 'moonlight_fairy_wings',
    bonusXP: 200,
    category: 'cosmetic'
  },
  {
    id: 'cosmetic_sunflower_hairpin',
    title: 'Golden sunflower hairpin',
    description: 'Bright floral clip that catches solar rays to light your path.',
    cost: 70,
    icon: 'golden_sunflower_hairpin',
    bonusXP: 70,
    category: 'cosmetic'
  }
];
