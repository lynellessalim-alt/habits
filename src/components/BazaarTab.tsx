/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gem, Sparkles, ShoppingBag, Check, ShieldCheck, HelpCircle, Sparkle, Lock } from 'lucide-react';
import { BazaarItem } from '../types';
import { BAZAAR_ITEMS_DATA } from '../data/bazaarItems';
import * as Illustration from './illustrations';
import { playSylvanSFX } from '../utils/sylvanAudio';

const doubleXpPotionImg = '/src/assets/images/double_xp_potion_1779433848394.png';
const streakShieldImg = '/src/assets/images/streak_shield_1779434141269.png';
const motivationFairyImg = '/src/assets/images/motivation_fairy_1779434365501.png';
const pastelButterflyWingsImg = '/src/assets/images/pastel_butterfly_wings_1779434472650.png';
const goldenCrystalCrownImg = '/src/assets/images/golden_crystal_crown_1779434568901.png';
const sakuraBlossomOutfitImg = '/src/assets/images/sakura_blossom_outfit_1779434680000_1779434699850.png';
const pinkStarWandImg = '/src/assets/images/pink_star_wand_1779434902336.png';
const crystalLuckElixirImg = '/src/assets/images/crystal_luck_elixir_1779435040688.png';
const starfallDiceImg = '/src/assets/images/starfall_dice_1779435175110.png';
const phoenixFeatherImg = '/src/assets/images/phoenix_feather_1779435322106.png';
const magicalFairyCompanionImg = '/src/assets/images/magical_fairy_companion_1779435808387.png';
const moonlightFairyWingsImg = '/src/assets/images/moonlight_fairy_wings_1779435941443.png';
const celestialPrincessGownImg = '/src/assets/images/celestial_princess_gown_1779436103660.png';
const rosePetalMagicImg = '/src/assets/images/rose_petal_magic_1779436230388.png';
const angelHaloEffectImg = '/src/assets/images/angel_halo_effect_1779436361889.png';
const goldenSunflowerHairpinImg = '/src/assets/images/golden_sunflower_hairpin_1779436481206.png';
const bloomBazaarHeaderImg = '/src/assets/images/bloom_bazaar_header_1779436629076.png';
const auroraEnergyElixirImg = '/src/assets/images/aurora_energy_elixir_1779440805230.png';
const guardianAngelCharmImg = '/src/assets/images/guardian_angel_charm_1779440903129.png';
const dreamCrystalPotionImg = '/src/assets/images/dream_crystal_potion_1779440995107.png';
const enchantedFocusCandleImg = '/src/assets/images/enchanted_focus_candle_1779441562837.png';

const LOCKED_ALCHEMY_ITEMS: BazaarItem[] = [
  {
    id: 'aurora_energy_elixir',
    title: 'Aurora Energy Elixir',
    description: 'Triples XP for 1 hour.',
    cost: 320,
    icon: 'aurora_energy_elixir',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  },
  {
    id: 'guardian_angel_charm',
    title: 'Guardian Angel Charm',
    description: 'Prevents all penalties for one day.',
    cost: 220,
    icon: 'guardian_angel_charm',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  },
  {
    id: 'dream_crystal_potion',
    title: 'Dream Crystal Potion',
    description: 'Unlocks hidden bonus quests.',
    cost: 270,
    icon: 'dream_crystal_potion',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  },
  {
    id: 'enchanted_focus_candle',
    title: 'Enchanted Focus Candle',
    description: 'Increases study streak rewards.',
    cost: 180,
    icon: 'enchanted_focus_candle',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  },
  {
    id: 'ascension_elixir',
    title: 'Ascension Elixir',
    description: 'Instantly gain one level (progress XP).',
    cost: 400,
    icon: 'ascension_elixir',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  },
  {
    id: 'celestial_hourglass',
    title: 'Celestial Hourglass',
    description: 'Instantly completes one skipped habit once per week.',
    cost: 280,
    icon: 'celestial_hourglass',
    bonusXP: 0,
    category: 'alchemy',
    locked: true
  }
];

