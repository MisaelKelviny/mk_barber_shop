"use client";

import OurClients from "@/components/clients/OurClients";
import TitleSlogan from "@/components/landing/TitleSlogan";
import OurProfessionals from "@/components/professional/OurProferssionals";
import OurServices from "@/components/services/OurServices";
import BackgroundContainer from "@/components/shared/BackgroundContainer";

export default function Landing() {
  return (
    <div>
      <TitleSlogan />
      <BackgroundContainer image="/banners/services.webp">
        <OurServices />
      </BackgroundContainer>
      <BackgroundContainer image="/banners/profissionais.webp">
        <OurProfessionals />
      </BackgroundContainer>
      <BackgroundContainer image="/banners/clientes.webp">
        <OurClients />
      </BackgroundContainer>
    </div>
  );
}
