import enCommon from "./locale/en/common.json";
import faCommon from "./locale/fa/common.json";

const dictionaries = {
  en: () => enCommon,
  fa: () => faCommon,
};

export const getDictionary = (locale: "en" | "fa") =>
  dictionaries[locale]?.() ?? dictionaries.en();
