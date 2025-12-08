import * as Application from 'expo-application';
import { Platform } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://0d3b864d-988a-4f99-9416-a4af676fb568-00-3rzkho892rb65.worf.replit.dev:3001';

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
}

export async function fetchUser(deviceId: string): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${deviceId}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
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
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId,
        username,
        avatar,
        carbonCoins,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create/update user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return null;
  }
}

export async function updateCarbonCoins(
  deviceId: string,
  carbonCoins: number
): Promise<UserData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${deviceId}/coins`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ carbonCoins }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update carbon coins');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating carbon coins:', error);
    return null;
  }
}

export async function fetchLeaderboard(): Promise<UserData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}