const LOCKED_COSMETIC_ITEMS: BazaarItem[] = [
  {
    id: 'cosmetic_sunset_galaxy_cape',
    title: 'Sunset Galaxy Cape',
    description: 'Ethereal shoulder accessory showing a swirling dusk galaxy.',
    cost: 220,
    icon: 'sunset_galaxy_cape',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_fairy_bunny',
    title: 'Fairy Bunny Companion',
    description: 'Cute starry bunny that hops beside your elven boots.',
    cost: 160,
    icon: 'fairy_bunny',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_cloud_pup',
    title: 'Cloud Pup Companion',
    description: 'A fluffy sky-pup riding on a small pastel cloud.',
    cost: 160,
    icon: 'cloud_pup',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_golden_rose_staff',
    title: 'Golden Rose Staff',
    description: 'Staff adorned with blooming, solar-charged golden roses.',
    cost: 120,
    icon: 'golden_rose_staff',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_starry_dragon',
    title: 'Starry Dragon Companion',
    description: 'A legendary dragon companion made of stardust.',
    cost: 250,
    icon: 'starry_dragon',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_eternal_rose_gown',
    title: 'Eternal Rose Gown',
    description: 'A breathtaking gown embroidered with mystical, never-wilting scarlet rose petals.',
    cost: 200,
    icon: 'eternal_rose_gown',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_crystal_butterfly_clip',
    title: 'Crystal Butterfly Clip',
    description: 'A delicate hair clip that hums with elven energy.',
    cost: 90,
    icon: 'crystal_butterfly_clip',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_sunbeam_aura',
    title: 'Sunbeam Aura',
    description: 'Bask in a persistent aura of golden morning sunbeams.',
    cost: 85,
    icon: 'sunbeam_aura',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_aurora_phoenix_wings',
    title: 'Aurora Phoenix Wings',
    description: 'Fiery iridescent wings that cycle through shimmering auroral colors.',
    cost: 250,
    icon: 'aurora_phoenix_wings',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  },
  {
    id: 'cosmetic_flower_garland',
    title: 'Flower Garland',
    description: 'A lovely colorful head wreath woven from fresh valley wildflowers.',
    cost: 100,
    icon: 'flower_garland',
    bonusXP: 0,
    category: 'cosmetic',
    locked: true
  }
];

interface BazaarTabProps {
  crystals: number;
  purchasedRelics: string[];
  onPurchaseItem: (item: BazaarItem) => void;
}

