import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TableGastos from "./src/components/Gastos/TableGastos";
import { Provider } from 'react-redux';
import Index from "./src/Index";
import { store } from './src/components/redux/store';
import TableIngresos from "./src/components/Ingresos/TableIngresos";
import TabNavigator from "./src/Navigation/Navigation";
import Login from "./src/components/Login/Login.";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Control de gastos' component={Index} />
          <Stack.Screen name='Tabla de gastos' component={TableGastos} />
          <Stack.Screen name='Tabla de ingresos' component={TableIngresos} />
        </Stack.Navigator>    
      </NavigationContainer>
    </Provider>
  );
}