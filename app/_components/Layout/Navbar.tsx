"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { LogoIcon } from "../Icons";
import { ModeToggle } from "../mode-toggle";
import { buttonVariants } from "../ui/button";

import Image from "next/image";
import { ILangParams } from "@/types/global";
import { getDictionary } from "@/dictionaries";
import { useParams } from "next/navigation";
import { LanguageToggle } from "../language-toggle";
import { NavbarProfile } from "../NavbarProfile";
import { Profile } from "../Profile";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];
interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  const { lang } = useParams();
  const dict = getDictionary(lang as "en" | "fa");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <Image
                alt="intex logo"
                src={"/svg/FooterLogoIntex.svg"}
                width={300}
                height={100}
                className="hidden dark:inline w-20"
              />
              <Image
                alt="intex logo"
                src={"/svg/FooterLogoIntexDark.svg"}
                width={300}
                height={100}
                className="inline dark:hidden w-20"
              />
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <NavbarProfile />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                ></Menu>
              </SheetTrigger>

              <SheetContent side={"left"} className="h-full flex flex-col">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    {dict.IntEx}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4 ">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <div
                  className="w-full flex items-center justify-center gap-4 mt-auto justify-self-end"
                  dir="ltr"
                >
                  <LanguageToggle />
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <LanguageToggle />
            <ModeToggle />
            <NavbarProfile />
            <Profile />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
