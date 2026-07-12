"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, fullName: string | null) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const cleanApiUrl = API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`;


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Read token and user from localStorage on mount
    const savedToken = localStorage.getItem("ecostay_token");
    const savedUser = localStorage.getItem("ecostay_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${cleanApiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 429) {
        throw new Error("Too Many Requests — Rate limit exceeded. Please wait 1 minute before trying again.");
      }

      if (!response.ok) {
        throw new Error(data.detail || "Invalid credentials");
      }

      // Store in state
      setToken(data.access_token);
      setUser(data.user);

      // Store in localStorage
      localStorage.setItem("ecostay_token", data.access_token);
      localStorage.setItem("ecostay_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (email: string, password: string, fullName: string | null) => {
    setLoading(true);
    try {
      const response = await fetch(`${cleanApiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      // Automatically login after successful registration
      await login(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ecostay_token");
    localStorage.removeItem("ecostay_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        registerUser,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected Route Wrapper Component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted font-medium font-serif italic">Ascending to your sanctuary...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
