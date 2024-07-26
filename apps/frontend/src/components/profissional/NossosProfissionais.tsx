"use client";
import ProfissionalItem from "@/components/professional/ProfissionalItem";
import Titulo from "@/components/shared/Titulo";
import { Profissional } from "@barba/core";
import { useProfissionais } from "@barba/ui";

export default function NossosProfissionais() {
  const { profissionais } = useProfissionais();

  return (
    <div className="container flex flex-col items-center gap-y-16">
      <Titulo
        tag="Time"
        principal="Nossos Brutos"
        secundario="Só os mais brabos estão aqui! Temos o orgulho de ter o time mais qualificado do Brasil!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {profissionais.map((professional: Profissional) => (
          <ProfissionalItem key={professional.id} professional={professional} />
        ))}
      </div>
    </div>
  );
}
