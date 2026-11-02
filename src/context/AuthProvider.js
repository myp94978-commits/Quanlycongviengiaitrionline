"use client";
import { createContext, useState, useEffect } from "react";
import { me } from "@/services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsUserLoading(false);
        return;
      }

      const savedUser = localStorage.getItem("user");
      if (savedUser && savedUser !== "undefined") {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.warn("Invalid saved user JSON", error);
        }
      }

      try {
        const response = await me();
        const freshUser =
          response?.data?.user || response?.user || response?.data || response;

        if (freshUser) {
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        }
      } catch (error) {
        // Only log if it's not a token-related error (401/Invalid token)
        const status = error?.response?.status || error?.status;
        const errorMessage = error?.response?.data?.message || error?.message;
        
        if (status === 401 || errorMessage?.includes('token')) {
          // Token is invalid/expired, clear it silently
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        } else {
          // Log other unexpected errors
          console.error("AuthProvider: cannot refresh user profile", error);
        }
      } finally {
        setIsUserLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
