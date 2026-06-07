/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// @ts-ignore
import avatarLevel1Image from '../assets/images/level1_avatar_1779953434830.png';
// @ts-ignore
import avatarLevel3Image from '../assets/images/level3_avatar_1779953237144.png';
// @ts-ignore
import avatarLevel4Image from '../assets/images/level4_avatar_1779954270394.png';
// @ts-ignore
import avatarLevel5Image from '../assets/images/level5_avatar_1779954486281.png';
// @ts-ignore
import avatarImage from '../assets/images/elven_warrior_avatar_1779424968715.png';
// @ts-ignore
import sleepySpriteImage from '../assets/images/sleepy_sprite_1779425250672.png';
// @ts-ignore
import doubtWitchImage from '../assets/images/doubt_witch_1779425272518.png';
// @ts-ignore
import eclipseQueenImage from '../assets/images/eclipse_queen_1779425291172.png';

const butterflyWingsImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_m8rhfd';
const crystalCrownImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_aokoxq';
const fairyCompanionImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_vuo5zk';
const sakuraOutfitImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_aweuab';
const pinkStarWandImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_pvzpjj';
const princessGownImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_wl2rx5';
const angelHaloImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_zztpgn';
const rosePetalMagicImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_yat96j';
const moonlightWingsImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_t63u0n';
const sunflowerHairpinImg = 'https://res.cloudinary.com/dudunom7x/image/upload/screen_etmmx2';

