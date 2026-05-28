/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProgress {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  xp: number;
  level: number;
  xpToNextLevel: number;
  crystals: number;
  perfectDays: number;
  bestStreak: number;
  currentStreak: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quest {
  id: string;
  userId: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string; // e.g., 'Droplets', 'BookOpen', 'SmartphoneCharging', 'Crown', 'Activity'
  streak: number;
  completed: boolean;
  lastCompletedAt: string | null;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string; // YYYY-MM-DD
  userId: string;
  completedCount: number;
  totalCount: number;
  xpEarned: number;
  updatedAt: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  mood: 'peaceful' | 'energetic' | 'thoughtful' | 'tired' | 'comfy';
  createdAt: string;
}

export interface BazaarItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  bonusXP: number;
  category?: 'alchemy' | 'cosmetic';
  locked?: boolean;
}
