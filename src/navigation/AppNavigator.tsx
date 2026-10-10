import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator, { BottomTabParamList } from "./BottomTabNavigator";
import { ProjectDetailScreen } from "../screens/ProjectDetailScreen";
import Meow from "../screens/Meow";

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  ProjectDetail: { projectId: string };
  Meow: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
        />

        <Stack.Screen
          name="ProjectDetail"
          component={ProjectDetailScreen}
        />

        <Stack.Screen
          name="Meow"
          component={Meow}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}