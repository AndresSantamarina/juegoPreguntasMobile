import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  listarPreguntasPorNivelUsuario,
  obtenerNiveles,
} from "../helpers/queries";
import CardPreguntaEditDelete from "../components/CardPreguntaEditDelete";
import MainLayout from "../components/common/MainLayout";

const Preguntas = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const nivel = route.params?.nivel;

  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [mostrarLoader, setMostrarLoader] = useState(true);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(false);

  useEffect(() => {
    if (nivel) {
      listarPreguntas();
      setNivelSeleccionado(true);
    } else {
      setPreguntas([]);
      setNivelSeleccionado(false);
      setMostrarLoader(false);
    }
  }, [nivel]);

  useEffect(() => {
    cargarNiveles();
  }, []);

  const listarPreguntas = async () => {
    if (!nivel) return;

    try {
      setMostrarLoader(true);
      const respuesta = await listarPreguntasPorNivelUsuario(nivel);
      setPreguntas(respuesta);
    } catch (error) {
      console.error(error);
      setPreguntas([]);
    } finally {
      setMostrarLoader(false);
    }
  };

  const cargarNiveles = async () => {
    try {
      const respuesta = await obtenerNiveles();
      setNiveles(respuesta);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContenido = () => {
    if (mostrarLoader) {
      return (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 30 }}
        />
      );
    }

    if (!nivelSeleccionado) {
      return (
        <Text style={styles.mensaje}>Por favor, seleccione un nivel.</Text>
      );
    }

    if (preguntas.length === 0) {
      return (
        <Text style={styles.mensaje}>No hay preguntas en este nivel.</Text>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.preguntasContainer}>
        {preguntas.map((pregunta) => (
          <CardPreguntaEditDelete
            key={pregunta.id}
            pregunta={pregunta}
            setPreguntas={setPreguntas}
            nivel={nivel}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>LISTADO</Text>
        <Text style={styles.subtitle}>Editar o eliminar preguntas</Text>

        <View style={styles.nivelesContainer}>
          {niveles.map((nivelItem) => (
            <TouchableOpacity
              key={nivelItem}
              style={styles.nivelButton}
              onPress={() => {
                navigation.navigate("Preguntas", { nivel: nivelItem });
                setNivelSeleccionado(true);
              }}
            >
              <Text style={styles.nivelButtonText}>Nivel {nivelItem}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderContenido()}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color:"#2c3e50"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  nivelesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  nivelButton: {
    backgroundColor: "#2c3e50",
    margin: 8,
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
  nivelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  mensaje: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 30,
  },
  preguntasContainer: {
    width: "100%",
  },
});

export default Preguntas;
