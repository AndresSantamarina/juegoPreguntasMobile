import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import CardPregunta from "../components/CardPregunta";
import {
  listarPreguntasPorNivelUsuario,
  obtenerNiveles,
} from "../helpers/queries";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/common/MainLayout";

const Jugar = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { nivel: nivelParam } = route.params || {};
  const { user } = useAuth();

  const [preguntas, setPreguntas] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [mostrarLoader, setMostrarLoader] = useState(true);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(!!nivelParam);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setMostrarLoader(true);

        if (!user?.id) throw new Error("Por favor inicia sesión");

        const [nivelesData, preguntasData] = await Promise.all([
          obtenerNiveles(),
          nivelParam
            ? listarPreguntasPorNivelUsuario(nivelParam)
            : Promise.resolve([]),
        ]);

        setNiveles(nivelesData);
        if (nivelParam) setPreguntas(preguntasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Alert.alert(
          "Error",
          error.message.includes("401")
            ? "Sesión expirada. Por favor inicia sesión."
            : error.message || "Error al cargar datos",
          [{ text: "OK", onPress: () => navigation.navigate("Inicio") }]
        );
        setNiveles([]);
        setPreguntas([]);
      } finally {
        setMostrarLoader(false);
      }
    };

    cargarDatos();
  }, [nivelParam, user?.id]);

  const listarPreguntas = async (nivel) => {
    try {
      setMostrarLoader(true);
      if (!user?.id) throw new Error("Usuario no autenticado");

      const respuesta = await listarPreguntasPorNivelUsuario(nivel);
      setPreguntas(respuesta);
    } catch (error) {
      console.error("Error al listar preguntas:", error);
      Alert.alert("Error", "Error al listar preguntas");
      setPreguntas([]);
    } finally {
      setMostrarLoader(false);
    }
  };

  const handleSelectOption = async (opcion, index) => {
    if (opcion.correcta) {
      setRespuestaCorrecta(index);
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/win.mp3")
      );
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/lose.mp3")
      );
      await sound.playAsync();
    }
  };

  const mostrarComponente = mostrarLoader ? (
    <ActivityIndicator size="large" color="#000" style={styles.loader} />
  ) : nivelSeleccionado ? (
    preguntas.length === 0 ? (
      <Text style={styles.textCenter}>No hay preguntas en este nivel.</Text>
    ) : (
      preguntas.map((pregunta, index) => (
        <CardPregunta
          key={pregunta.id}
          pregunta={pregunta}
          respuestaCorrecta={respuestaCorrecta === index ? index : null}
          onSelectOption={(opcion) => handleSelectOption(opcion, index)}
        />
      ))
    )
  ) : (
    <Text style={styles.textCenter}>Por favor, seleccione un nivel.</Text>
  );

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>JUGAR</Text>
        <Text style={styles.subtitle}>
          Elija el nivel en el que quiere jugar
        </Text>
        <View style={styles.buttonContainer}>
          {niveles.map((nivel) => (
            <TouchableOpacity
              key={nivel}
              style={styles.nivelButton}
              onPress={() => {
                navigation.navigate("Jugar", { nivel });
                setNivelSeleccionado(true);
              }}
            >
              <Text style={styles.nivelButtonText}>Nivel {nivel}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {mostrarComponente}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color:"#2c3e50"
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
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
  textCenter: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  loader: {
    marginVertical: 50,
  },
});

export default Jugar;
