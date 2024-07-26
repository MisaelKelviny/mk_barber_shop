"use client";
import { Servico } from "@barber/core";
import { useServicos } from "@barber/ui";
import { useRouter } from "next/navigation";
import Titulo from "../shared/Titulo";
import ServicoItem from "./ServicoItem";

export default function NossosServicos() {
  const router = useRouter();
  const { services } = useServicos();

  function iniciarAgendamento() {
    router.push("/schedule");
  }

  return (
    <div className="flex flex-col gap-16">
      <Titulo
        tag="Serviços"
        principal="Do Classico ao Rock"
        secundario="Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som de rock pesado!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((servico: Servico) => (
          <ServicoItem
            key={servico.id}
            servico={servico}
            onClick={iniciarAgendamento}
          />
        ))}
      </div>
    </div>
  );
}
