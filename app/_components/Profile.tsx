import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDict } from "@/hooks/useDict";
import { useDictClient } from "@/hooks/useDictClient";

import { LogIn, Shield, UserPlus } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import * as React from "react";

export interface IProfileProps {}

export function Profile(props: IProfileProps) {
  const { data } = useSession();
  const dict = useDictClient();
  console.log(data);

  if (!data)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"sm"} variant="outline" className="  ">
            {`${dict.Login} / ${dict.SignUp}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>{dict.}</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="rtl:flex-row-reverse">
            <LogIn className="mx-2 h-4 w-4" />
            <span>{dict.SignIn}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="rtl:flex-row-reverse">
            <UserPlus className="mx-2 h-4 w-4" />
            <span>{dict.SignUp}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="rtl:flex-row-reverse"
            onClick={() => signIn("google")}
          >
            <Shield className="mx-2 h-4 w-4" />
            <span>{"Google"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  return <div></div>;
}
