"use client";
import FormUser from "@/components/user/FormUser";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FormUser />
    </Suspense>
  );
}
