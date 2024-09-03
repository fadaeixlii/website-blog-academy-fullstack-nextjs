"use client";

import { useLanguage } from "@/components/language-provider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IR, GB } from "country-flag-icons/react/3x2";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const { setLanguage, language } = useLanguage();

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChangeLanguage = (value: "en" | "fa") => {
    const newPath = pathname.replace(/\/(en|fa)/, `/${value}`);

    const updatedPath = pathname.match(/\/(en|fa)/)
      ? newPath
      : `/${value}${pathname}`;

    replace(updatedPath);

    setLanguage(value);
  };

  return (
    <ToggleGroup
      value={language === "fa" ? "fa" : "en"}
      variant={"outline"}
      type="single"
      className="!p-0.5 border  rounded-md h-fit my-auto"
    >
      <ToggleGroupItem
        value="fa"
        onClick={() => {
          handleChangeLanguage("fa");
        }}
        aria-label="Toggle fa"
        className="!p-0 aspect-square h-7 border-none"
      >
        <IR className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="en"
        onClick={() => {
          handleChangeLanguage("en");
        }}
        aria-label="Toggle en"
        className="!p-0 aspect-square h-7 border-none"
      >
        <GB className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
