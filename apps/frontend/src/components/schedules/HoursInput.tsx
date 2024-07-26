import useSchedule from "@/data/hooks/useSchedule";
import { cn } from "@/lib/utils";
import { DateUtils, ScheduleUtils } from "@barber/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

export interface HoursInputProps {
  date: Date;
  hoursQuantity: number;
  dateChange(data: Date): void;
}

export default function HoursInput(props: Readonly<HoursInputProps>) {
  const [hourHover, setHourHover] = useState<string | null>(null);
  const { busyHours } = useSchedule();
  const { afternoon, morning, night } = ScheduleUtils.dayTime();

  const selectedHours = props.date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function getPeriod(hour: string | null, quantity: number) {
    if (!hour) return [];
    const hours = morning.includes(hour)
      ? morning
      : afternoon.includes(hour)
        ? afternoon
        : night;
    const indice = hours.findIndex((h) => hour == h);
    return hours.slice(indice, indice + quantity);
  }

  function renderHours(hour: string) {
    const period = getPeriod(hourHover, props.hoursQuantity);
    const haveTime = period.length === props.hoursQuantity;
    const detachHour = haveTime && period.includes(hour);
    const selectedPeriod = getPeriod(selectedHours, props.hoursQuantity);
    const selected =
      selectedPeriod.length === props.hoursQuantity &&
      selectedPeriod.includes(hour);
    const notSelected = !haveTime && period.includes(hour);
    const blockedPeriod =
      period.includes(hour) && period.some((h) => busyHours.includes(h));
    const busy = busyHours.includes(hour);

    return (
      <div
        key={hour}
        className={cn(
          "flex justify-center items-center cursor-pointer h-8 border border-zinc-800 rounded select-none",
          {
            "bg-yellow-400": detachHour,
            "bg-red-500": notSelected || blockedPeriod,
            "text-white bg-green-500": selected,
            "cursor-not-allowed bg-zinc-800": busy,
          }
        )}
        onMouseEnter={(_) => setHourHover(hour)}
        onMouseLeave={(_) => setHourHover(null)}
        onClick={() => {
          if (notSelected) return;
          if (busy || blockedPeriod) return;
          props.dateChange(DateUtils.applyHours(props.date, hour));
        }}
      >
        <span
          className={cn("text-sm text-zinc-400", {
            "text-black font-semibold": detachHour,
            "text-white font-semibold": selected,
            "text-zinc-400 font-semibold": busy,
          })}
        >
          {notSelected || blockedPeriod || busy ? (
            <IconX size={18} className="text-white" />
          ) : (
            hour
          )}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Horários Disponíveis
      </span>
      <div className="flex flex-col gap-3 select-none">
        <span className="text-xs uppercase text-zinc-400">Manhã</span>
        <div className="grid grid-cols-8 gap-1">{morning.map(renderHours)}</div>

        <span className="text-xs uppercase text-zinc-400">Tarde</span>
        <div className="grid grid-cols-8 gap-1">
          {afternoon.map(renderHours)}
        </div>

        <span className="text-xs uppercase text-zinc-400">Noite</span>
        <div className="grid grid-cols-8 gap-1">{night.map(renderHours)}</div>
      </div>
    </div>
  );
}
