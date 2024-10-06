import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from '@expo/vector-icons';
import Login from './views/login';
import Registrar from './views/Registrar';
import Home from './views/Home';
import Biblioteca from './views/Biblioteca';

import LeitorEpub from './views/LeitorEpub';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      inactiveColor="#535353"
      activeColor='#F01624'
      barStyle={{ 
        backgroundColor: '#FFF', 
     
 
       
        
        }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '', 
          tabBarIcon: ({ color, focused }) => {
            if(focused) {
              return  <MaterialCommunityIcons name="home" color={color} size={26}  />
            }
            return <MaterialCommunityIcons name="home-outline" color={color} size={26} /> 
          },
        }}
      />
      <Tab.Screen
        name="Biblioteca"
        component={Biblioteca}
        options={{
          headerShown: false,
          tabBarLabel: '', 
          tabBarIcon: ({ color, focused }) => {
            if(focused) {
              return  <MaterialCommunityIcons name="book-open-page-variant" color={color} size={26}  />
            }
            return <MaterialCommunityIcons
              name="book-open-page-variant-outline"
              size={26}
              color={color}
            />
          },
        }}
      />

    
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator activeColor="#e91e63">
        <Stack.Screen
          name="Tab"
          component={TabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: '#811921',
              color: '#F8F8FF',
            },
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Registrar"
          component={Registrar}
          options={{
            headerStyle: {
              backgroundColor: '#811921',
              color: '#F8F8FF',
            },
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="Leitor"
          component={LeitorEpub}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
