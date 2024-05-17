import { NavigationContainer } from '@react-navigation/native';
import { StackScreen } from './src/Constants/stackScreen';
import React from 'react';
import { AppProvider } from './src/Context';

const App = () => {
    return (
        <NavigationContainer>
            <AppProvider>
                <StackScreen />
            </AppProvider>
        </NavigationContainer>
    );
};

export default App;
