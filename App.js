import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Inicio from './src/screens/Inicio';
import Agregar from './src/screens/Agregar';
import Jugar from './src/screens/Jugar';
import Preguntas from './src/screens/Preguntas';
import Editar from './src/screens/Editar';
import Error404 from './src/screens/Error404';
import LoginForm from './src/components/LoginForm';
import Register from './src/components/Register';
import FlashMessage from 'react-native-flash-message';
import { useEffect, useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Error404" component={Error404} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Agregar" component={Agregar} />
      <Stack.Screen name="Preguntas" component={Preguntas} />
      <Stack.Screen name="Editar" component={Editar} />
      <Stack.Screen name="Jugar" component={Jugar} />
      <Stack.Screen name="Error404" component={Error404} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const { user } = useAuth();

  return user ? <AppStack /> : <AuthStack />;
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      // Simulá una carga inicial (ej: datos, fuentes, etc.)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAppIsReady(true);
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Ocultá la splash screen
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // aún no mostrar la app
  }

  return (
    <AuthProvider>
      <FlashMessage position="top" />
       <NavigationContainer onReady={onLayoutRootView}>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
