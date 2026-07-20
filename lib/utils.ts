import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formats a large number with a thousands separator, e.g. 12,480 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}
