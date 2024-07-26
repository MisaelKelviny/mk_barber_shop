"use client";
import DataInput from "@/components/schedule/DataInput";
import ProfissionalInput from "@/components/schedule/ProfissionalInput";
import ServicosInput from "@/components/schedule/ServicosInput";
import Sumario from "@/components/schedule/Sumario";
import Cabecalho from "@/components/shared/Cabecalho";
import Passos from "@/components/shared/Passos";
import useAgendamento from "@/data/hooks/useAgendamento";
import { Profissional, Servico } from "@barba/core";
import { useState } from "react";

export default function PaginaAgendamento() {
  const [permiteProximoPasso, setPermiteProximoPasso] =
    useState<boolean>(false);
  const {
    professional,
    services,
    data,
    selecionarProfissional,
    selecionarServicos,
    selecionarData,
    quantidadeDeSlots,
  } = useAgendamento();

  function profissionalMudou(professional: Profissional) {
    selecionarProfissional(professional);
    setPermiteProximoPasso(!!professional);
  }

  function servicosMudou(services: Servico[]) {
    selecionarServicos(services);
    setPermiteProximoPasso(services.length > 0);
  }

  function dataMudou(data: Date) {
    selecionarData(data);

    const temData = data;
    const horaValida = data.getHours() >= 8 && data.getHours() <= 21;
    setPermiteProximoPasso(temData && horaValida);
  }

  return (
    <div className="flex flex-col bg-zinc-900">
      <Cabecalho
        titulo="Agendamento de Serviços"
        descricao="Seja atendido exatamente no horário marcado."
      />
      <div
        className="
                    container flex flex-col lg:flex-row 
                    items-center lg:items-start lg:justify-around 
                    gap-10 lg:gap-0 py-10
                "
      >
        <Passos
          permiteProximoPasso={permiteProximoPasso}
          permiteProximoPassoMudou={setPermiteProximoPasso}
          labels={[
            "Selecione o professional",
            "Informe os serviços",
            "Escolha o horário",
          ]}
        >
          <ProfissionalInput
            professional={professional}
            profissionalMudou={profissionalMudou}
          />
          <ServicosInput services={services} servicosMudou={servicosMudou} />
          <DataInput
            data={data}
            dataMudou={dataMudou}
            quantidadeDeSlots={quantidadeDeSlots()}
          />
        </Passos>
        <Sumario />
      </div>
    </div>
  );
}
