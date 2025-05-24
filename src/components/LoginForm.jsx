import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import MainLayout from "./common/MainLayout";
import { showMessage } from "react-native-flash-message";

const buttonColor = "#2c3e50"; // El mismo color oscuro que Login

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError("");
    if (!name || !password) {
      setError("Nombre y contraseña son requeridos");
      return;
    }

    const res = await login({ name, password });

    // if (res.success) {
    //   Alert.alert("Éxito", "Bienvenido!", [
    //     { text: "OK", onPress: () => navigation.navigate("Inicio") },
    //   ]);
    // } else {
    //   setError(res.message || "Error desconocido al iniciar sesión");
    //   console.error("Error de login:", res.message);
    //   Alert.alert(
    //     "Error",
    //     res.message || "Error desconocido al iniciar sesión"
    //   );
    // }
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Ingresa tu nombre"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Ingresa tu contraseña"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: buttonColor,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 12,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 24,
    backgroundColor: buttonColor,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default LoginForm;
