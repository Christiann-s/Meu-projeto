// app/profile.js
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

// ⚠️ Troque pelo IP e porta corretos da sua API
const API_URL = "http://192.168.18.235:3000";

// MOCK de usuários caso a API não esteja disponível
const MOCK_USERS = [
  { id: 1, email: "christian.siqueira23@gmail.com", name: "Erlen Christian", photoUrl: "/img/joao.png" },
  { id: 2, email: "julie.seibert2@gmail.com", name: "Julie Seibert", photoUrl: "/img/maria.png" },
  { id: 3, email: "kadys_@hotmail.com", name: "Deise Seibert", photoUrl: "/img/kadys.png" },
];

export default function ProfileScreen() {
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const [allUsers, setAllUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${API_URL}/users`);
        let data;

        if (response.ok) {
          data = await response.json();
        } else {
          console.warn("Falha na API. Usando dados MOCKADOS.");
          data = MOCK_USERS;
        }

        setAllUsers(data);

        const current = data.find((u) => u.email === email);
        if (current) {
          setLoggedUser(current);
        } else {
          setError("Usuário logado não encontrado na lista.");
        }
      } catch (e) {
        console.error("Erro ao carregar usuários:", e);
        const current = MOCK_USERS.find((u) => u.email === email);
        if (current) {
          setLoggedUser(current);
          setAllUsers(MOCK_USERS);
        } else {
          setError("Erro de rede. Usuário não encontrado nem no mock.");
        }
      } finally {
        setLoading(false);
      }
    }

    if (email) {
      loadUsers();
    } else {
      setLoading(false);
      setError("E-mail não fornecido para busca.");
    }
  }, [email]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2ECC71" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {/* Usuário logado */}
      <View style={[styles.loggedBox, styles.loggedBoxCentered]}>
        {loggedUser?.photoUrl ? (
          <Image
            source={{ uri: `${API_URL}${loggedUser.photoUrl}` }}
            style={styles.avatarLogged}
          />
        ) : (
          <View style={styles.avatarPlaceholderLogged}>
            <Text style={styles.avatarText}>{loggedUser?.name?.[0] || "U"}</Text>
          </View>
        )}
        <Text style={styles.subtitle}>Você está logado como:</Text>
        <Text style={styles.userNameLogged}>{loggedUser?.name}</Text>
        <Text style={styles.email}>{loggedUser?.email}</Text>
      </View>

      {/* Botão de agendamento */}
      <TouchableOpacity
        style={styles.btnAgendar}
        onPress={() => router.push("/agendamento")}
      >
        <Text style={styles.btnAgendarText}>Agendar Coleta</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Todos os Usuários</Text>
      {allUsers.map((user) => (
        <View key={user.id} style={styles.userCard}>
          {user.photoUrl ? (
            <Image
              source={{ uri: `${API_URL}${user.photoUrl}` }}
              style={styles.avatarSmall}
            />
          ) : (
            <View style={styles.avatarPlaceholderSmall}>
              <Text style={styles.avatarTextSmall}>{user.name?.[0] || "U"}</Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f8ff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 28, fontWeight: "bold", color: "#2ECC71", marginBottom: 20, textAlign: "center" },

  loggedBoxCentered: { alignItems: "center", justifyContent: "center" },
  loggedBox: { padding: 15, backgroundColor: "#d7fbe8", borderRadius: 10, marginBottom: 20 },

  subtitle: { fontSize: 16, fontWeight: "600", color: "#3498DB", marginBottom: 5 },
  userNameLogged: { fontSize: 22, fontWeight: "800", color: "#34495E", marginBottom: 5 },
  email: { fontSize: 18, color: "#555" },

  avatarLogged: { width: 100, height: 100, borderRadius: 50, marginBottom: 10, borderWidth: 3, borderColor: "#2ECC71" },
  avatarPlaceholderLogged: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#ddd", justifyContent: "center", alignItems: "center",
    marginBottom: 10, borderWidth: 3, borderColor: "#2ECC71"
  },
  avatarText: { fontSize: 40, color: "#777" },

  btnAgendar: {
    backgroundColor: "#FF7F50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  btnAgendarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  listTitle: { fontSize: 20, fontWeight: "600", marginBottom: 10, color: "#333" },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarSmall: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  avatarPlaceholderSmall: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: "#ddd",
    justifyContent: "center", alignItems: "center", marginRight: 10
  },
  avatarTextSmall: { fontSize: 20, color: "#777" },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#2ECC71" },

  errorText: { color: "red", fontSize: 16, textAlign: "center" },
});
