import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/auth';
import Home from './src/pages/Home';
import SignUp from './src/pages/SignUp';
import LogIn from './src/pages/LogIn';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
