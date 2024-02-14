import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GoogleSignIn from '../src/GoogleSignIn';
import Home from '../src/MapScreen';
import MapScreen from '../src/MapScreen';
import Splash from '../src/SplashScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={GoogleSignIn} />
      <Stack.Screen name="Home" component={MapScreen} />
    </Stack.Navigator>
  );
}
export default MyStack