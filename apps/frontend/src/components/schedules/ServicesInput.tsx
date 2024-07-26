import { Service } from "@barber/core";
import { useServicos } from "@barber/ui";
import Image from "next/image";

export interface ServicesInputProps {
  services: Service[];
  servicesChange: (services: Service[]) => void;
}

function Option(props: {
  service: Service;
  onClick: (s: Service) => void;
  selected?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden 
            ${props.selected ? "border-green-400" : "border-zinc-700"}`}
      onClick={() => props.onClick(props.service)}
    >
      <Image
        src={props.service.imageUrl}
        alt={props.service.name}
        width={150}
        height={120}
      />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.selected ? "text-black bg-green-400 font-semibold" : "text-zinc-400 font-light bg-zinc-900 "}
                `}
      >
        {props.service.name}
      </div>
    </div>
  );
}

export default function ServicesInput(props: Readonly<ServicesInputProps>) {
  const { servicesChange } = props;
  const { services: todosServicos } = useServicos();

  function alternarMarcacaoServico(service: Service) {
    const serviceSelected = props.services.find((s) => s.id === service.id);
    servicesChange(
      serviceSelected
        ? props.services.filter((s) => s.id !== service.id)
        : [...props.services, service]
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Serviços Disponíveis
      </span>
      <div className="grid grid-cols-3 self-start gap-5">
        {todosServicos.map((service) => (
          <Option
            key={service.id}
            service={service}
            onClick={alternarMarcacaoServico}
            selected={props.services.some((serv) => serv.id === service.id)}
          />
        ))}
      </div>
    </div>
  );
}
