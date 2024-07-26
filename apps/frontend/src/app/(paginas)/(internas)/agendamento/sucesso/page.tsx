"use client";

import ScheduleWithSuccess from "@/components/schedules/ScheduleWithSuccess";
import Headers from "@/components/shared/Headers";

export default function PageSchedule() {
  return (
    <div className="flex flex-col bg-zinc-900">
      <Headers
        title="Agendamento de Serviços"
        description="Seu horário está garantido e será um prazer te atender!"
      />
      <div className="container flex flex-col justify-around items-center py-10 gap-1">
        <ScheduleWithSuccess />
      </div>
    </div>
  );
}
