"use client";

import useUsers from "@/data/hooks/useUsers";
import Link from "next/link";
import Logo from "./Logo";
import MenuUser from "./MenuUser";

export default function MenuSuperior() {
  const { user } = useUsers();

  return (
    <header className="self-stretch flex justify-center items-center h-24 bg-black/60">
      <nav className="flex items-center justify-between container">
        <Logo />
        <div>
          {user ? <MenuUser user={user} /> : <Link href="/entrar">Entrar</Link>}
        </div>
      </nav>
    </header>
  );
}
