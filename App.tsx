import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import IndexScreen from './src/screens/IndexScreen';
import LabharthiScreen from './src/screens/LabharthiScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import EditScreen from './src/screens/EditScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import GuideScreen from './src/screens/GuideScreen';


// navigationContainers
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// context
import { ContextProviderFunction } from './src/components/GlobalContext';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';



const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LabharthiScreen" component={LabharthiScreen} options={({ headerTitle: "Labharthi Management App", headerTitleAlign: "center" })} />
      <Stack.Screen name="IndexScreen" component={IndexScreen} options={({ headerTitle: "Add Beneficiery", headerTitleAlign: "center" })} />
      <Stack.Screen name="EditScreen" component={EditScreen} options={({ headerTitle: "Edit Beneficiery Details", headerTitleAlign: "center" })} />
    </Stack.Navigator>
  );
}

const FeedbackStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ headerTitle: "Feedback / Suggestion", headerTitleAlign: "center" }} />
    </Stack.Navigator>
  );
}

const GuideStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Guide" component={GuideScreen} />
    </Stack.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      {/* really cool */}
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Labharthi") {
              iconName = "arrange-send-to-back";
            } else if (route.name === "Find Token") {
              iconName = "web";
            } else if (route.name === "Guide") {
              iconName = "television-guide";
            } else {
              iconName = "tournament";
            }

            return <MaterialCommunityIcons name={iconName} size={24} color={color} />
          }
        })}

        tabBarOptions={{
          activeTintColor: "indigo",
          inactiveTintColor: "grey",
        }}

      >
        <Tabs.Screen component={MainStack} name="Labharthi" />
        <Tabs.Screen component={WebViewScreen} name="Find Token" initialParams={{ bid: "" }} />
        <Tabs.Screen component={FeedbackStack} name="Feedback" />
        <Tabs.Screen component={GuideStack} name="Guide" />
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