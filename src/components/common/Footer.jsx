// components/common/Footer.js (React Native)
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Todos los derechos reservados ©</Text>
      <Text style={styles.text}>
        Prohibida su distribución y/o uso sin permiso.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    marginTop: "auto", // útil si usás Flexbox en toda la pantalla
  },
  text: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Footer;
