import { NavigationContainer } from "@react-navigation/native";
import { StackScreen } from "./src/Constants/stackScreen";
import React from "react";
import { AppProvider } from "./src/Context";
import { Provider } from "react-redux";
import store from "./src/Redux/store";

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppProvider>
          <StackScreen />
        </AppProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
