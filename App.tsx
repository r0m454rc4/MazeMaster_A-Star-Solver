import { NavigationContainer } from "@react-navigation/native";
import MainContainer from "./src/navigation/MainContainer";

export default function App() {
  return(
    <NavigationContainer>
      <MainContainer/>
    </NavigationContainer>
  );
}
