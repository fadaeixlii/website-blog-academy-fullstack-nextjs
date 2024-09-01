import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IR, GB } from "country-flag-icons/react/3x2";
import { usePathname, useRouter } from "next/navigation";

export function LanguageToggle() {
  const { setLanguage } = useLanguage();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ghost">
          <IR className="h-[1.1rem] w-[1.2rem] ltr:hidden rtl:inline flex items-center justify-center" />
          <GB className=" h-[1.1rem] w-[1.2rem] rtl:hidden ltr:inline flex items-center justify-center" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleChangeLanguage("fa")}
          className="flex items-center gap-2"
        >
          <IR className="size-4 rounded-full object-cover" />
          فارسی
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChangeLanguage("en")}
          className="flex items-center gap-2"
        >
          <GB className="size-4 rounded-full object-cover" />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
