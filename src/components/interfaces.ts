export type Category = "matin" | "midi" | "soir" | "";
export type status = "completed" | "incomplete" | "all";

export const categories: Category[] = ["matin", "midi", "soir"];
export const statuses: status[] = ["all", "completed", "incomplete"];

export interface Todo {
  id: string;
  text: string;
  category: Category;
  complete: boolean;
}
