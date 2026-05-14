import { bool } from "joi";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  token: any
  isAuthenticated: boolean;
  register: (firstname: string, lastname: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//To do
//Extract user type from retrieved user, if authenticated make a call to profile context and add profile


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (cookie exists)
    fetch("/api/users/authJWT", {
      credentials: "include",
    })
      .then((res) => {
        setIsAuthenticated(res.ok);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const register = async (firstname, lastname, username, password) => {
    try {
      let data = {firstname:  firstname, lastname: lastname, username: username, password: password};
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/onboarding", { replace: true });
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (username, password) => {
    try {
      let data = {username: username, password: password};
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setIsAuthenticated(res.ok)
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  
  const logout = async () => {
    await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
    });
  };

  return <AuthContext.Provider value={{token, isAuthenticated, register, login, logout}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
