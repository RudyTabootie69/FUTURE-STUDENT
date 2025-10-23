import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@/types/course";
import { courseId } from "@/types/course";

interface WishlistContextValue {
  wishlist: Course[];
  add: (c: Course) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "wishlistCourses";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Course[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishlist(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const value = useMemo<WishlistContextValue>(() => ({
    wishlist,
    add: (c: Course) =>
      setWishlist((prev) => (prev.find((p) => courseId(p) === courseId(c)) ? prev : [...prev, c])),
    remove: (id: string) => setWishlist((prev) => prev.filter((p) => courseId(p) !== id)),
    has: (id: string) => wishlist.some((p) => courseId(p) === id),
    clear: () => setWishlist([]),
  }), [wishlist]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
