"use client";
import useUsers from "@/data/hooks/useUsers";
import { usePathname, useRouter } from "next/navigation";

export default function ForceUsers(props: any) {
  const { loading, user } = useUsers();
  const path = usePathname();
  const router = useRouter();

  function redirectTo(url: string) {
    router.push(url);
    return (
      <div className="flex justify-center items-center h-screen">
        Direcionando...
      </div>
    );
  }

  if (!user?.email && loading) return <div>Carregando...</div>;
  if (!user?.email) return redirectTo(`/entrar?destino=${path}`);

  return props.children;
}
