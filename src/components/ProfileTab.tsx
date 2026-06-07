/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  User,
  Gem,
  Check,
  X,
  Edit2,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Star,
  Activity,
} from "lucide-react";
import { UserProgress, BazaarItem } from "../types";
import { AuraBelleAvatar } from "./illustrations";
import { BAZAAR_ITEMS_DATA } from "../data/bazaarItems";

interface ProfileTabProps {
  progress: UserProgress;
  purchasedRelics: string[];
  equippedCosmetics: string[];
  onToggleEquipCosmetic: (itemId: string) => void;
  onUpdateDisplayName: (newName: string) => Promise<void>;
  onGoToBazaar: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All Items", icon: "✨" },
  { id: "head", label: "Headwear", icon: "👑" },
  { id: "body", label: "Outfits", icon: "👘" },
  { id: "wings", label: "Wings", icon: "🦋" },
  { id: "companion", label: "Companions", icon: "🧚‍♀️" },
  { id: "hand", label: "Held Items", icon: "🪄" },
  { id: "effect", label: "Auras", icon: "🌹" },
];

export const ProfileTab: React.FC<ProfileTabProps> = ({
  progress,
  purchasedRelics,
  equippedCosmetics,
  onToggleEquipCosmetic,
  onUpdateDisplayName,
  onGoToBazaar,
}) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.displayName);
  const [isSavingName, setIsSavingName] = useState(false);

  // Filter bazaar items to only cosmetics purchased
  const ownedCosmetics = BAZAAR_ITEMS_DATA.filter(
    (item) => item.category === "cosmetic" && purchasedRelics.includes(item.id)
  );

  const getCategoryForItem = (item: BazaarItem): string => {
    switch (item.id) {
      case "cosmetic_crystal_crown":
      case "cosmetic_angel_halo":
      case "cosmetic_sunflower_hairpin":
        return "head";
      case "cosmetic_sakura_outfit":
      case "cosmetic_princess_gown":
        return "body";
      case "cosmetic_butterfly_wings":
      case "cosmetic_moonlight_wings":
        return "wings";
      case "cosmetic_fairy_companion":
        return "companion";
      case "cosmetic_pink_star_wand":
        return "hand";
      case "cosmetic_rose_petal_magic":
        return "effect";
      default:
        return "all";
    }
  };

  const getCategoryIcon = (category: string) => {
    const found = CATEGORIES.find((c) => c.id === category);
    return found ? found.icon : "🎒";
  };

  const getCategoryLabel = (category: string) => {
    const found = CATEGORIES.find((c) => c.id === category);
    return found ? found.label : "Cosmetics";
  };

  const filteredCosmetics = ownedCosmetics.filter((item) => {
    if (activeCategory === "all") return true;
    return getCategoryForItem(item) === activeCategory;
  });

  const handleNameSave = async () => {
    if (!tempName.trim()) return;
    setIsSavingName(true);
    try {
      await onUpdateDisplayName(tempName.trim());
      setIsEditingName(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingName(false);
    }
  };

  return (
    <div className="pb-24 space-y-6 max-w-lg mx-auto md:max-w-4xl" id="avatar-customizer-root">
      {/* HEADER CARD: Interactive Live Dressing Room Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left pane: Character Stage in md screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-5 bg-gradient-to-b from-[#fffaf8] to-[#fff3f0]/40 rounded-3xl border border-[#ebd5d7] p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden h-[330px]"
        >
          {/* Sparkly grid backing */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ebd5d7_1px,transparent_1px),linear-gradient(to_bottom,#ebd5d7_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.15]" />
          <div className="absolute top-4 left-4 inline-flex items-center px-2 py-1 rounded-full text-[9px] font-black tracking-widest uppercase bg-rose-50 border border-rose-100 text-rose-500 z-10 animate-pulse">
            🪐 DRESSING ROOM STAGE
          </div>

          {/* Interactive display container */}
          <div className="relative flex items-center justify-center mt-4">
            {/* Soft backdrop radial light bloom */}
            <div className="absolute inset-[-40px] rounded-full bg-gradient-to-tr from-pink-300/30 via-orange-200/20 to-indigo-300/30 blur-2xl opacity-80" />
            <AuraBelleAvatar
              size={180}
              showBorder={true}
              level={progress.level}
              xp={progress.xp}
              equippedCosmetics={equippedCosmetics}
            />
          </div>

          <div className="mt-8 text-center z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 border border-indigo-100 text-indigo-600 uppercase tracking-wider">
              Level {progress.level} Adventurer
            </span>
            <div className="text-[10px] font-extrabold text-[#74584d]/60 mt-1 uppercase tracking-wider">
              {equippedCosmetics.length} active cosmetics equipped
            </div>
          </div>
        </motion.div>

        {/* Right pane: User Stats Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-7 bg-white rounded-3xl border border-outline-variant p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#8a766c] flex items-center">
              <User className="w-3.5 h-3.5 mr-1" />
              Adventurer Record
            </h4>

            {/* Editable display name line */}
            <div className="space-y-1">
              {isEditingName ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="flex-1 bg-surface-variant border border-outline rounded-xl px-3 py-1.5 text-sm font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50"
                    maxLength={20}
                    autoFocus
                  />
                  <button
                    onClick={handleNameSave}
                    disabled={isSavingName}
                    className="p-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-colors cursor-pointer"
                    title="Save Name"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setTempName(progress.displayName);
                      setIsEditingName(false);
                    }}
                    className="p-1.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors cursor-pointer"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-start md:items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#4c3b31] text-2xl tracking-tight leading-none">
                      {progress.displayName}
                    </h3>
                    <p className="text-xs font-semibold text-on-surface-variant mt-1.5">
                      {progress.email || "Offline Local Guest Adventurer"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-primary hover:text-primary-dark p-1.5 rounded-full hover:bg-rose-50 transition-all cursor-pointer inline-flex items-center"
                    title="Edit Name"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Game Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 text-xl font-bold">
                  🔮
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-indigo-500 tracking-wide">
                    Crystals Balance
                  </div>
                  <div className="text-sm font-black text-indigo-900">
                    {progress.crystals} Crystals
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-600 text-xl font-bold">
                  🔥
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-500 tracking-wide">
                    Active Streak & Multiplier
                  </div>
                  <div className="text-sm font-black text-amber-900">
                    {progress.currentStreak} Days ({progress.currentStreak <= 0 ? "1.0" : progress.currentStreak <= 2 ? "1.2" : "1.5"}x Boost 🪙)
                  </div>
                </div>
              </div>

              {progress.perfectDays > 0 && (
                <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100 flex items-center space-x-2.5 col-span-2">
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-600 text-xl font-bold animate-pulse">
                    🏆
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-rose-500 tracking-wide">
                      Milestone Earned
                    </div>
                    <div className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                      ⭐ Perfect Day Badge ({progress.perfectDays}x)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-outline-variant/60 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#74584d] bg-[#f8efec] px-3 py-1.5 rounded-xl border border-[#ebd5d7]/50 block shadow-inner">
              👑 Achievement Score: <span className="text-rose-500 font-extrabold">{progress.xp} XP</span>
            </span>
            <span className="text-[10px] font-extrabold text-[#74584d]/60">
              Account created: {new Date(progress.createdAt).toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      </div>

      {/* DRESSING ROOM CONTROLLER: Tab Category Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-black text-[#514344] uppercase tracking-wider flex items-center">
            <Sparkles className="w-4 h-4 text-rose-400 mr-1.5 animate-spin [animation-duration:8s]" />
            Your Wardrobe & Inventory
          </h4>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
            Unlocked: {ownedCosmetics.length} Items
          </span>
        </div>

        {/* Scrollable category pills */}
        <div className="flex space-x-1.5 overflow-x-auto pb-2 pr-1 scrollbar-none select-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center space-x-1 whitespace-nowrap cursor-pointer transition-all ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-on-surface-variant border-outline-variant hover:bg-[#fff9f8] hover:text-rose-500"
                }`}
                title={`Filter by ${cat.label}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Cosmetics Grid */}
        <AnimatePresence mode="popLayout">
          {ownedCosmetics.length === 0 ? (
            /* EMPTY WARDROBE CHALLENGE SCREEN */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#fffdfd] rounded-2xl border border-dashed border-[#ebe0de] p-12 text-center"
            >
              <div className="text-4xl animate-bounce">👘</div>
              <h5 className="font-extrabold text-sm text-[#4c3b31] mt-3">All Dressing Locks Active</h5>
              <p className="text-xs text-[#74584d]/70 max-w-sm mx-auto mt-1 leading-relaxed leading-normal">
                You haven't bought any customizable items or cosmetics from the Bloom Bazaar yet. Let's head over and power up your style!
              </p>
              <button
                onClick={onGoToBazaar}
                className="mt-4 inline-flex items-center px-4 py-2 text-xs font-black uppercase text-white bg-primary rounded-xl hover:bg-primary-dark shadow-sm cursor-pointer transition-all hover:scale-102"
              >
                Assemble Cosmetics
                <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </motion.div>
          ) : filteredCosmetics.length === 0 ? (
            /* EMPTY CATEGORY */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#fffdfd] rounded-2xl border border-[#ebe0de] p-12 text-center text-xs text-[#74584d]/60 font-medium"
            >
              No equipped or owned items in the "{getCategoryLabel(activeCategory)}" category.
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filteredCosmetics.map((item) => {
                const isEquipped = equippedCosmetics.includes(item.id);
                const category = getCategoryForItem(item);
                const isWardrobeSelection = true;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    whileHover={{ y: -2 }}
                    className={`bg-white rounded-2xl border p-3 flex flex-col justify-between transition-all relative overflow-hidden ${
                      isEquipped
                        ? "border-[#f75c7e] bg-gradient-to-br from-[#fffbfa] to-white ring-1 ring-[#f75c7e]"
                        : "border-outline-variant hover:border-[#f199a4]/60"
                    }`}
                  >
                    {/* Item category icon overlay */}
                    <span 
                      className="absolute top-2.5 right-2.5 text-xs bg-gray-50 border border-gray-100 px-1 rounded-md py-[1px]"
                      title={getCategoryLabel(category)}
                    >
                      {getCategoryIcon(category)}
                    </span>

                    <div className="flex items-start space-x-3">
                      {/* Cosmetic Asset Drawing Box */}
                      <div className="w-14 h-14 rounded-xl bg-stone-50 border border-surface-variant flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                        {/* Rendering item illustrations exactly */}
                        {item.icon === "pastel_butterfly_wings" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_m8rhfd"
                            alt="Pastel butterfly wings"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "golden_crystal_crown" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_aokoxq"
                            alt="Golden crystal crown"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "magical_fairy_companion" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_vuo5zk"
                            alt="Magical fairy pet companion"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "sakura_blossom_outfit" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_aweuab"
                            alt="Sakura blossom outfit"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "pink_star_wand" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_pvzpjj"
                            alt="Pink Star Wand"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "celestial_princess_gown" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_wl2rx5"
                            alt="Celestial princess gown"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "angel_halo_effect" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_zztpgn"
                            alt="Angel halo effect"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "rose_petal_magic_effect" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_yat96j"
                            alt="Rose petal magic effect"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "moonlight_fairy_wings" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_t63u0n"
                            alt="Moonlight fairy wings"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        {item.icon === "golden_sunflower_hairpin" && (
                          <img
                            src="https://res.cloudinary.com/dudunom7x/image/upload/screen_etmmx2"
                            alt="Golden sunflower hairpin"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-xs font-black text-[#4c3b31] truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-[#74584d]/80 font-semibold line-clamp-2 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#fcf4f2]/60 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase text-rose-400 tracking-wider">
                        {getCategoryLabel(category)}
                      </span>

                      <button
                        onClick={() => onToggleEquipCosmetic(item.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase flex items-center space-x-1 cursor-pointer transition-all ${
                          isEquipped
                            ? "bg-rose-550 hover:bg-rose-600 text-white shadow-inner"
                            : "bg-[#fff0f2] hover:bg-[#ffe1e5] border border-[#f9c2cc]/40 text-[#df375e]"
                        }`}
                      >
                        {isEquipped ? (
                          <>
                            <Check className="w-2.5 h-2.5 mr-0.5" />
                            EQUIPPED
                          </>
                        ) : (
                          "EQUIP"
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QUICK STATS & ROLE BONUS HELPER */}
      <div className="bg-gradient-to-br from-[#1c1d24] to-[#121319] rounded-3xl p-5 border border-slate-800 text-slate-100 flex flex-col md:flex-row md:items-center justify-between select-none space-y-4 md:space-y-0">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400 font-bold text-2xl">
            🔮
          </div>
          <div>
            <h4 className="font-extrabold text-sm flex items-center">
              Active Cosmetic Set Synergy
              <span className="ml-1.5 animate-pulse text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Passive Buff
              </span>
            </h4>
            <p className="text-xs font-medium text-slate-400 leading-normal max-w-sm mt-1">
              Wearing custom relics visualizes your progress! Equip items matching your style and express your commitment to your personal citadels!
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
            Synergy Rating
          </div>
          <div className="text-lg font-black text-white flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            {equippedCosmetics.length * 15} Magic Points
          </div>
        </div>
      </div>
    </div>
  );
};
