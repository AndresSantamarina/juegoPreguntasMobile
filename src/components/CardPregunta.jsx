import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const CardPregunta = ({ pregunta, onSelectOption }) => {
  const [opciones, setOpciones] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [opcionIncorrectaSeleccionada, setOpcionIncorrectaSeleccionada] =
    useState(false);

  useEffect(() => {
    setOpciones(shuffleOptions());
    setOpcionSeleccionada(null);
    setOpcionIncorrectaSeleccionada(false);
  }, [pregunta]);

  const shuffleOptions = () => {
    const opcionesArray = [
      { text: pregunta.opcionUno, correcta: false },
      { text: pregunta.opcionDos, correcta: false },
      { text: pregunta.opcionTres, correcta: false },
      { text: pregunta.opcionCorrecta, correcta: true },
    ];
    return opcionesArray.sort(() => Math.random() - 0.5);
  };

  const handleSelectOption = (opcion) => {
    if (opcionSeleccionada === null) {
      setOpcionSeleccionada(opcion);
      onSelectOption(opcion);
      if (!opcion.correcta) {
        setOpcionIncorrectaSeleccionada(true);
      }
    }
  };

  const getOptionStyle = (opcion) => {
    if (opcionSeleccionada !== null) {
      if (opcion.correcta) {
        return [styles.optionContent, styles.optionCorrect];
      } else if (
        opcionIncorrectaSeleccionada &&
        opcion === opcionSeleccionada
      ) {
        return [styles.optionContent, styles.optionIncorrect];
      }
    }
    return styles.optionContent;
  };

  const getOptionTextStyle = (opcion) => {
    if (opcionSeleccionada !== null) {
      if (opcion.correcta) {
        return [styles.optionText, styles.optionTextCorrect];
      } else if (
        opcionIncorrectaSeleccionada &&
        opcion === opcionSeleccionada
      ) {
        return [styles.optionText, styles.optionTextIncorrect];
      }
    }
    return styles.optionText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{pregunta.pregunta}</Text>
      <View style={styles.optionsContainer}>
        {opciones.map((opcion, index) => (
          <TouchableOpacity
            key={opcion.text}
            style={getOptionStyle(opcion)}
            onPress={() => handleSelectOption(opcion)}
            disabled={opcionSeleccionada !== null}
            activeOpacity={0.7}
          >
            <Text style={getOptionTextStyle(opcion)}>
              <Text style={styles.optionIndex}>{index + 1}) </Text>
              {opcion.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

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
  optionContent: {
    backgroundColor: "#f0f4f8",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    minWidth: 150,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  optionCorrect: {
    backgroundColor: "#28a745",
  },
  optionIncorrect: {
    backgroundColor: "#dc3545",
  },
  optionText: {
    fontSize: 16,
    color: "#34495e",
    textAlign: "center",
  },
  optionTextCorrect: {
    color: "#fff",
    fontWeight: "700",
  },
  optionTextIncorrect: {
    color: "#fff",
    fontWeight: "700",
  },
  optionIndex: {
    fontWeight: "700",
    color: "#2980b9",
  },
});

export default CardPregunta;
