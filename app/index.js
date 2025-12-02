import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!email || !senha) {
      setError("Preencha email e senha");
      return;
    }

    router.push(`/profile?email=${encodeURIComponent(email)}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>App Eco Coleta</Text>
      <Text style={styles.welcome}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue + "20",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primaryGreen,
    marginBottom: 10,
    textAlign: "center",
  },
  welcome: {
    fontSize: 24,
    color: colors.primaryBlue,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  btnLogin: {
    width: "80%",
    backgroundColor: colors.secondaryOrange,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },
});
