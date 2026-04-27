import { bool } from "joi";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStuProfile, useParentProfile, useStaffProfile } from "@/context/ProfileContext";

interface AuthContextValue {
  token: any
  user: any
  register: (any) => Promise<void>;
  login: (any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//To do
//Extract user type from retrieved user, if authenticated make a call to profile context and add profile


export const AuthProvider = ({ children }) => {
  const { stusave } = useStuProfile();
  const { parsave } = useParentProfile();
  const { staffsave } = useStaffProfile();
  const [selected, setSelected] = useState<string>("");
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const register = async (data) => {
    try {
      const response = await fetch("localhost:3000/users/:login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (data) => {
    try {
      const response = await fetch("localhost:3000/users/:login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/home");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };
  
  const logout = async () => {
    await fetch("localhost:3000/users/:logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
    });
  };

  return <AuthContext.Provider value={{token, user, register, login, logout}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
