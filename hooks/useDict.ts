import { getDictionary } from "@/dictionaries";
import { cookies } from "next/headers";

export const useDict = () => {
  const cookieStore = cookies();
  const language = (cookieStore.get("language")?.value as "fa" | "en") || "fa"; // Default language is 'fa'

  const dict = getDictionary(language);

  return dict;
};
