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
  return (
    <AuthProvider>
      <FlashMessage position="top" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
