import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

const AUTH_STORAGE_KEY = "interviewly.auth";
const AUTH_STORAGE_PREF_KEY = "interviewly.auth.storage";
const memoryStore = new Map();

const getPreferredStorageType = () => {
  if (typeof window === "undefined") {
    return "memory";
  }

  const sessionPref = window.sessionStorage.getItem(AUTH_STORAGE_PREF_KEY);
  if (sessionPref === "session" || sessionPref === "local") {
    return sessionPref;
  }

  const localPref = window.localStorage.getItem(AUTH_STORAGE_PREF_KEY);
  if (localPref === "session" || localPref === "local") {
    return localPref;
  }

  return "local";
};

const resolveStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return getPreferredStorageType() === "session"
    ? window.sessionStorage
    : window.localStorage;
};

const storage = {
  getItem: (key) => {
    const store = resolveStorage();
    if (!store) {
      return memoryStore.get(key) ?? null;
    }
    return store.getItem(key);
  },
  setItem: (key, value) => {
    const store = resolveStorage();
    if (!store) {
      memoryStore.set(key, value);
      return;
    }
    store.setItem(key, value);
  },
  removeItem: (key) => {
    const store = resolveStorage();
    if (store) {
      store.removeItem(key);
    }
    memoryStore.delete(key);
  },
};

export const setAuthStoragePreference = (rememberMe) => {
  if (typeof window === "undefined") {
    return;
  }

  if (rememberMe) {
    window.localStorage.setItem(AUTH_STORAGE_PREF_KEY, "local");
    window.sessionStorage.removeItem(AUTH_STORAGE_PREF_KEY);
  } else {
    window.sessionStorage.setItem(AUTH_STORAGE_PREF_KEY, "session");
    window.localStorage.removeItem(AUTH_STORAGE_PREF_KEY);
  }
};

export const getAuthStoragePreference = () => {
  const type = getPreferredStorageType();
  return type === "session" ? "session" : "local";
};

export const clearLocalAuthStorage = () => {
  if (typeof window === "undefined") {
    return;
  }

  const keys = Object.keys(window.localStorage);
  keys.forEach((key) => {
    if (key.startsWith(AUTH_STORAGE_KEY)) {
      window.localStorage.removeItem(key);
    }
  });
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: AUTH_STORAGE_KEY,
    storage,
  },
});
