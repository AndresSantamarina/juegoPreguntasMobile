import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

// const URL_API = process.env.EXPO_PUBLIC_API_URI;
const URL_API = "https://backend-juego-preguntas.vercel.app/api"

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error cargando usuario desde AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserFromStorage();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post(`${URL_API}/login`, credentials);

      if (!res.data.user || !res.data.user.id) {
        throw new Error(
          "La respuesta del servidor no incluye datos de usuario válidos"
        );
      }

      const userData = {
        id: res.data.user.id,
        name: res.data.user.name,
      };

      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token", res.data.token);

      showMessage({
        message: "Bienvenido",
        description: `Hola, ${res.data.user.name}`,
        type: "success",
        icon: "success",
      });

      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);

      showMessage({
        message: "Error al iniciar sesión",
        description:
          error.response?.data?.message ||
          error.message ||
          "Ocurrió un error inesperado",
        type: "danger",
        icon: "danger",
      });
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Error al iniciar sesión",
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${URL_API}/register`, userData);
      setUser(res.data.user);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      await AsyncStorage.setItem("token", res.data.token);
      return { success: true };
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al registrar",
      };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.clear();
    showMessage({
      message: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
      type: "success",
      icon: "success",
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
