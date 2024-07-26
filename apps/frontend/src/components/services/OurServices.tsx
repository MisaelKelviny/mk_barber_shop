"use client";
import { Service } from "@barber/core";
import { useServicos } from "@barber/ui";
import { useRouter } from "next/navigation";
import Titulo from "../shared/Title";
import ServicoItem from "./ServiceItem";

export default function OurServices() {
  const router = useRouter();
  const { services } = useServicos();

  function startSchedule() {
    router.push("/agendamento");
  }

  return (
    <div className="flex flex-col gap-16">
      <Titulo
        tag="Serviços"
        principal="Do Classico ao Rock"
        secondary="Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som de rock pesado!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {services.map((service: Service) => (
          <ServicoItem
            key={service.id}
            service={service}
            onClick={startSchedule}
          />
        ))}
      </div>
    </div>
  );
}
