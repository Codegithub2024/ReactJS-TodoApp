export type Category = "matin" | "midi" | "soir" | "";
export type status = "complet" | "incomplet" | "tout";

export const categories: Category[] = ["matin", "midi", "soir"];
export const statuses: status[] = ["tout", "complet", "incomplet"];

export interface Todo {
  id: string;
  text: string;
  category: Category;
  complete: boolean;
}
