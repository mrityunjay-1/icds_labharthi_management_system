import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import IndexScreen from './src/screens/IndexScreen';
import LabharthiScreen from './src/screens/LabharthiScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import EditScreen from './src/screens/EditScreen';

// navigationContainers
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// context
import { ContextProviderFunction } from './src/components/GlobalContext';

// icons
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';



const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LabharthiScreen" component={LabharthiScreen} options={({ headerTitle: "Labharthi Management App", headerTitleAlign: "center" })} />
      <Stack.Screen name="IndexScreen" component={IndexScreen} options={({ headerTitle: "Add Beneficiery", headerTitleAlign: "center" })} />
      <Stack.Screen name="EditScreen" component={EditScreen} options={({ headerTitle: "Edit Beneficiery Details", headerTitleAlign: "center" })} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen component={MainStack} name="MainTabsScreen" options={({ tabBarIcon: () => <Ionicons name="logo-buffer" size={24} color="black" /> })} />
        <Tabs.Screen component={WebViewScreen} name="WebViewScreen" initialParams={{ bid: "" }} options={({ tabBarIcon: () => <MaterialCommunityIcons name="web" size={28} color="black" /> })} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <>
      <ContextProviderFunction>
        <App />
      </ContextProviderFunction>
    </>
  );
}