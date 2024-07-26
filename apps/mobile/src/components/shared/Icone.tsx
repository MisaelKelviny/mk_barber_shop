import { Ionicons } from "@expo/vector-icons";

export interface IconeProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  tamanho?: number;
}

export default function Icone(props: IconeProps) {
  return <Ionicons name={props.name} size={props.tamanho ?? 28} {...props} />;
}
