import { useState, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import MainLayout from "./common/MainLayout";
import { showMessage } from "react-native-flash-message";

const buttonColor = "#2c3e50";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();

  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setError("");
  };

  const handleSubmit = async () => {
    const res = await register(formData);

    if (res.success) {
      showMessage({
        message: "Éxito",
        description: `Usuario creado correctamente`,
        type: "success",
        icon: "success",
      });
    } else {
      setError(res.message);

      showMessage({
        message: "Error",
        description: `No se pudo crear el usuario`,
        type: "danger",
        icon: "danger",
      });
    }
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Registrarse</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Juan Pérez"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="*******"
            value={formData.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear cuenta</Text>
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

export default Register;
