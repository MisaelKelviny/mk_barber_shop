"use client";
import DateInput from "@/components/schedules/DateInput";
import ProfessionalInput from "@/components/schedules/ProfessionalInput";
import ServicesInput from "@/components/schedules/ServicesInput";
import Summary from "@/components/schedules/Summary";
import Headers from "@/components/shared/Headers";
import Steps from "@/components/shared/Steps";
import useSchedule from "@/data/hooks/useSchedule";
import { Professional, Service } from "@barber/core";
import { useState } from "react";

export default function PageSchedule() {
  const [allowNextStep, setAllowNextStep] = useState<boolean>(false);
  const {
    professional,
    services,
    date,
    selectProfessional,
    selectServices,
    selectDate,
    slotsQuantity,
  } = useSchedule();

  function professionalChange(professional: Professional) {
    selectProfessional(professional);
    setAllowNextStep(!!professional);
  }

  function serviceChange(services: Service[]) {
    selectServices(services);
    setAllowNextStep(services.length > 0);
  }

  function dateChange(data: Date) {
    selectDate(data);

    const temData = data;
    const horaValida = data.getHours() >= 8 && data.getHours() <= 21;
    setAllowNextStep(temData && horaValida);
  }

  return (
    <div className="flex flex-col bg-zinc-900">
      <Headers
        title="Agendamento de Serviços"
        description="Seja atendido exatamente no horário marcado."
      />
      <div
        className="
                    container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10
                "
      >
        <Steps
          allowNextStep={allowNextStep}
          allowNextStepChange={setAllowNextStep}
          labels={[
            "Selecione o professional",
            "Informe os serviços",
            "Escolha o horário",
          ]}
        >
          <ProfessionalInput
            professional={professional}
            professionalChange={professionalChange}
          />
          <ServicesInput services={services} servicesChange={serviceChange} />
          <DateInput
            date={date}
            dateChange={dateChange}
            slotsQuantity={slotsQuantity()}
          />
        </Steps>
        <Summary />
      </div>
    </div>
  );
}