// 1. Aura Belle Elf Avatar Portrait with Dynamic Cosmetic Equip Support
export const AuraBelleAvatar: React.FC<{ 
  size?: number; 
  showBorder?: boolean; 
  className?: string; 
  level?: number;
  xp?: number; 
  equippedCosmetics?: string[];
}> = ({
  size = 120,
  showBorder = true,
  className = "",
  level: propsLevel,
  xp = 0,
  equippedCosmetics = []
}) => {
  let level = 1;
  if (propsLevel !== undefined) {
    level = propsLevel;
  } else {
    if (xp <= 500) level = 1;
    else if (xp <= 1000) level = 2;
    else if (xp <= 2000) level = 3;
    else if (xp <= 3500) level = 4;
    else level = 5;
  }

  const isEquipped = (id: string) => equippedCosmetics.includes(id);

  const hasButterflyWings = isEquipped('cosmetic_butterfly_wings');
  const hasMoonlightWings = isEquipped('cosmetic_moonlight_wings');
  const hasCrown = isEquipped('cosmetic_crystal_crown');
  const hasSunflowerVal = isEquipped('cosmetic_sunflower_hairpin');
  const hasHalo = isEquipped('cosmetic_angel_halo');
  const hasPet = isEquipped('cosmetic_fairy_companion');
  const hasWand = isEquipped('cosmetic_pink_star_wand');
  const hasSakura = isEquipped('cosmetic_sakura_outfit');
  const hasGown = isEquipped('cosmetic_princess_gown');
  const hasRosePetals = isEquipped('cosmetic_rose_petal_magic');
  const hasWaterMagic = isEquipped('cosmetic_water_magic') || equippedCosmetics.includes('water_magic');

  // Dynamic Ring decoration matching outfit selection
  let customRingClass = 'ring-4 ring-rose-100 shadow-lg';
  if (hasSakura) {
    customRingClass = 'ring-4 ring-pink-300 shadow-[0_0_15px_rgba(244,143,177,0.8)] animate-pulse';
  } else if (hasGown) {
    customRingClass = 'ring-4 ring-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.95)] animate-pulse';
  }

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -8 -8 -8 22 -0.5
            " />
          </filter>
        </defs>
      </svg>
      <div 
        style={{ width: size, height: size }} 
        className={`relative select-none flex items-center justify-center ${className}`}
      >
      {/* =========================================================
                     OUTER VISUAL EFFECTS & AURAS BY LEVEL & COSMETIC WINGS
         ========================================================= */}

      {/* Level 1: Small Sparkles */}
      {level === 1 && !hasButterflyWings && !hasMoonlightWings && (
        <div className="absolute inset-x-0 -top-2 flex justify-between pointer-events-none z-10">
          <span className="text-[10px] animate-pulse">✨</span>
          <span className="text-[10px] animate-pulse delay-700">✨</span>
        </div>
      )}

      {/* Level 2: Soft glow & Pastel sparkles */}
      {level === 2 && (
        <>
          <div className="absolute inset-0 rounded-full bg-pink-300/20 blur-md pointer-events-none animate-pulse scale-105" />
          <div className="absolute -top-3 -left-1 text-[11px] animate-bounce pointer-events-none">✨</div>
          <div className="absolute -bottom-2 -right-1 text-[9px] animate-pulse pointer-events-none">🌸</div>
        </>
      )}

      {/* Level 3: Warm yellow energy trails and glowing butterflies */}
      {level === 3 && (
        <>
          <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-spin [animation-duration:6s] pointer-events-none scale-108" />
          <div className="absolute inset-0 rounded-full border border-dashed border-indigo-300/30 animate-spin [animation-duration:12s] pointer-events-none scale-112" />
          <div className="absolute -top-3 left-1 text-xs animate-bounce pointer-events-none">🦋</div>
          <div className="absolute top-1/2 -right-3 text-xs animate-pulse pointer-events-none [animation-delay:0.5s]">🦋</div>
        </>
      )}

      {/* Level 4: Pink-orange aura with floating stars and petals */}
      {level === 4 && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/30 via-orange-300/20 to-rose-400/30 blur-lg pointer-events-none animate-pulse scale-115" />
          <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping [animation-duration:4s] pointer-events-none" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs animate-bounce">⭐</div>
          <div className="absolute top-1/4 -left-3 text-xs animate-pulse text-rose-300">🌸</div>
          <div className="absolute bottom-1 -right-3 text-xs animate-bounce text-orange-300">🌸</div>
        </>
      )}

      {/* Level 5 Aura effect, bypassed if custom wings are shown to avoid cluttering */}
      {level === 5 && !hasButterflyWings && !hasMoonlightWings && (
        <>
          <div className="absolute -left-8 -right-8 top-1 bottom-1 flex justify-between pointer-events-none z-0">
            {/* Left Wings */}
            <svg className="w-10 h-12 text-pink-300/80 fill-current filter drop-shadow-[0_0_6px_rgba(244,143,177,0.6)] animate-pulse" viewBox="0 0 100 100" style={{ transform: 'scaleX(-1)' }}>
              <path d="M10 50 C30 20 80 10 90 20 C90 40 60 70 30 80 C40 65 30 55 10 50 Z" />
            </svg>
            {/* Right Wings */}
            <svg className="w-10 h-12 text-pink-300/80 fill-current filter drop-shadow-[0_0_6px_rgba(244,143,177,0.6)] animate-pulse" viewBox="0 0 100 100">
              <path d="M10 50 C30 20 80 10 90 20 C90 40 60 70 30 80 C40 65 30 55 10 50 Z" />
            </svg>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-sky-300/50 animate-spin [animation-duration:8s] pointer-events-none scale-108" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-sky-400/20 via-pink-300/15 to-amber-300/20 blur-xl pointer-events-none scale-120 animate-pulse" />

          <span className="absolute -top-5 left-1/4 text-xs animate-bounce">💎</span>
          <span className="absolute -top-4 right-1/4 text-xs animate-bounce [animation-delay:0.7s]">✨</span>
        </>
      )}

      {/* Outer Rose petals surround effect */}
      {hasRosePetals && (
        <div className="absolute inset-[-15%] pointer-events-none z-0 overflow-visible animate-pulse">
          <img 
            src={rosePetalMagicImg} 
            alt="Outer Rose Petal Surround" 
            className="absolute inset-0 w-full h-full object-contain opacity-55 scale-125 filter blur-[0.3px]" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        </div>
      )}

      {/* =========================================================
                     CLIPPED MAIN CHARACTER AVATAR PORTRAIT
         ========================================================= */}
      <div
        className={`w-full h-full rounded-full overflow-hidden relative z-10 bg-white ${
          showBorder ? customRingClass : ''
        } ${level === 5 ? 'animate-bounce [animation-duration:5s]' : ''}`}
      >
        {/* Under Wings (rendered behind human profile inside the circle boundary) */}
        {hasButterflyWings && (
          <img 
            src={butterflyWingsImg} 
            alt="Butterfly Wings" 
            className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[90%] h-[90%] pointer-events-none z-[5] animate-pulse" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        {hasMoonlightWings && (
          <img 
            src={moonlightWingsImg} 
            alt="Moonlight Wings" 
            className="absolute left-1/2 top-[8%] -translate-x-1/2 w-[95%] h-[95%] pointer-events-none z-[5] filter brightness-[1.1] animate-pulse" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        <img
          src={level === 1 ? avatarLevel1Image : level === 3 ? avatarLevel3Image : level === 4 ? avatarLevel4Image : level === 5 ? avatarLevel5Image : avatarImage}
          alt="Aura Belle Elven Warrior Profile"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 relative z-[10]"
        />

        {/* Sakura Outfit Overlay with white background removed */}
        {hasSakura && (
          <img
            src={sakuraOutfitImg}
            alt="Sakura Blossom Outfit"
            className="absolute bottom-[-1%] inset-x-0 w-[116%] h-[74%] mx-auto object-contain pointer-events-none z-[15]"
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Celestial Gown Overlay with white background removed */}
        {hasGown && (
          <img
            src={princessGownImg}
            alt="Celestial Princess Gown"
            className="absolute bottom-[-2%] inset-x-0 w-[116%] h-[76%] mx-auto object-contain pointer-events-none z-[15]"
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Rose petal magic inside-circle animation */}
        {hasRosePetals && (
          <div className="absolute inset-0 pointer-events-none z-[16] overflow-hidden rounded-full animate-pulse">
            <div className="absolute inset-0 bg-red-400/10 pointer-events-none" />
            <img 
              src={rosePetalMagicImg} 
              alt="Rose Petal Aura Overlay" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110" 
              style={{ filter: "url(#remove-white-bg)" }}
              referrerPolicy="no-referrer" 
            />
          </div>
        )}

        {/* Halo Effect with white background removed */}
        {hasHalo && (
          <img 
            src={angelHaloImg} 
            alt="Angel Halo" 
            className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[34%] h-[34%] pointer-events-none z-[20] animate-bounce [animation-duration:3s]" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        {/* Crown with white background removed */}
        {hasCrown && (
          <img 
            src={crystalCrownImg} 
            alt="Golden Crystal Crown" 
            className="absolute top-[2%] left-1/2 -translate-x-[50%] w-[28%] h-[28%] pointer-events-none z-[20] transform hover:scale-110 transition-transform text-shadow" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        {/* Sunflower Hairpin with white background removed */}
        {hasSunflowerVal && (
          <img 
            src={sunflowerHairpinImg} 
            alt="Golden Sunflower Hairpin" 
            className="absolute top-[14%] right-[22%] w-[20%] h-[20%] pointer-events-none z-[20] rotate-[15deg] drop-shadow-md" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        {/* Fairy Companion with white background removed */}
        {hasPet && (
          <img 
            src={fairyCompanionImg} 
            alt="Fairy Companion" 
            className="absolute right-[4%] bottom-[12%] w-[32%] h-[32%] pointer-events-none z-[22] animate-bounce [animation-duration:4s]" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}

        {/* Magic Wand with white background removed */}
        {hasWand && (
          <img 
            src={pinkStarWandImg} 
            alt="Pink Star Wand" 
            className="absolute left-[4%] bottom-[4%] w-[38%] h-[38%] pointer-events-none z-[22] rotate-[-15deg] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-pulse" 
            style={{ filter: "url(#remove-white-bg)" }}
            referrerPolicy="no-referrer" 
          />
        )}
      </div>

      {/* Pastel Water Magic Anim */}
      {hasWaterMagic && (
        <div className="absolute inset-0 z-[12] pointer-events-none rounded-full border-[3px] border-sky-300/80 animate-pulse bg-sky-200/5 scale-105 shadow-[0_0_15px_rgba(125,211,252,0.9)] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-b-2 border-sky-450/40 animate-spin [animation-duration:2s]" />
          <div className="absolute inset-2 rounded-full border-t border-indigo-300/40 animate-spin [animation-duration:3s]" />
          <span className="absolute -top-3 text-xs filter drop-shadow animate-bounce">💧</span>
          <span className="absolute -bottom-3 text-xs filter drop-shadow animate-bounce [animation-delay:0.5s]">🫧</span>
          <span className="absolute -left-3 text-xs filter drop-shadow animate-pulse [animation-delay:0.3s]">💦</span>
          <span className="absolute -right-3 text-xs filter drop-shadow animate-pulse [animation-delay:0.7s]">🫧</span>
        </div>
      )}
    </div>
    </>
  );
};

// 2. The Sleepy Sprite / Companion Fairy (Now an dynamic Antagonist)
export const EnemySleepySprite: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`relative select-none flex items-center justify-center ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-purple-200 shadow-md bg-white">
        <img
          src={sleepySpriteImage}
          alt="Sleepy Sprite"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

export const SleepySprite: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = "" }) => {
  return <EnemySleepySprite size={size} className={className} />;
};

// Level 2 Enemy: The Doubt Witch
export const EnemyDoubtWitch: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`relative select-none flex items-center justify-center ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-fuchsia-300 shadow-md bg-white">
        <img
          src={doubtWitchImage}
          alt="Doubt Witch"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};

// Level 3 Enemy: The Eclipse Queen
export const EnemyEclipseQueen: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`relative select-none flex items-center justify-center ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-pink-400 shadow-md bg-white">
        <img
          src={eclipseQueenImage}
          alt="Eclipse Queen"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
    </div>
  );
};


// 3. Shield with Heart (Crystalline Aegis)
export const ShieldHeart: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldMetal" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#f1f5f9"/>
            <stop offset="40%" stopColor="#cbd5e1"/>
            <stop offset="100%" stopColor="#475569"/>
          </linearGradient>
          <linearGradient id="shieldGlow" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        {/* Sparkle background */}
        <circle cx="50" cy="50" r="45" fill="#fff5f6" stroke="#fae3e5" strokeWidth="1" />
        
        {/* Silver Shield Shape */}
        <path d="M50 15 C75 15 85 24 82 52 C78 74 62 88 50 92 C38 88 22 74 18 52 C15 24 25 15 50 15 Z" fill="url(#shieldMetal)" stroke="#64748b" strokeWidth="2.5" />
        {/* Inner Glare Glass */}
        <path d="M50 18 C72 18 80 26 78 50 C74 70 60 84 50 88 C40 84 26 70 22 50 C20 26 28 18 50 18 Z" fill="url(#shieldGlow)" />
        
        {/* Golden Filigree vine wraps */}
        <path d="M22 28 C28 22 45 35 50 45" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M78 28 C72 22 55 35 50 45" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M50 45 C50 65 65 78 72 75" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M50 45 C50 65 35 78 28 75" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        
        {/* Main Heart jewel in Center */}
        <path d="M50 56 L47 52 C38 42 46 32 50 38 C54 32 62 42 53 52 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="1.5"/>
        {/* heart reflection overlay */}
        <path d="M46 44 C45 42 48 40 49 42" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </svg>
    </div>
  );
};

// 4. Pastel Butterfly (Flutter Familiar)
export const PastelButterfly: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wingGradientL" x1="0" y1="0" x2="50" y2="100">
            <stop offset="0%" stopColor="#fae8ff"/>
            <stop offset="50%" stopColor="#f5d0fe"/>
            <stop offset="100%" stopColor="#e0f2fe"/>
          </linearGradient>
          <linearGradient id="wingGradientR" x1="50" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#fae8ff"/>
            <stop offset="50%" stopColor="#f5d0fe"/>
            <stop offset="100%" stopColor="#dcfce7"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#fdf4ff" stroke="#fae3e5" strokeWidth="1" />

        {/* Antennas */}
        <path d="M48 35 C45 25 40 22 42 21 C44 20 46 25 48 32 M52 35 C55 25 60 22 58 21 C56 20 54 25 52 32" stroke="#701a75" strokeWidth="1.2" strokeLinecap="round"/>

        {/* Wings - Left Upper */}
        <path d="M47 48 C30 25 10 32 18 64 C24 68 40 60 47 54 Z" fill="url(#wingGradientL)" stroke="#d946ef" strokeWidth="1"/>
        {/* Wings - Left Lower */}
        <path d="M47 54 C35 55 26 72 38 82 C44 80 46 64 47 58 Z" fill="url(#wingGradientL)" stroke="#c084fc" strokeWidth="0.75"/>

        {/* Wings - Right Upper */}
        <path d="M53 48 C70 25 90 32 82 64 C76 68 60 60 53 54 Z" fill="url(#wingGradientR)" stroke="#d946ef" strokeWidth="1"/>
        {/* Wings - Right Lower */}
        <path d="M53 54 C65 55 74 72 62 82 C56 80 54 64 53 58 Z" fill="url(#wingGradientR)" stroke="#c084fc" strokeWidth="0.75"/>

        {/* Butterfly Body */}
        <rect x="48" y="32" width="4" height="34" rx="2" fill="#701a75"/>
        <circle cx="50" cy="32" r="3" fill="#701a75"/>
        
        {/* Sparkly Details on Wings */}
        <circle cx="32" cy="48" r="2.5" fill="white" opacity="0.8"/>
        <circle cx="68" cy="48" r="2.5" fill="white" opacity="0.8"/>
        <circle cx="35" cy="74" r="1.5" fill="white" opacity="0.8"/>
        <circle cx="65" cy="74" r="1.5" fill="white" opacity="0.8"/>
      </svg>
    </div>
  );
};

// 5. Sakura Kimono (Hanami Garb)
export const SakuraKimono: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kimonoFabric" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#fff1f2"/>
            <stop offset="50%" stopColor="#fbcfe8"/>
            <stop offset="100%" stopColor="#f472b6"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#fff5f5" stroke="#fae3e5" strokeWidth="1" />

        {/* Sleeves */}
        {/* Left Sleeve */}
        <path d="M38 32 C26 32 18 42 16 54 C15 62 26 74 34 65 L36 44" fill="url(#kimonoFabric)" stroke="#db2777" strokeWidth="1"/>
        {/* Right Sleeve */}
        <path d="M62 32 C74 32 82 42 84 54 C85 62 74 74 66 65 L64 44" fill="url(#kimonoFabric)" stroke="#db2777" strokeWidth="1"/>

        {/* Main Body Robe */}
        <path d="M36 32 L64 32 L60 88 L40 88 T36 32 Z" fill="url(#kimonoFabric)" stroke="#db2777" strokeWidth="1.5"/>
        
        {/* Collar Overlap V-neck */}
        <path d="M44 32 L50 44 L56 32" stroke="#db2777" strokeWidth="1.5" fill="none"/>
        <path d="M42 32 L50 46 L58 32" stroke="#ca8a04" strokeWidth="1" fill="none"/>

        {/* Gold Obi Sash (Belt) */}
        <rect x="38" y="48" width="24" height="10" rx="1" fill="#ca8a04" stroke="#854f54" strokeWidth="1"/>
        <rect x="44" y="46" width="12" height="14" rx="1" fill="#f472b6" stroke="#ca8a04" strokeWidth="1"/>

        {/* Sakura Cherry Blossom Petals printed on robe */}
        <circle cx="45" cy="68" r="3" fill="#ffffff" opacity="0.9"/>
        <circle cx="45" cy="68" r="1" fill="#db2777"/>
        <circle cx="55" cy="74" r="3" fill="#ffffff" opacity="0.9"/>
        <circle cx="55" cy="74" r="1" fill="#db2777"/>
        <circle cx="48" cy="80" r="2" fill="#ffffff" opacity="0.9"/>
        
        {/* Twirling magic wind trail */}
        <path d="M22 65 C32 68 45 40 55 45 C65 50 78 60 80 50" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="3 3" fill="none"/>
      </svg>
    </div>
  );
};

// 6. Wand Star (Astra Scepter)
export const WandStar: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crystalStar" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb"/>
            <stop offset="50%" stopColor="#fde047"/>
            <stop offset="100%" stopColor="#ca8a04"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#fefcbf" stroke="#fae3e5" strokeWidth="1" />

        {/* Wooden Staff Rod */}
        <path d="M26 82 C22 84 20 82 22 78 L65 30 L70 35 L26 82 Z" fill="#74584d" stroke="#5a4137" strokeWidth="1"/>
        
        {/* Gold wire wrapped around scepter */}
        <path d="M35 70 C37 68 42 66 45 68" stroke="#fcd34d" strokeWidth="1.5" fill="none"/>
        <path d="M48 56 C50 54 55 52 58 54" stroke="#fcd34d" strokeWidth="1.5" fill="none"/>

        {/* Star Crystal Header */}
        <g transform="translate(68, 28)">
          <path d="M0 -15 L4 -4 L15 -4 L7 3 L10 14 L0 7 L-10 14 L-7 3 L-15 -4 L-4 -4 Z" fill="url(#crystalStar)" stroke="#ca8a04" strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="2.5" fill="white" />
        </g>

        {/* Magical Sparkle Dots */}
        <path d="M78 12 L79 16 L83 16 L80 18 L81 22 L78 20 L75 22 L76 18 L73 16 L77 16 Z" fill="white"/>
        <circle cx="55" cy="22" r="1.5" fill="#fde047" />
        <circle cx="85" cy="40" r="1" fill="#fef08a" />
        <circle cx="70" cy="50" r="2" fill="#fff" />
      </svg>
    </div>
  );
};

// 7. Pink Potion Bottle (XP Elixir Flask)
export const PinkPotion: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="potionLiquid" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#fda4af"/>
            <stop offset="50%" stopColor="#f43f5e"/>
            <stop offset="100%" stopColor="#9f1239"/>
          </linearGradient>
          <linearGradient id="glassReflection" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
            <stop offset="30%" stopColor="white" stopOpacity="0"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#fff1f2" stroke="#fae3e5" strokeWidth="1" />

        {/* Bottle Neck and Cap */}
        <rect x="46" y="24" width="8" height="15" rx="1" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="42" y="16" width="16" height="8" rx="2" fill="#ca8a04" stroke="#854f54" strokeWidth="1.2" />

        {/* Bulb Glass Body */}
        <path d="M46 38 C32 40 24 55 24 70 C24 84 36 90 50 90 C64 90 76 84 76 70 C76 55 68 40 54 38 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        
        {/* Glowing Pink Potion Liquid Inside */}
        <path d="M47 48 C36 50 28 60 28 72 C28 82 38 86 50 86 C62 86 72 82 72 72 C72 60 64 50 53 48 C49 53 51 53 47 48 Z" fill="url(#potionLiquid)" />
        
        {/* Bubbles */}
        <circle cx="42" cy="62" r="2.5" fill="white" opacity="0.7" />
        <circle cx="58" cy="68" r="1.5" fill="white" opacity="0.6" />
        <circle cx="50" cy="56" r="2" fill="white" opacity="0.8" />

        {/* Glass reflection sheen */}
        <path d="M32 70 C32 60 38 48 46 45" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" fill="none"/>

        {/* Golden Filigree label with "XP" */}
        <path d="M41 60 L59 60 L56 74 L44 74 Z" fill="#eab308" stroke="#854f54" strokeWidth="1" />
        <text x="50" y="70" fill="#754247" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">XXP</text>
      </svg>
    </div>
  );
};

// 8. Golden Crown with pink gem (Sovereign Coronet)
export const GoldCrown: React.FC<{ size?: number; className?: string }> = ({ size = 120, className = "" }) => {
  return (
    <div style={{ width: size, height: size }} className={`select-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crownGold" x1="0" y1="0" x2="0" y2="100%">
            <stop offset="0%" stopColor="#fef08a"/>
            <stop offset="40%" stopColor="#fde047"/>
            <stop offset="100%" stopColor="#ca8a04"/>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="45" fill="#fef9c3" stroke="#fae3e5" strokeWidth="1" />

        {/* Main Base Velvet Cushion */}
        <path d="M26 68 C26 50 74 50 74 68 Z" fill="#9f1239" opacity="0.8"/>

        {/* Golden Royal Crown */}
        <path d="M22 68 L24 45 L38 56 L50 36 L62 56 L76 45 L78 68 Z" fill="url(#crownGold)" stroke="#854f54" strokeWidth="1.5" />
        <rect x="22" y="65" width="56" height="6" rx="2" fill="#ca8a04" stroke="#854f54" strokeWidth="1" />

        {/* Crown Jewels (Gems at tips) */}
        <circle cx="24" cy="45" r="3" fill="#ec4899" stroke="#854f54" strokeWidth="0.5"/>
        <circle cx="50" cy="36" r="3.5" fill="#ec4899" stroke="#854f54" strokeWidth="0.5"/>
        <circle cx="76" cy="45" r="3" fill="#ec4899" stroke="#854f54" strokeWidth="0.5"/>

        {/* Central Teardrop Pink Diamond */}
        <path d="M50 63 L44 54 C44 50 56 50 56 54 Z" fill="#ec4899" stroke="#9f1239" strokeWidth="1"/>
        <circle cx="50" cy="54" r="1.5" fill="white" />

        {/* Ornate carvings inside gold bases */}
        <path d="M32 65 C32 60 36 58 38 61" stroke="#854f54" strokeWidth="1" fill="none" />
        <path d="M68 65 C68 60 64 58 62 61" stroke="#854f54" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};

// 9. Bloom Bazaar - Full Tavern/Shop Scene Background
export const BloomBazaarIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full aspect-video rounded-xl border border-secondary-container shadow-inner overflow-hidden select-none bg-stone-900 ${className}`}>
      {/* Intricately rendered wizard laboratory scene */}
      <svg width="100%" height="100%" viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="warmLabGlow" x1="0" y1="0" x2="160" y2="90">
            <stop offset="0%" stopColor="#451a03"/>
            <stop offset="40%" stopColor="#291203"/>
            <stop offset="100%" stopColor="#1c1917"/>
          </linearGradient>
          <linearGradient id="windowLight" x1="0" y1="0" x2="60" y2="60">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#fde047" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#1c1917" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Background base */}
        <rect width="160" height="90" fill="url(#warmLabGlow)" />

        {/* Stone Arch Window Left */}
        <path d="M10 20 C10 5 35 5 35 20 L35 70 L10 70 Z" fill="#1e293b" opacity="0.6"/>
        <path d="M10 20 C10 5 35 5 35 20 L35 70 L10 70 Z" fill="url(#windowLight)"/>
        
        {/* Wooden Beams */}
        <rect x="0" y="0" width="160" height="8" fill="#1c0d02" />
        <rect x="15" y="0" width="8" height="90" fill="#1c0d02" opacity="0.4" />
        <rect x="140" y="0" width="8" height="90" fill="#1c0d02" opacity="0.4" />

        {/* Potion Wall Shelves Right */}
        <rect x="75" y="10" width="75" height="4" fill="#3e2723" />
        <rect x="75" y="28" width="75" height="4" fill="#3e2723" />
        <rect x="75" y="46" width="75" height="4" fill="#3e2723" />

        {/* Hanging Floral Basket */}
        <path d="M45 10 C42 18 52 18 50 10" stroke="#ca8a04" fill="none" strokeWidth="0.5"/>
        <ellipse cx="47" cy="18" rx="5" ry="3" fill="#78350f" />
        {/* Soft glowing hanging flower petals */}
        <circle cx="45" cy="20" r="2.5" fill="#f472b6" />
        <circle cx="49" cy="21" r="2" fill="#cbd5e1" />
        <circle cx="48" cy="18" r="1.5" fill="#4ade80" />

        {/* Alchemy Lab Altar Table */}
        <path d="M50 62 L150 62 L146 84 L54 84 Z" fill="#2d1a0e" stroke="#1c0c02" strokeWidth="1.5" />
        
        {/* Potion flasks on table */}
        {/* Large Pink Potion */}
        <path d="M64 54 L68 54 L70 62 L62 62 Z" fill="#fda4af" />
        <ellipse cx="66" cy="62" rx="4" ry="2" fill="#ec4899" />
        {/* Small Cyan Potion */}
        <circle cx="78" cy="59" r="3" fill="#22d3ee" />
        {/* Yellow Beaker */}
        <path d="M92 50 L94 50 L96 61 L90 61 Z" fill="#fef08a" />
        
        {/* Alchemy Mortar and Pestle */}
        <ellipse cx="110" cy="58" rx="6" ry="4" fill="#64748b" />
        <rect x="108" y="52" width="2" height="7" transform="rotate(30,108,52)" fill="#94a3b8" />

        {/* Magical steaming cauldron in background */}
        <ellipse cx="132" cy="60" rx="9" ry="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
        {/* Steaming green bubbles */}
        <path d="M128 55 C128 48 136 48 136 55 Z" fill="#a3e635" opacity="0.8"/>
        <circle cx="130" cy="51" r="1.5" fill="#84cc16" />
        <circle cx="134" cy="48" r="1" fill="#84cc16" />

        {/* Cozy Sleeping Pink Phoenix on Velvet Cushion */}
        <ellipse cx="120" cy="78" rx="14" ry="5" fill="#9f1239" />
        <path d="M112 76 C112 70 128 70 128 76 C130 82 120 84 112 76 Z" fill="#f472b6" />
        {/* Phoenix golden tail feather wraps */}
        <path d="M124 77 C132 80 135 76 138 78" stroke="#ca8a04" strokeWidth="1" fill="none" />
        <path d="M110 74 C104 74 102 76 100 75" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="109" cy="74" r="0.5" fill="#1e293b" /> {/* Sleeping eye */}
        <circle cx="118" cy="76" r="4" fill="#ec4899" /> {/* cozy folded wing */}

        {/* Small potion jars on wall shelves */}
        <rect x="80" y="16" width="3" height="6" fill="#ec4899"/>
        <rect x="88" y="17" width="2.5" height="5" fill="#a855f7"/>
        <circle cx="102" cy="22" r="2.5" fill="#10b981"/>
        <path d="M118 16 L122 16 L123 23 L117 23 Z" fill="#f59e0b"/>
        
        <rect x="82" y="34" width="4" height="8" rx="1" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
        <circle cx="98" cy="38" r="3.5" fill="#3b82f6"/>
        <rect x="115" y="32" width="3" height="10" fill="#a855f7"/>

        {/* Sunlight light particles (cozy sparkles) */}
        <circle cx="45" cy="30" r="0.8" fill="#fde047" opacity="0.6"/>
        <circle cx="35" cy="45" r="0.5" fill="#fde047" opacity="0.5"/>
        <circle cx="55" cy="52" r="0.6" fill="#fde047" opacity="0.8"/>
        <circle cx="85" cy="68" r="0.8" fill="#fde047" opacity="0.5"/>
        <circle cx="145" cy="40" r="0.5" fill="#fde047" opacity="0.4"/>

        {/* Shop Labeling overlay text */}
        <rect x="75" y="4" width="50" height="10" rx="3" fill="#1c0d02" stroke="#ebd5d7" strokeWidth="0.5" />
        <text x="100" y="11" fill="#fdd8ca" fontSize="5" fontWeight="black" textAnchor="middle" letterSpacing="0.05em" fontFamily="sans-serif">BLOOM BAZAAR</text>
      </svg>

      {/* Ambient particles */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-stone-900 pointer-events-none opacity-30"></div>
    </div>
  );
};
