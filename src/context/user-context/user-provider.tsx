"use client";
import { useState, useEffect } from "react";
import { UserContext } from "./user-context";
import { UserConfig } from "@/lib/types/user.types";

interface UserProviderProps {
  initialUser?: UserConfig | null;
  children: React.ReactNode;
}

export function UserProvider({
  initialUser = null,
  children,
}: UserProviderProps) {
  const [user, setUser] = useState<UserConfig | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);

  // You can add effects here to fetch user data if needed
  useEffect(() => {
    if (!initialUser && !user) {
      // Example: Fetch user from localStorage or API
      // const storedUser = localStorage.getItem('user');
      // if (storedUser) {
      //   setUser(JSON.parse(storedUser));
      // }
      setIsLoading(false);
    }
  }, [initialUser, user]);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
