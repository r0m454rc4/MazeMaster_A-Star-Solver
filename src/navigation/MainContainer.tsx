import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import HomeScreen from "./screens/Home-screen";
import SolveMazeScreen from "./screens/SolveMaze-screen";

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
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Solve maze"
        options={{
          tabBarActiveTintColor: "#795ff0",
          headerStyle: styles.headerStyle,
          title: "Solve maze",
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,
          tabBarStyle: styles.tabBarStyle,
        }}
        component={SolveMazeScreen}
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
