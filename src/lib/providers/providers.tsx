import React from "react";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "@/context/user-context";
import { UserConfig } from "../types/user.types";

interface ProvidersProps {
  children: React.ReactNode;
  user?: UserConfig | null;
}

export default function Providers({ children, user }: ProvidersProps) {
  return (
    <UserProvider initialUser={user}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </UserProvider>
  );
}
