import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  eliminarPreguntaAPI,
  listarPreguntasPorNivelUsuario,
} from "../helpers/queries.js";
import { showMessage } from "react-native-flash-message";

const CardPreguntaEditDelete = ({ pregunta, setPreguntas, nivel }) => {
  const navigation = useNavigation();

  const borrarPregunta = () => {
    Alert.alert(
      "¿Estás seguro de eliminar la pregunta?",
      "No se puede revertir este proceso",
      [
        {
          text: "Salir",
          style: "cancel",
        },
        {
          text: "Borrar",
          style: "destructive",
          onPress: async () => {
            try {
              const respuesta = await eliminarPreguntaAPI(pregunta._id);
              showMessage({
                message: "Éxito",
                description: `Pregunta eliminada!`,
                type: "success",
                icon: "success",
              });

              const preguntasActualizadas =
                await listarPreguntasPorNivelUsuario(nivel);
              setPreguntas(preguntasActualizadas);
            } catch (error) {
              showMessage({
                message: "Error",
                description: `La pregunta no pudo ser eliminada`,
                type: "danger",
                icon: "danger",
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const screenWidth = Dimensions.get("window").width;
  const optionWidth = screenWidth / 2 - 30;

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{pregunta.pregunta}</Text>
      <View style={styles.optionsContainer}>
        {[
          pregunta.opcionUno,
          pregunta.opcionDos,
          pregunta.opcionTres,
          pregunta.opcionCorrecta,
        ].map((op, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.optionWrapper, { width: optionWidth }]}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>
              <Text style={styles.optionIndex}>{i + 1}- </Text>
              {op}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("Editar", { id: pregunta._id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={borrarPregunta}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  questionText: {
    fontWeight: "700",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 25,
    color: "#2c3e50",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  optionWrapper: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    minWidth: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#34495e",
    textAlign: "center",
  },
  optionIndex: {
    fontWeight: "700",
    color: "#2980b9",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginHorizontal: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  editButton: {
    backgroundColor: "#f39c12",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CardPreguntaEditDelete;
