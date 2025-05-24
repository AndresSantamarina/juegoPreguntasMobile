import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/common/MainLayout";

const Inicio = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          BIENVENIDO{user ? `, ${user.name.toUpperCase()}!` : "!"}
        </Text>
        <View style={styles.section}>
          <Text style={styles.paragraph}>
            ¡Bienvenido al <Text style={styles.bold}>Juego de Preguntas</Text>!
            Aquí podrás disfrutar de un emocionante juego en donde tendrás que
            elegir la respuesta correcta.
          </Text>
          <Text style={styles.paragraph}>
            ¡Demuestra tus conocimientos y desafía a tus amigos para ver quién
            es el mejor!
          </Text>
          <Text style={styles.subtitle}>¡QUE TE DIVIERTAS!</Text>
          <Image
            source={require("../assets/question-mark.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/in/andr%C3%A9s-eduardo-santamarina/"
              )
            }
            style={styles.iconWrapper}
          >
            <FontAwesome name="linkedin-square" size={36} color="#0e76a8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://github.com/AndresSantamarina")
            }
            style={styles.iconWrapper}
          >
            <FontAwesome name="github" size={36} color="#171515" />
          </TouchableOpacity>
        </View>
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
    marginTop: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2c3e50",
  },
  section: {
    marginTop: 30,
    alignItems: "center",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    marginTop: 30,
    fontWeight: "600",
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "center",
    gap: 20,
  },
  iconWrapper: {
    marginHorizontal: 15,
  },
});

export default Inicio;
