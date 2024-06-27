import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./src/pages/Home";
import NewPlant from "./src/pages/NewPlant";
import MyPlants from "./src/pages/MyPlants";
import SearchPlants from "./src/pages/SearchPlants";
import { AppProvider } from "./src/AppContext";


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <AppProvider>
      <NavigationContainer >
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#96c347",
            tabBarInactiveTintColor: "#888",
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "500",  
            },
            tabBarStyle: [
              {
                height: 60,
                paddingBottom: 5,
                paddingTop: 5,
                borderTopWidth: 0,
                elevation: 0,
                backgroundColor: "white"
              },
            ]
          }}
        >
          <Tab.Screen
            name="Home" 
            component={Home} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="New Plant" 
            component={NewPlant} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="flower" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="My Plants" 
            component={MyPlants} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Entypo name="list" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search" 
            component={SearchPlants} 
            options={{ 
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}