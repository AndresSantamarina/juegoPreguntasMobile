import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { crearPreguntaAPI } from "../helpers/queries";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/common/MainLayout";
import { showMessage } from "react-native-flash-message";

const buttonColor = "#2c3e50";

const Agregar = () => {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const crearPregunta = async (data) => {
    try {
      if (!user || !user.id) {
        throw new Error("Debes iniciar sesión para crear preguntas");
      }

      const preguntaConUsuario = {
        ...data,
        usuario: user.id,
      };

      await crearPreguntaAPI(preguntaConUsuario);

      showMessage({
        message: "Éxito",
        description: `Pregunta creada correctamente`,
        type: "success",
        icon: "success",
      });
      reset();
    } catch (error) {
      showMessage({
        message: "Error",
        description: `Error al crear la pregunta`,
        type: "danger",
        icon: "danger",
      });
      Alert.alert("Error", error.message || "Error al crear la pregunta");
    }
  };

  return (
    <MainLayout>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>AGREGAR</Text>
          <Text style={styles.subtitle}>Agregar preguntas</Text>
          <Text style={styles.label}>Nivel</Text>
          <Controller
            control={control}
            rules={{ required: "Seleccione un nivel" }}
            name="nivel"
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                  dropdownIconColor="#007bff"
                >
                  <Picker.Item label="" value="" />
                  {[...Array(10)].map((_, i) => (
                    <Picker.Item
                      key={i + 1}
                      label={`${i + 1}`}
                      value={`${i + 1}`}
                    />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.nivel && (
            <Text style={styles.errorText}>{errors.nivel.message}</Text>
          )}
          <Text style={styles.label}>Pregunta</Text>
          <Controller
            control={control}
            rules={{
              required: "La pregunta es obligatoria",
              minLength: {
                value: 5,
                message: "La pregunta debe tener como mínimo 5 caracteres",
              },
              maxLength: {
                value: 150,
                message: "La pregunta debe tener como máximo 150 caracteres",
              },
            }}
            name="pregunta"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ingrese una pregunta"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.pregunta && (
            <Text style={styles.errorText}>{errors.pregunta.message}</Text>
          )}
          <Text style={styles.label}>Opción 1</Text>
          <Controller
            control={control}
            rules={{
              required: "La opción es obligatoria",
              minLength: {
                value: 1,
                message: "La opción debe tener como mínimo 1 caracter",
              },
              maxLength: {
                value: 100,
                message: "La opción debe tener como máximo 100 caracteres",
              },
            }}
            name="opcionUno"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Opción uno"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.opcionUno && (
            <Text style={styles.errorText}>{errors.opcionUno.message}</Text>
          )}
          <Text style={styles.label}>Opción 2</Text>
          <Controller
            control={control}
            rules={{
              required: "La opción es obligatoria",
              minLength: {
                value: 1,
                message: "La opción debe tener como mínimo 1 caracter",
              },
              maxLength: {
                value: 100,
                message: "La opción debe tener como máximo 100 caracteres",
              },
            }}
            name="opcionDos"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Opción dos"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.opcionDos && (
            <Text style={styles.errorText}>{errors.opcionDos.message}</Text>
          )}
          <Text style={styles.label}>Opción 3</Text>
          <Controller
            control={control}
            rules={{
              required: "La opción es obligatoria",
              minLength: {
                value: 1,
                message: "La opción debe tener como mínimo 1 caracter",
              },
              maxLength: {
                value: 100,
                message: "La opción debe tener como máximo 100 caracteres",
              },
            }}
            name="opcionTres"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Opción tres"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.opcionTres && (
            <Text style={styles.errorText}>{errors.opcionTres.message}</Text>
          )}
          <Text style={styles.label}>Respuesta Correcta</Text>
          <Controller
            control={control}
            rules={{
              required: "La opción es obligatoria",
              minLength: {
                value: 1,
                message: "La opción debe tener como mínimo 1 caracter",
              },
              maxLength: {
                value: 100,
                message: "La opción debe tener como máximo 100 caracteres",
              },
            }}
            name="opcionCorrecta"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Respuesta correcta"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.opcionCorrecta && (
            <Text style={styles.errorText}>
              {errors.opcionCorrecta.message}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(crearPregunta)}
          >
            <Text style={styles.buttonText}>Agregar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: buttonColor,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    fontSize: 16,
    marginBottom: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 6,
    backgroundColor: "#f0f8ff",
    marginBottom: 10,
    justifyContent: "center",
    height: 44,
  },
  picker: {
    width: "100%",
    height: 50,
    color: "#2c3e50",
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
    marginTop: 14,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 13,
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

export default Agregar;
