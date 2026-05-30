import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Profile, isStudent, isSecStaff, isParent, isTertStaff} from "@shared/types/user"
interface AuthContextValue {
  isAuthenticated: boolean;
  authLoading: boolean;
  register: (user: Profile, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  clearCookies: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

//To do
//Extract user type from retrieved user, if authenticated make a call to profile context and add profile


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in (cookie exists)
    fetch("/backend/users/authJWT", {
      credentials: "include",
    })
      .then((res) => {
        setIsAuthenticated(res.ok);
      })
      .catch(() => {setIsAuthenticated(false);})
      .finally(() => {
      setAuthLoading(false);
      })
  }, []);

  const register = async (user: Profile, userName, passWord) => {

      try {
      const response = await fetch("/backend/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: 
          JSON.stringify({"user": user, "username": userName, "password": passWord}), 
      });
      if (!response.ok) {
          const res = await response.json();
          throw new Error(res || "Request failed");
      }
      const res = await response.json();
      console.log(res)
      if (res.data) {
        navigate("/login");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const login = async (username, password) => {
    try {
      let data = {username: username, password: password};
      const response = await fetch("/backend/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.ok) {
        console.log(res.ok)
        setIsAuthenticated(res.ok)
        return;
      }
      throw new Error("No data" + res.ok);
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };
  
  const clearCookies = async () => {
    setIsAuthenticated(false);
    await fetch("/backend/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
    });
  };

  return <AuthContext.Provider value={{isAuthenticated, authLoading, register, login, clearCookies}}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
