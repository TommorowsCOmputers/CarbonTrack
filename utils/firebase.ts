import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getDeviceId(): Promise<string> {
  if (Platform.OS === 'ios') {
    return Application.getIosIdForVendorAsync().then(id => id || 'unknown-ios');
  } else if (Platform.OS === 'android') {
    return Application.getAndroidId() || 'unknown-android';
  } else {
    const storedId = await getStoredWebId();
    return storedId;
  }
}

async function getStoredWebId(): Promise<string> {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    let webId = await AsyncStorage.getItem('webDeviceId');
    if (!webId) {
      webId = 'web-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      await AsyncStorage.setItem('webDeviceId', webId);
    }
    return webId;
  } catch {
    return 'web-unknown';
  }
}

export interface UserData {
  device_id: string;
  username: string;
  avatar: string;
  carbon_coins: number;
  created_at?: number;
  updated_at?: number;
}

export async function fetchUser(deviceId: string): Promise<UserData | null> {
  try {
    const userRef = doc(db, 'users', deviceId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }
    
    return userSnap.data() as UserData;
  } catch (error) {
    console.error('Error fetching user from Firebase:', error);
    return null;
  }
}

export async function createOrUpdateUser(
  deviceId: string,
  username: string,
  avatar: string,
  carbonCoins: number
): Promise<UserData | null> {
  try {
    const userRef = doc(db, 'users', deviceId);
    const userData: UserData = {
      device_id: deviceId,
      username,
      avatar,
      carbon_coins: carbonCoins,
      updated_at: Date.now(),
    };
    
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      userData.created_at = Date.now();
    }
    
    await setDoc(userRef, userData, { merge: true });
    return userData;
  } catch (error) {
    console.error('Error creating/updating user in Firebase:', error);
    return null;
  }
}

export async function updateCarbonCoins(
  deviceId: string,
  carbonCoins: number
): Promise<UserData | null> {
  try {
    const userRef = doc(db, 'users', deviceId);
    await updateDoc(userRef, {
      carbon_coins: carbonCoins,
      updated_at: Date.now(),
    });
    
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as UserData) : null;
  } catch (error) {
    console.error('Error updating carbon coins in Firebase:', error);
    return null;
  }
}

export async function fetchLeaderboard(): Promise<UserData[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('carbon_coins', 'desc'), limit(100));
    const querySnapshot = await getDocs(q);
    
    const leaderboard: UserData[] = [];
    querySnapshot.forEach((doc) => {
      leaderboard.push(doc.data() as UserData);
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard from Firebase:', error);
    return [];
  }
}

export const isFirebaseEnabled = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};
