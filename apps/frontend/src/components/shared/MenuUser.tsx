"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUsers from "@/data/hooks/useUsers";
import { User } from "@barber/core";
import Image from "next/image";

export interface MenuUserProps {
  user: User;
}

export default function MenuUser(props: MenuUserProps) {
  const { leave } = useUsers();

  return props.user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2 items-center">
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold leading-5">
              {props.user.name}
            </span>
            <span className="text-xs text-zinc-400">{props.user.email}</span>
          </div>
          <div className="flex justify-center items-center rounded-full overflow-hidden w-10 h-10 p-1 bg-zinc-700">
            <Image
              src="/avatar.png"
              width={40}
              height={40}
              alt={props.user.name}
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu Usuário</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={leave}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
}
