"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  token: string | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signUp: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  signOut: () => void;
  signInWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
  );
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha ao fazer login");
      }

      const { access_token } = data;
      setToken(access_token);
      Cookies.set("auth_token", access_token, {
        expires: 1,
        secure: process.env.NODE_ENV === "production",
      });

      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: (error as Error).message };
    }
  };

  const signUp = async (fullName: string, email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha ao criar conta.");
      }

      return { success: true };
    } catch (error) {
      console.error("Erro no registro:", error);
      return { success: false, message: (error as Error).message };
    }
  };

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (
          event === "SIGNED_IN" &&
          session &&
          session.user?.app_metadata?.provider === "google"
        ) {
          // Usar diretamente o token do Supabase para Google Auth
          const supabaseToken = session.access_token;

          setToken(supabaseToken);
          Cookies.set("auth_token", supabaseToken, {
            expires: 1,
            secure: process.env.NODE_ENV === "production",
          });

          router.push("/dashboard");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setToken(null);
    Cookies.remove("auth_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, signIn, signUp, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
