import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Error404 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Error 404, página no encontrada</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Error404;
