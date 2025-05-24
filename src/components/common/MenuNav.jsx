import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const MenuNav = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const renderLink = (label, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.linkBtn}>
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.navbar}
    >
      <Text style={styles.title}>JUEGO DE PREGUNTAS</Text>
      <View style={styles.links}>
        {!user ? (
          <>
            {renderLink("INICIAR SESIÓN", () => navigation.navigate("Login"))}
            {renderLink("REGISTRARSE", () => navigation.navigate("Register"))}
          </>
        ) : (
          <>
            {renderLink("INICIO", () => navigation.navigate("Inicio"))}
            {renderLink("AGREGAR", () => navigation.navigate("Agregar"))}
            {renderLink("MODIFICAR", () => navigation.navigate("Preguntas"))}
            {renderLink("JUGAR", () => navigation.navigate("Jugar"))}
            {renderLink("CERRAR SESIÓN", logout)}
          </>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  linkBtn: {
    backgroundColor: "#ffffff33", // blanco con transparencia
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  linkText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default MenuNav;
