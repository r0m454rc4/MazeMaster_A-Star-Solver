import React from "react";
import { Pressable, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/Home";
import OpenMazeScreen from "./screens/OpenMaze";
import TrainAgentScreen from "./screens/TrainAgent";
import RunAgentScreen from "./screens/RunAgent";

// Function to add font icons from https://icons.expo.fyi.
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Draw maze"
        options={{
          tabBarActiveTintColor: "#795ff0",
          // https://stackoverflow.com/questions/45329620/change-navigation-header-background-color
          headerStyle: styles.headerStyle,
          title: "Draw maze",
          // The color of the icon is defined on Colors.ts
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // Add style to the nav bar.
          tabBarStyle: styles.tabBarStyle,

          // Button to redirect the user to OpenMaze screen.
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="folder-open"
                  size={24}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Open maze"
        options={{
          tabBarActiveTintColor: "#795ff0",
          // https://stackoverflow.com/questions/45329620/change-navigation-header-background-color
          headerStyle: styles.headerStyle,
          title: "Open maze",
          // The color of the icon is defined on Colors.ts
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder-open" color={color} />
          ),
          // Add style to the nav bar.
          tabBarStyle: styles.tabBarStyle,
        }}
        component={OpenMazeScreen}
      />

      <Tab.Screen
        name="Train agent"
        options={{
          tabBarActiveTintColor: "#795ff0",
          headerStyle: styles.headerStyle,
          title: "Train agent",
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,
          tabBarStyle: styles.tabBarStyle,
        }}
        component={TrainAgentScreen}
      />

      <Tab.Screen
        name="Run agent"
        options={{
          tabBarActiveTintColor: "#795ff0",
          headerStyle: styles.headerStyle,
          title: "Execute agent",
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,
          tabBarStyle: styles.tabBarStyle,
        }}
        component={RunAgentScreen}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#edecd8",
  },
  tabBarStyle: {
    backgroundColor: "#edecd8",
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 0,
    borderRadius: 15,
  },
});
