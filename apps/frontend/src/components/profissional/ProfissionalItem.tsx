import { Profissional } from "@barba/core";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Image from "next/image";
import Avaliacao from "../shared/Avaliacao";

export interface ProfissionalItemProps {
  professional: Profissional;
}

export default function ProfissionalItem(props: ProfissionalItemProps) {
  return (
    <div
      className="
                flex flex-col items-center p-1
                bg-zinc-800 rounded-lg
            "
    >
      <div className="relative h-72 w-full">
        <Image
          src={props.professional.imageUrl}
          fill
          alt={props.professional.name}
          className="object-cover object-top rounded-t-lg"
        />
      </div>
      <div className="flex flex-col p-4 gap-5">
        <span className="text-2xl font-black">{props.professional.name}</span>
        <span className="text-sm text-zinc-400">
          {props.professional.descricao}
        </span>

        <div className="flex gap-3 flex-wrap">
          <Avaliacao
            valor={props.professional.assessment}
            quantidade={props.professional.assessmentQuantity}
          />
        </div>

        <div className="flex gap-3 text-zinc-300">
          <IconBrandYoutube stroke={1} />
          <IconBrandInstagram stroke={1} />
          <IconBrandX stroke={1} />
          <IconBrandLinkedin stroke={1} />
        </div>
      </div>
    </div>
  );
}
