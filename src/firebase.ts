/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Support graceful local fallbacks if API Key is empty/pending
export const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5);

let firebaseApp;
let isConfigReady = false;

try {
  if (isFirebaseConfigured) {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    isConfigReady = true;
  }
} catch (e) {
  console.warn('Firebase failed to initialize. Running in Offline-First Local Ledger mode.', e);
}

export const db = isConfigReady && firebaseApp ? getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId) : null;
export const auth = isConfigReady && firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = isConfigReady ? new GoogleAuthProvider() : null;

// Error wrapper helper conforming to FirestoreErrorInfo standard
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMessage = error instanceof Error ? error.message : String(error);
  
  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  
  console.error('Firestore Hardened Error Raised:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Authentication Sign-In Wrapper
export async function signInWithGoogle() {
  if (!isFirebaseConfigured || !auth || !googleProvider) {
    // If not configured, we simulate a magical guest profile locally
    return {
      uid: 'guest-hero-123',
      displayName: 'Elven Adventurer (Local)',
      email: 'guest@habitbloom.fantasy',
      photoURL: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5'
    };
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Core Auth Popup error raised:', error);
    throw error;
  }
}

export async function logOutUser() {
  if (auth) {
    await signOut(auth);
  }
}
