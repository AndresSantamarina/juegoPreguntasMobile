import { View, StyleSheet } from "react-native";
import MenuNav from "./MenuNav";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      <MenuNav />
      <View style={styles.content}>{children}</View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default MainLayout;
