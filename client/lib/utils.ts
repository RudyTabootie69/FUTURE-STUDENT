import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Home Utils

const MONTHS: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

function parseDMY(dateString?: string | null): Date | null {
  if (!dateString) return null;

  const [dd, mmm, yyyy] = dateString.split("-");
  const day = parseInt(dd || "", 10);
  const month = MONTHS[(mmm || "").toUpperCase()] ?? 0;
  const year = parseInt(yyyy || "", 10);

  const date = new Date(year, month, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getUpcomingDeadlines(wishlist: any[]) {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return wishlist.reduce((acc, course) => {
    const deadline = parseDMY(course?.closingDate);
    return deadline && deadline >= todayStart ? acc + 1 : acc;
  }, 0);
}
