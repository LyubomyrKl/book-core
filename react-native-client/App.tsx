import React, {useState} from 'react';
import AppRoot from './src/app/AppRoot';

import {AppContext, IAppContext} from "./src/app/app-context";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
    const [theme, setTheme] = useState("dark");
    const contextValue:IAppContext = {theme, setTheme };

    return (
        <SafeAreaProvider>
            <AppContext.Provider value={contextValue}>
                <NavigationContainer>
                    <AppRoot />
                </NavigationContainer>
            </AppContext.Provider>
        </SafeAreaProvider>

    );
};

export default App;
