import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/Home";
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
        name="Open maze"
        options={{
          // https://stackoverflow.com/questions/45329620/change-navigation-header-background-color
          headerStyle: {
            backgroundColor: "#edecd8",
          },
          title: "Open or draw maze",
          // The color of the icon is defined on Colors.ts
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,

          // Add style to the nav bar.
          tabBarStyle: {
            backgroundColor: "#edecd8",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
          },
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Train agent"
        options={{
          headerStyle: {
            backgroundColor: "#edecd8",
          },

          title: "Train agent",
          tabBarIcon: ({ color }) => <TabBarIcon name="gears" color={color} />,

          // Add style to the nav bar.
          tabBarStyle: {
            backgroundColor: "#edecd8",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
          },
        }}
        component={TrainAgentScreen}
      />

      <Tab.Screen
        name="Run agent"
        options={{
          headerStyle: {
            backgroundColor: "#edecd8",
          },
          title: "Execute agent",
          tabBarIcon: ({ color }) => <TabBarIcon name="flash" color={color} />,

          // Add style to the nav bar.
          tabBarStyle: {
            backgroundColor: "#edecd8",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
          },
        }}
        component={RunAgentScreen}
      />
    </Tab.Navigator>
  );
}
