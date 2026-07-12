"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/app/lib/auth";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
