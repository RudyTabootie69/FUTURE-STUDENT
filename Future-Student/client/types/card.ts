// THIS MUST BE DELETED AND REPLACED WITH STRIPE BEFORE LAUNCH!!!

export type CardBrand = "Visa" | "Mastercard" | "AmEx" | "Card";

export function detectBrand(cardNumber: string): CardBrand {
  const n = cardNumber.replace(/\s+/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^(34|37)/.test(n)) return "AmEx";
  if (/^5[1-5]/.test(n)) return "Mastercard";
  return "Card";
}

export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
