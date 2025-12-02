import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { colors } from "@constants/colors";

export default function Agendamento() {
  const router = useRouter();

  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showData, setShowData] = useState(false);
  const [showHora, setShowHora] = useState(false);

  const onChangeData = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowData(Platform.OS === 'ios');
    setData(currentDate);
  };

  const onChangeHora = (event, selectedTime) => {
    const currentTime = selectedTime || hora;
    setShowHora(Platform.OS === 'ios');
    setHora(currentTime);
  };

  const dataFormatada = data.toLocaleDateString('pt-BR');
  const horaFormatada = hora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>

      {/* BOTÃO FECHAR */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.closeButtonText}>✕ Fechar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Agendar Coleta</Text>

      <Text style={styles.label}>Data Selecionada:</Text>
      <TouchableOpacity onPress={() => setShowData(true)} style={styles.input}>
        <Text style={styles.inputText}>{dataFormatada}</Text>
      </TouchableOpacity>
      {showData && (
        <DateTimePicker
          testID="datePicker"
          value={data}
          mode="date"
          display="default"
          onChange={onChangeData}
        />
      )}

      <Text style={styles.label}>Hora Selecionada:</Text>
      <TouchableOpacity onPress={() => setShowHora(true)} style={styles.input}>
        <Text style={styles.inputText}>{horaFormatada}</Text>
      </TouchableOpacity>
      {showHora && (
        <DateTimePicker
          testID="timePicker"
          value={hora}
          mode="time"
          display="default"
          onChange={onChangeHora}
        />
      )}

      <TouchableOpacity
        style={styles.btnConfirmar}
        onPress={() => alert(`Agendamento confirmado para ${dataFormatada} às ${horaFormatada}.`)}
      >
        <Text style={styles.btnConfirmarText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: colors.secondaryOrange,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primaryBlue,
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  inputText: {
    fontSize: 18,
    color: colors.darkGray,
  },
  btnConfirmar: {
    backgroundColor: colors.primaryGreen,
    padding: 15,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnConfirmarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
