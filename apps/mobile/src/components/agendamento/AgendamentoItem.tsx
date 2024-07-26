import { Agendamento } from "@barba/core";
import { StyleSheet, Text, View } from "react-native";

interface AgendamentoItemProps {
  schedule: Agendamento;
}

export default function AgendamentoItem(props: AgendamentoItemProps) {
  const cor =
    new Date(props.schedule.data).getTime() > Date.now()
      ? "#007aff"
      : "#AAAAAA";

  function formatarData(data: Date) {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      return "";
    }

    return data.toLocaleDateString("pt-BR", {
      dateStyle: "long",
    });
  }

  function formatarHorario(data: Date) {
    if (!(data instanceof Date) || isNaN(data.getTime())) {
      return "";
    }
    return ` às ${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}h`;
  }

  function somarTotalServicos() {
    return props.schedule.services.reduce(
      (acc, servico) => acc + servico.preco,
      0
    );
  }

  function renderizarServicos() {
    return props.schedule.services.reduce((acc, servico, index) => {
      return `${acc}${index + 1}. ${servico.name}${index < props.schedule.services.length - 1 ? ", " : ""}`;
    }, "");
  }

  return (
    <View style={{ ...styles.cartao, borderColor: cor }}>
      <Text style={{ ...styles.nomeProfissional }}>
        {props.schedule.professional.name
          ? props.schedule.professional.name
          : "Não informado"}
      </Text>
      <Text style={{ ...styles.data, color: cor }}>
        {props.schedule.data && formatarData(new Date(props.schedule.data))}
        {props.schedule.data && formatarHorario(new Date(props.schedule.data))}
      </Text>
      <Text style={styles.services}>{renderizarServicos()}</Text>
      <Text style={styles.preco}>{`R$ ${somarTotalServicos()},00`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    paddingLeft: 35,
    borderRadius: 8,
    margin: 8,
    borderWidth: 0.5,
    borderRightWidth: 10,
    minWidth: "90%",
  },
  nomeProfissional: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  data: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  services: {
    fontSize: 12,
    color: "#ffffff",
    marginBottom: 8,
  },
  preco: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
