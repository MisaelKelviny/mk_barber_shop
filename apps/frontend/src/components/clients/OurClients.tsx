import { clients } from "@barber/core";
import Title from "../shared/Title";
import { LayoutGrid } from "../ui/layout-grid";
import ClientItem from "./ClientItem";

export default function OurClients() {
  const classes = [
    "md:col-span-2",
    "col-span-1",
    "col-span-1",
    "md:col-span-2",
  ];
  const cards = clients.map((client, i) => {
    return {
      id: client.id,
      content: <ClientItem name={client.name} comments={client.comments} />,
      className: classes[i],
      thumbnail: client.imagemURL,
    };
  });

  return (
    <div className="container flex flex-col items-center gap-16">
      <Title
        tag="Clientes"
        principal="Quem Manda Aqui"
        secondary="Nossos clientes são os chefes! Aqui, eles mandam, desmandam e ainda saem com estilo de rockstar!"
      />
      <div className="h-[900px] w-full">
        <LayoutGrid cards={cards} />
      </div>
    </div>
  );
}
