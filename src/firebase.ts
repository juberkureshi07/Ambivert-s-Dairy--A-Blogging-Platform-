import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);

/**
 * Global error handler for Firestore operations
 */
export function handleFirestoreError(error: any, operation: string, path: string | null) {
  console.error(`[Firestore Error] ${operation} at ${path || 'unknown'}:`, error);
  
  // Provide a user-friendly error message
  const message = error?.message || 'An unexpected error occurred with the database.';
  throw new Error(message);
}