export const BazaarTab: React.FC<BazaarTabProps> = ({
  crystals,
  purchasedRelics,
  onPurchaseItem
}) => {
  // Stats and state for floating decrement tracker
  const [prevCrystals, setPrevCrystals] = useState(crystals);
  const [deductions, setDeductions] = useState<{ id: number; amount: number }[]>([]);
  const nextDeductionId = useRef(0);
  const [showLockedAlchemy, setShowLockedAlchemy] = useState(false);
  const [showLockedCosmetic, setShowLockedCosmetic] = useState(false);

  // Trigger beautiful bell chime on shop open!
  useEffect(() => {
    playSylvanSFX("open_bazaar");
  }, []);

  useEffect(() => {
    if (crystals < prevCrystals) {
      const difference = prevCrystals - crystals;
      const newId = nextDeductionId.current++;
      setDeductions(prev => [...prev, { id: newId, amount: difference }]);
      setTimeout(() => {
        setDeductions(prev => prev.filter(d => d.id !== newId));
      }, 1500);
    }
    setPrevCrystals(crystals);
  }, [crystals, prevCrystals]);

  // Split store items by category
  const alchemyItems = BAZAAR_ITEMS_DATA.filter(item => item.category === 'alchemy');
  const cosmeticItems = BAZAAR_ITEMS_DATA.filter(item => item.category === 'cosmetic');

  const renderItemIllustration = (iconType: string) => {
    switch (iconType) {
      case 'double_xp_potion':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={doubleXpPotionImg} 
              alt="Double XP Potion" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'streak_shield':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={streakShieldImg} 
              alt="Streak Shield" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'motivation_fairy':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden animate-pulse">
            <img 
              src={motivationFairyImg} 
              alt="Daily Motivation Fairy" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'crystal_luck_elixir':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={crystalLuckElixirImg} 
              alt="Crystal Luck Elixir" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'phoenix_feather':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={phoenixFeatherImg} 
              alt="Phoenix Feather" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'starfall_dice':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={starfallDiceImg} 
              alt="Starfall Dice" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'pastel_butterfly_wings':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={pastelButterflyWingsImg} 
              alt="Pastel butterfly wings" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'golden_crystal_crown':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={goldenCrystalCrownImg} 
              alt="Golden Crystal Crown" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'magical_fairy_companion':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={magicalFairyCompanionImg} 
              alt="Magical Fairy Companion" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'sakura_blossom_outfit':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={sakuraBlossomOutfitImg} 
              alt="Sakura Blossom Outfit" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'pink_star_wand':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={pinkStarWandImg} 
              alt="Pink Star Wand" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'celestial_princess_gown':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={celestialPrincessGownImg} 
              alt="Celestial Princess Gown" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'angel_halo_effect':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={angelHaloEffectImg} 
              alt="Angel Halo Effect" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'rose_petal_magic_effect':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={rosePetalMagicImg} 
              alt="Rose Petal Magic Effect" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'moonlight_fairy_wings':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={moonlightFairyWingsImg} 
              alt="Moonlight Fairy Wings" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'golden_sunflower_hairpin':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={goldenSunflowerHairpinImg} 
              alt="Golden Sunflower Hairpin" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'aurora_energy_elixir':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={auroraEnergyElixirImg} 
              alt="Aurora Energy Elixir" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'guardian_angel_charm':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={guardianAngelCharmImg} 
              alt="Guardian Angel Charm" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'dream_crystal_potion':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={dreamCrystalPotionImg} 
              alt="Dream Crystal Potion" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'ascension_elixir':
        return <Illustration.PinkPotion size={80} />;
      case 'celestial_hourglass':
        return <Illustration.ShieldHeart size={80} />;
      case 'enchanted_focus_candle':
        return (
          <div className="w-20 h-20 select-none flex items-center justify-center rounded-2xl overflow-hidden">
            <img 
              src={enchantedFocusCandleImg} 
              alt="Enchanted Focus Candle" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      case 'golden_rose_staff':
      case 'cosmetic_golden_rose_staff':
      case 'sunbeam_aura':
      case 'cosmetic_sunbeam_aura':
        return <Illustration.WandStar size={80} />;
      case 'sunset_galaxy_cape':
      case 'cosmetic_sunset_galaxy_cape':
      case 'eternal_rose_gown':
      case 'cosmetic_eternal_rose_gown':
        return <Illustration.SakuraKimono size={80} />;
      case 'fairy_bunny':
      case 'cosmetic_fairy_bunny':
      case 'cloud_pup':
      case 'cosmetic_cloud_pup':
      case 'starry_dragon':
      case 'cosmetic_starry_dragon':
      case 'aurora_phoenix_wings':
      case 'cosmetic_aurora_phoenix_wings':
        return <Illustration.PastelButterfly size={80} />;
      case 'crystal_butterfly_clip':
      case 'cosmetic_crystal_butterfly_clip':
      case 'flower_garland':
      case 'cosmetic_flower_garland':
        return <Illustration.GoldCrown size={80} />;
      default:
        return <Illustration.ShieldHeart size={80} />;
    }
  };

  const renderCard = (item: BazaarItem, index: number) => {
    const isPurchased = purchasedRelics.includes(item.id);
    const canAfford = crystals >= item.cost;
    const isLocked = !!item.locked;
 
    return (
      <motion.div
        layout
        key={item.id}
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        className={`relative flex flex-col md:flex-row items-center p-3.5 rounded-2xl border transition-all duration-300 ${
          isLocked
            ? 'border-dashed border-gray-300 bg-gray-50/50 filter grayscale contrast-75 opacity-60'
            : isPurchased
              ? 'border-green-300 bg-gradient-to-r from-green-50/15 to-white shadow-sm'
              : !canAfford
                ? 'border-[#ebdccb] bg-[#fffbf7]/70 opacity-75'
                : 'border-outline-variant hover:border-primary shadow-sm hover:shadow-md bg-white'
        }`}
      >
        {/* Lock indicator or Greyed out desaturated overlay for unaffordable products */}
        {isLocked ? (
          <div className="absolute top-2.5 right-2.5 flex items-center bg-gray-200 border border-gray-350 text-gray-500 rounded-full py-0.5 px-2 text-[10px] font-bold z-10 gap-1 select-none">
            <Lock className="w-2.5 h-2.5" />
            <span>Locked</span>
          </div>
        ) : (
          !isPurchased && !canAfford && (
            <div className="absolute top-2.5 right-2.5 flex items-center bg-gray-150 border border-gray-250 text-gray-600 rounded-full py-0.5 px-2 text-[10px] font-bold z-10">
              <span>Unavailable</span>
            </div>
          )
        )}
 
        {/* Left Column: Customized SVG drawing */}
        <div className={`shrink-0 flex items-center justify-center mb-3 md:mb-0 md:mr-4 ${isLocked ? 'filter grayscale opacity-60' : (!isPurchased && !canAfford && item.id !== 'double_xp_potion' && item.id !== 'streak_shield' && item.id !== 'motivation_fairy' && item.id !== 'cosmetic_butterfly_wings' && item.id !== 'cosmetic_crystal_crown' && item.id !== 'cosmetic_sakura_outfit' && item.id !== 'cosmetic_pink_star_wand' && item.id !== 'crystal_luck_elixir' && item.id !== 'starfall_dice' && item.id !== 'phoenix_feather' && item.id !== 'cosmetic_fairy_companion' && item.id !== 'cosmetic_moonlight_wings' && item.id !== 'cosmetic_princess_gown' && item.id !== 'cosmetic_rose_petal_magic' && item.id !== 'cosmetic_angel_halo' && item.id !== 'cosmetic_sunflower_hairpin') ? 'filter grayscale contrast-75 brightness-95' : ''}`}>
          {renderItemIllustration(item.icon)}
        </div>
 
        {/* Center Column: Descriptions */}
        <div className="flex-1 text-center md:text-left min-w-0 pr-1 select-none">
          <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-2">
            <h5 className={`font-black text-sm md:text-base ${isLocked ? 'text-gray-500' : isPurchased ? 'text-green-900' : !canAfford ? 'text-[#837060]' : 'text-on-surface'}`}>{item.title}</h5>
          </div>
          
          <p className="text-xs text-[#74584d] font-semibold mt-1 opacity-90">
            {item.description}
          </p>
        </div>
 
        {/* Right Column: Interaction Action Buttons */}
        <div className="shrink-0 mt-3 md:mt-0 w-full md:w-auto">
          {isLocked ? (
            <div className="w-full md:w-auto px-4 py-2 rounded-xl bg-gray-200 border border-gray-300 text-gray-400 font-extrabold text-xs flex items-center justify-center space-x-1 shadow-none select-none">
              <Lock className="w-3.5 h-3.5" />
              <span>Unlocks at higher level</span>
            </div>
          ) : isPurchased ? (
            <div className="w-full md:w-auto px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 font-extrabold text-xs flex items-center justify-center space-x-1 shadow-sm select-none">
              <Check className="w-3.5 h-3.5" />
              <span>Purchased</span>
            </div>
          ) : (
            <motion.button
              whileTap={canAfford ? { scale: 0.94 } : {}}
              onClick={() => onPurchaseItem(item)}
              disabled={!canAfford}
              className={`w-full md:w-auto px-4 py-2 rounded-xl font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all cursor-pointer ${
                canAfford
                  ? 'bg-[#854f54] hover:bg-[#854f54]/95 text-white'
                  : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
              id={`buy-item-${item.id}`}
            >
              <Gem className={`w-3.5 h-3.5 fill-current ${canAfford ? 'text-indigo-300' : 'text-gray-300'}`} />
              <span>{item.cost} Crystals</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pb-24">
      {/* 1. Bloom Bazaar Store Illustration banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden border border-amber-900/15 shadow-md group bg-[#110c0a]"
      >
        <img 
          src={bloomBazaarHeaderImg} 
          alt="Bloom Bazaar" 
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out brightness-[0.95]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle magical atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/20 via-transparent to-transparent pointer-events-none" />
        
        {/* Banner text label with high contrast and text-shadow */}
        <div className="absolute bottom-4 left-5 right-5 select-none flex flex-col pointer-events-none">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#fed7aa] select-none filter drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] animate-pulse">
            Mystical Shop
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight">
            Bloom Bazaar
          </h1>
        </div>
      </motion.div>

      {/* 2. Balance widget with Deductions Animation overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl border border-outline-variant p-4 shadow-sm mb-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-2.5 select-none">
          <div className="w-10 h-10 rounded-full bg-[#fcf5f3] flex items-center justify-center text-primary border border-[#fbdacf]/50">
            <ShoppingBag className="w-5.5 h-5.5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-on-surface">Available Wallet</h4>
            <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">Use crystals to acquire helpful alchemy & cosmetics!</p>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center space-x-1.5 font-black text-indigo-600 bg-indigo-50 border border-indigo-200 py-1.5 px-3 rounded-full shadow-inner select-none">
            <Gem className="w-4 h-4 fill-current text-indigo-500 animate-pulse" />
            <span>{crystals} Crystals</span>
          </div>

          {/* Floaty Deduction Multipliers */}
          <AnimatePresence>
            {deductions.map(dec => (
              <motion.div
                key={dec.id}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -45, scale: 1.15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute right-2 top-0 pointer-events-none text-rose-600 font-extrabold text-xs z-55 flex items-center bg-rose-50 border border-rose-200 rounded-full py-0.5 px-2 shadow-md"
              >
                -{dec.amount} 💎
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 3. ALCHEMY & BUFFS SHOP SECTION */}
      <div className="mb-8">
        <h4 className="font-black text-sm text-on-surface mb-3 flex items-center space-x-2 border-b border-[#ebccb7]/20 pb-1.5 uppercase tracking-wider text-[#854f54] select-none">
          <Sparkle className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: '6s' }} />
          <span>Alchemy & Buffs</span>
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {alchemyItems.map((item, index) => renderCard(item, index))}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => setShowLockedAlchemy(!showLockedAlchemy)}
            className="px-5 py-2.5 rounded-2xl bg-[#854f54]/10 hover:bg-[#854f54]/20 text-[#854f54] border border-[#854f54]/20 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02] shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlocks at higher levels</span>
          </button>
          <AnimatePresence>
            {showLockedAlchemy && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-center text-xs text-amber-800 bg-amber-50/60 border border-amber-200/50 rounded-xl p-3 max-w-sm"
              >
                ✨ Reach Level 15 to unlock legendary potions and mystical elixirs in the next tier! Keep completing your daily quests.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
 
      {/* 4. AVATAR SHOP COSMETICS SECTION */}
      <div>
        <h4 className="font-black text-sm text-on-surface mb-3 flex items-center space-x-2 border-b border-[#ebccb7]/20 pb-1.5 uppercase tracking-wider text-[#854f54] select-none">
          <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          <span>Avatar Shop Cosmetics</span>
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {cosmeticItems.map((item, index) => renderCard(item, index))}
        </div>
        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={() => setShowLockedCosmetic(!showLockedCosmetic)}
            className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer hover:scale-[1.02] shadow-sm"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Unlocks at higher levels</span>
          </button>
          <AnimatePresence>
            {showLockedCosmetic && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-center text-xs text-purple-800 bg-purple-50/50 border border-purple-200/50 rounded-xl p-3 max-w-sm"
              >
                ✨ Rare mystical cloaks, celestial gowns, and loyal pet companions await you at level 20+!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
