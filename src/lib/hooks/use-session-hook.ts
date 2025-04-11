export default function useSessionHook() {
  const handleSessionStorage = (
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
  };

  return { handleSessionStorage };
}
