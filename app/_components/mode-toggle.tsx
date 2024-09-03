"use client"

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <ToggleGroup
      value={theme === "dark" ? "moon" : "sun"}
      variant={"outline"}
      type="single"
      className="!p-0.5 border  rounded-md h-fit my-auto"
    >
      <ToggleGroupItem
        value="sun"
        onClick={() => {
          setTheme("light");
        }}
        aria-label="Toggle sun"
        className="!p-0 aspect-square h-7 border-none"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="moon"
        onClick={() => {
          setTheme("dark");
        }}
        aria-label="Toggle moon"
        className="!p-0 aspect-square h-7 border-none"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
