import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from "expo-router";
// CORREÇÃO AQUI: Mudando 'colors' para 'Colors' para corresponder ao nome do arquivo
import { colors } from "@constants/colors";

export default function Locais() {
  const router = useRouter();

  const locais = [
    { id: "1", nome: "Posto Ambiental - Centro" },
    { id: "2", nome: "EcoPonto Zona Norte" },
    { id: "3", nome: "Unidade de Resíduos Perigosos - Sul" },
    { id: "4", nome: "Estação de Coleta Química - Oeste" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais de Coleta</Text>

      <FlatList
        data={locais}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // Usando uma cor do objeto 'colors' (ex: darkGray ou primaryBlue)
          <Text style={[styles.item, { color: colors.darkGray }]}>• {item.nome}</Text>
        )}
      />

      <Text style={styles.voltar} onPress={() => router.back()}>
        Voltar
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    // Esta linha estava correta, pois você exporta 'colors' (minúsculo)
    color: colors.primaryBlue,
    textAlign: "center",
    marginBottom: 20,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
  },
  voltar: {
    marginTop: 20,
    textAlign: "center",
    // Esta linha estava correta
    color: colors.primaryGreen,
    fontSize: 18,
    fontWeight: "bold",
  },
});