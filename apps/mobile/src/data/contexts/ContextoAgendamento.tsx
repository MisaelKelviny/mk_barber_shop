import { DataUtils, Profissional, Servico } from "@barber/core";
import { createContext, useCallback, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import useUsuario from "../hooks/useUsuario";

interface ContextoAgendamentoProps {
  professional: Profissional | null;
  services: Servico[];
  data: Date;
  horariosOcupados: string[];
  duracaoTotal(): string;
  precoTotal(): number;
  quantidadeDeSlots(): number;
  selecionarProfissional(professional: Profissional): void;
  selecionarServicos(services: Servico[]): void;
  selecionarData(data: Date): void;
  agendar(): Promise<void>;
}

export const ContextoAgendamento = createContext(
  {} as ContextoAgendamentoProps
);

export function ProvedorAgendamento({
  children,
}: {
  children: React.ReactNode;
}) {
  const [professional, setProfissional] = useState<Profissional | null>(null);
  const [services, setServicos] = useState<Servico[]>([]);
  const [data, setData] = useState<Date>(DataUtils.hoje());

  const { usuario } = useUsuario();
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const { httpGet, httpPost } = useAPI();

  function selecionarProfissional(professional: Profissional) {
    setProfissional(professional);
  }

  function selecionarServicos(services: Servico[]) {
    setServicos(services);
  }

  function duracaoTotal() {
    const duracao = services.reduce((acc, atual) => {
      return (acc += atual.qtdeSlots * 15);
    }, 0);

    return `${Math.trunc(duracao / 60)}h ${duracao % 60}m`;
  }

  function precoTotal() {
    return services.reduce((acc, atual) => {
      return (acc += atual.preco);
    }, 0);
  }

  const selecionarData = useCallback(function (hora: Date) {
    setData(hora);
  }, []);

  function quantidadeDeSlots() {
    const totalDeSlots = services.reduce((acc, servico) => {
      return (acc += servico.qtdeSlots);
    }, 0);

    return totalDeSlots;
  }

  async function agendar() {
    if (!usuario?.email) return;

    await httpPost("agendamentos", {
      clientEmail: usuario.email,
      data: data!,
      professional: professional!,
      services: services,
    });

    limpar();
  }

  function limpar() {
    setData(DataUtils.hoje());
    setHorariosOcupados([]);
    setProfissional(null);
    setServicos([]);
  }

  const obterHorariosOcupados = useCallback(
    async function (data: Date, professional: Profissional): Promise<string[]> {
      try {
        if (!data || !professional) return [];
        const dtString = data.toISOString().slice(0, 10);
        const ocupacao = await httpGet(
          `agendamentos/ocupacao/${professional!.id}/${dtString}`
        );
        return ocupacao ?? [];
      } catch (e) {
        return [];
      }
    },
    [httpGet]
  );

  useEffect(() => {
    if (!data || !professional) return;
    obterHorariosOcupados(data, professional).then(setHorariosOcupados);
  }, [data, professional, obterHorariosOcupados]);

  return (
    <ContextoAgendamento.Provider
      value={{
        data,
        professional,
        services,
        horariosOcupados,
        duracaoTotal,
        precoTotal,
        selecionarData,
        selecionarProfissional,
        quantidadeDeSlots,
        selecionarServicos,
        agendar,
      }}
    >
      {children}
    </ContextoAgendamento.Provider>
  );
}
