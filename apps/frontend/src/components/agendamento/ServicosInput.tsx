import { Servico } from "@barba/core";
import { useServicos } from "@barba/ui";
import Image from "next/image";

export interface ServicosInputProps {
  services: Servico[];
  servicosMudou: (services: Servico[]) => void;
}

function Opcao(props: {
  servico: Servico;
  onClick: (s: Servico) => void;
  selecionado?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center cursor-pointer select-none border rounded-lg overflow-hidden 
            ${props.selecionado ? "border-green-400" : "border-zinc-700"}`}
      onClick={() => props.onClick(props.servico)}
    >
      <Image
        src={props.servico.imagemURL}
        alt={props.servico.name}
        width={150}
        height={120}
      />
      <div
        className={`
                    py-2 w-full h-full text-center text-xs
                    ${props.selecionado ? "text-black bg-green-400 font-semibold" : "text-zinc-400 font-light bg-zinc-900 "}
                `}
      >
        {props.servico.name}
      </div>
    </div>
  );
}

export default function ServicosInput(props: ServicosInputProps) {
  const { servicosMudou } = props;
  const { services: todosServicos } = useServicos();

  function alternarMarcacaoServico(servico: Servico) {
    const servicoSelecionado = props.services.find((s) => s.id === servico.id);
    servicosMudou(
      servicoSelecionado
        ? props.services.filter((s) => s.id !== servico.id)
        : [...props.services, servico]
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm uppercase text-zinc-400">
        Serviços Disponíveis
      </span>
      <div className="grid grid-cols-3 self-start gap-5">
        {todosServicos.map((servico) => (
          <Opcao
            key={servico.id}
            servico={servico}
            onClick={alternarMarcacaoServico}
            selecionado={props.services.some((serv) => serv.id === servico.id)}
          />
        ))}
      </div>
    </div>
  );
}
