import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { editarPreguntaAPI, obtenerPreguntaAPI } from "../helpers/queries";
import { useNavigation, useRoute } from "@react-navigation/native";
import MainLayout from "../components/common/MainLayout";
import { showMessage } from "react-native-flash-message";

const niveles = [
  { label: "", value: "" },
  { label: "Uno", value: "1" },
  { label: "Dos", value: "2" },
  { label: "Tres", value: "3" },
  { label: "Cuatro", value: "4" },
  { label: "Cinco", value: "5" },
  { label: "Seis", value: "6" },
  { label: "Siete", value: "7" },
  { label: "Ocho", value: "8" },
  { label: "Nueve", value: "9" },
  { label: "Diez", value: "10" },
];

const buttonColor = "#2c3e50";

const Editar = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    const cargarDatosPregunta = async () => {
      try {
        const preguntaEncontrada = await obtenerPreguntaAPI(id);
        reset({
          pregunta: preguntaEncontrada.pregunta,
          opcionUno: preguntaEncontrada.opcionUno,
          opcionDos: preguntaEncontrada.opcionDos,
          opcionTres: preguntaEncontrada.opcionTres,
          opcionCorrecta: preguntaEncontrada.opcionCorrecta,
          nivel: preguntaEncontrada.nivel,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      cargarDatosPregunta();
    }
  }, [id, reset]);

  const editarPregunta = async (data) => {
    try {
      const respuesta = await editarPreguntaAPI(data, id);
      if (respuesta.status === 200) {
        showMessage({
          message: "Éxito",
          description: `Pregunta editada`,
          type: "success",
          icon: "success",
        });
        navigation.navigate("Preguntas");
        reset();
      } else {
        showMessage({
          message: "Error",
          description: `La pregunta no pudo ser editada`,
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      showMessage({
        message: "Error",
        description: `Ocurrió un error inesperado`,
        type: "danger",
        icon: "danger",
      });
      Alert.alert("Error", "Ocurrió un error inesperado");
      console.error(error);
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
          <Text style={styles.title}>EDITAR</Text>
          <Text style={styles.subtitle}>Editar la pregunta</Text>

          <Text style={styles.label}>Nivel</Text>
          <Controller
            control={control}
            name="nivel"
            rules={{ required: "Seleccione un nivel" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#007bff"
                >
                  {niveles.map((nivel) => (
                    <Picker.Item
                      key={nivel.value}
                      label={nivel.label}
                      value={nivel.value}
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
            name="pregunta"
            rules={{
              required: "La pregunta es obligatoria",
              minLength: {
                value: 5,
                message: "Debe tener mínimo 5 caracteres",
              },
              maxLength: {
                value: 150,
                message: "Debe tener máximo 150 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ingrese una pregunta"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.pregunta && (
            <Text style={styles.errorText}>{errors.pregunta.message}</Text>
          )}
          {["opcionUno", "opcionDos", "opcionTres", "opcionCorrecta"].map(
            (campo, i) => (
              <View key={campo}>
                <Text style={styles.label}>
                  {campo === "opcionCorrecta"
                    ? "Opción Correcta"
                    : `Opción ${i + 1}`}
                </Text>
                <Controller
                  control={control}
                  name={campo}
                  rules={{
                    required: "La opción es obligatoria",
                    minLength: {
                      value: 1,
                      message: "Debe tener mínimo 1 caracter",
                    },
                    maxLength: {
                      value: 100,
                      message: "Debe tener máximo 100 caracteres",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder={
                        campo === "opcionCorrecta"
                          ? "Opción correcta"
                          : `Opción ${i + 1}`
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                {errors[campo] && (
                  <Text style={styles.errorText}>{errors[campo]?.message}</Text>
                )}
              </View>
            )
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(editarPregunta)}
          >
            <Text style={styles.buttonText}>Guardar</Text>
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

export default Editar;
