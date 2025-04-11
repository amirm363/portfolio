"use client";
import { createContext } from "react";
import { UserConfig } from "@/lib/types/user.types"; // Your user type definition

// Define the shape of your context
interface UserContextType {
  user: UserConfig | null;
  isLoading: boolean;
  setUser?: (user: UserConfig | null) => void;
}

// Create context with default values
export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
});
