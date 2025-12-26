// Auth utility functions

import { User } from '@/types';

const AUTH_KEY = 'laundryhub_user';
const AUTH_TOKEN_KEY = 'laundryhub_token';

// Re-export User type for convenience
export type { User };

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = sessionStorage.getItem(AUTH_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuth(user: User, token: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuth(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function updateUserLocation(latitude: number, longitude: number): void {
  if (typeof window === 'undefined') return;
  const user = getCurrentUser();
  if (user) {
    const updatedUser = {
      ...user,
      latitude,
      longitude,
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
  }
}

export function requireAuth(redirectTo?: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!isAuthenticated()) {
    const returnUrl = redirectTo || window.location.pathname;
    window.location.href = `/login?returnUrl=${encodeURIComponent(returnUrl)}`;
    return false;
  }
  return true;
}

