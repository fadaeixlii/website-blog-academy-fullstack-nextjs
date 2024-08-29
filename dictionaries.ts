// server-only enforces server-side code execution
import "server-only";

const dictionaries = {
  en: () => import("./locale/en/common.json").then((module) => module.default),
  fa: () => import("./locale/fa/common.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "fa") =>
  dictionaries[locale]?.() ?? dictionaries.en();
