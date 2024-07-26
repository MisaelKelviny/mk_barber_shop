import { Professional } from "@barber/core";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Image from "next/image";
import Assessment from "../shared/Assessment";

export interface ProfessionalItemProps {
  professional: Professional;
}

export default function ProfessionalItem(
  props: Readonly<ProfessionalItemProps>
) {
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
          {props.professional.description}
        </span>

        <div className="flex gap-3 flex-wrap">
          <Assessment
            value={props.professional.assessment}
            quantity={props.professional.assessmentQuantity}
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
