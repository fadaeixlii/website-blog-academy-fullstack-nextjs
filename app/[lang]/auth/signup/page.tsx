import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";
import { SignInForm } from "./SignInForm";
import { useDict } from "@/hooks/useDict";
import { ILangParams } from "@/types/global";
import { LanguageToggle } from "@/app/_components/language-toggle";
import { ModeToggle } from "@/app/_components/mode-toggle";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
interface AuthenticationPageProps extends ILangParams {}
export default function AuthenticationPage({
  params,
}: AuthenticationPageProps) {
  const dict = useDict();
  const { lang } = params;
  return (
    <>
      <div className="w-full h-[800px] mt-auto flex justify-center items-center">
        <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-4 ">
          <Link
            href={lang ? `/${lang}/auth/signup` : "/auth/signup"}
            className={cn(buttonVariants({ variant: "ghost" }), "")}
          >
            {dict.SignUp}
          </Link>
          <LanguageToggle />
          <ModeToggle />
        </div>

        <div className="lg:p-8 w-full">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {dict.CreateAnAccount}
              </h1>
              <p className="text-sm text-muted-foreground">
                {dict.EnterYourEmailBelowToCreateYourAccount}
              </p>
            </div>
            <SignInForm />
            <div className="whitespace-pre-wrap">
              <span className="text-neutral-600 dark:text-white text-[12px] font-normal   leading-tight">
                {dict.IHaveReadAndAgreeToIntEx}{" "}
              </span>
              <Link
                href={"/rules/info"}
                className="text-neutral-600 dark:text-white text-[12px] font-normal   underline leading-tight hover:text-primary-100"
              >
                {dict.TermsOfService}
              </Link>
              <span className="text-neutral-600 dark:text-white text-[12px] font-normal   leading-tight">
                {" "}
                {dict.And}{" "}
              </span>
              <Link
                href={"/privacy/info"}
                className="text-neutral-600 dark:text-white text-[12px] font-normal   underline leading-tight hover:text-primary-100"
              >
                {dict.PrivacyPolicy}.
              </Link>
              <span className="text-neutral-600 dark:text-white text-[12px] font-normal   leading-tight">
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
