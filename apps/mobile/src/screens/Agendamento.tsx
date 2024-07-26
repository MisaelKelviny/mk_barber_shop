import { Profissional, Servico } from "@barba/core";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DataInput from "../components/schedule/DataInput";
import Passos from "../components/schedule/Passos";
import ProfissionalInput from "../components/schedule/ProfissionalInput";
import ServicosInput from "../components/schedule/ServicosInput";
import useAgendamento from "../data/hooks/useAgendamento";

export default function Agendamentos({ navigation }: any) {
  const [permiteProximoPasso, setPermiteProximoPasso] =
    useState<boolean>(false);
  const {
    professional,
    services,
    data,
    selecionarProfissional,
    selecionarServicos,
    selecionarData,
    quantidadeDeSlots,
  } = useAgendamento();

  function profissionalMudou(professional: Profissional) {
    selecionarProfissional(professional);
    setPermiteProximoPasso(!!professional);
  }

  function servicosMudou(services: Servico[]) {
    selecionarServicos(services);
    setPermiteProximoPasso(services.length > 0);
  }

  function dataMudou(data: Date) {
    selecionarData(data);

    const temData = data;
    const horaValida = data.getHours() >= 8 && data.getHours() <= 21;
    setPermiteProximoPasso(temData && horaValida);
  }

  return (
    <SafeAreaView style={{ ...styles.areaView }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Agende seu horário</Text>
          <Passos
            labels={["Profissional", "Serviços", "Horário"]}
            permiteProximoPasso={permiteProximoPasso}
            permiteProximoPassoMudou={setPermiteProximoPasso}
            finalizar={() => navigation.navigate("Sumario")}
          >
            <ProfissionalInput
              professional={professional}
              profissionalMudou={profissionalMudou}
            />
            <ServicosInput services={services} servicosMudou={servicosMudou} />
            <DataInput
              data={data}
              dataMudou={dataMudou}
              quantidadeDeSlots={quantidadeDeSlots()}
            />
          </Passos>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaView: {
    display: "flex",
    flex: 1,
    gap: 12,
    width: "100%",
    backgroundColor: "black",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "100%",
    marginBottom: 20,
  },
  titulo: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  imagemDeFundo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
