"use client";
import ProfessionalItem from "@/components/professional/ProfessionalItem";
import { Professional } from "@barber/core";
import { useProfissionais } from "@barber/ui";
import Title from "../shared/Title";

export default function OurProfessionals() {
  const { professionals } = useProfissionais();

  return (
    <div className="container flex flex-col items-center gap-y-16">
      <Title
        tag="Time"
        principal="Nossos Brutos"
        secondary="Só os mais brabos estão aqui! Temos o orgulho de ter o time mais qualificado do Brasil!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {professionals.map((professional: Professional) => (
          <ProfessionalItem key={professional.id} professional={professional} />
        ))}
      </div>
    </div>
  );
}
