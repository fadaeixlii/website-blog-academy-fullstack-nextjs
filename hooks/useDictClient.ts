import { useState, useEffect } from "react";
import { getDictionary } from "@/dictionaries";
import { useLanguage } from "@/components/language-provider";

export const useDictClient = () => {
  const { language } = useLanguage();
  const [dict, setDict] = useState(getDictionary(language));

  useEffect(() => {
    setDict(getDictionary(language));
  }, [language]);

  return dict;
};
