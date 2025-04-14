import { useCallback } from 'react';

/**
 * Custom hook to handle session storage operations.
 * 
 * @returns {Object} - An object containing the handleSessionStorage function.
 */
export default function useSessionHook() {
  /**
   * Function to handle session storage operations.
   * 
   * @param {("get" | "set" | "remove")} method - The method to perform on session storage.
   * @param {string} key - The key to get, set, or remove from session storage.
   * @param {string} [value] - The value to set in session storage (only required for "set" method).
   * @returns {string | void} - The value from session storage for "get" method, otherwise void.
   */
  const handleSessionStorage = useCallback((
    method: "get" | "set" | "remove",
    key: string,
    value?: string
  ) => {
    if (typeof window === "undefined") return;

    if (method === "get") {
      return sessionStorage.getItem(key);
    } else if (method === "set" && value) {
      sessionStorage.setItem(key, value);
    } else if (method === "remove") {
      sessionStorage.removeItem(key);
    }
  }, []);

  return { handleSessionStorage };
}
