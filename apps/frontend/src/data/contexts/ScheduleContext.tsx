import { DateUtils, Professional, Service } from "@barber/core";
import { createContext, useCallback, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI";
import useUsers from "../hooks/useUsers";

interface ScheduleContextProps {
  professional: Professional | null;
  services: Service[];
  date: Date;
  busyHours: string[];
  totalDuration(): string;
  totalPrice(): number;
  slotsQuantity(): number;
  selectProfessional(professional: Professional): void;
  selectServices(services: Service[]): void;
  selectDate(data: Date): void;
  schedule(): Promise<void>;
}

export const ScheduleContext = createContext({} as ScheduleContextProps);

export function ScheduleProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [date, setDate] = useState<Date>(DateUtils.today());

  const { user } = useUsers();
  const [busyHours, setBusyHours] = useState<string[]>([]);
  const { httpGet, httpPost } = useAPI();

  function selectProfessional(professional: Professional) {
    setProfessional(professional);
  }

  function selectServices(services: Service[]) {
    setServices(services);
  }

  function totalDuration() {
    const duration = services.reduce((acc, atual) => {
      return (acc += atual.slotsQuantity * 15);
    }, 0);

    return `${Math.trunc(duration / 60)}h ${duration % 60}m`;
  }

  function totalPrice() {
    return services.reduce((acc, atual) => {
      return (acc += atual.price);
    }, 0);
  }

  const selectDate = useCallback(function (hora: Date) {
    setDate(hora);
  }, []);

  function slotsQuantity() {
    const totalDeSlots = services.reduce((acc, servico) => {
      return (acc += servico.slotsQuantity);
    }, 0);

    return totalDeSlots;
  }

  async function schedule() {
    if (!user?.email) return;

    await httpPost("agendamentos", {
      emailClient: user.email,
      date: date,
      professional: professional!,
      services: services,
    });

    clean();
  }

  function clean() {
    setDate(DateUtils.today());
    setBusyHours([]);
    setProfessional(null);
    setServices([]);
  }

  const getBusyHours = useCallback(
    async function (date: Date, professional: Professional): Promise<string[]> {
      try {
        if (!date || !professional) return [];
        const dtString = date.toISOString().slice(0, 10);
        const ocupacao = await httpGet(
          `schedules/occupation/${professional.id}/${dtString}`
        );
        return ocupacao ?? [];
      } catch (e) {
        return [];
      }
    },
    [httpGet]
  );

  useEffect(() => {
    if (!date || !professional) return;
    getBusyHours(date, professional).then(setBusyHours);
  }, [date, professional, getBusyHours]);

  return (
    <ScheduleContext.Provider
      value={{
        date,
        professional,
        services,
        busyHours,
        totalDuration,
        totalPrice,
        selectDate,
        selectProfessional,
        slotsQuantity,
        selectServices,
        schedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}
