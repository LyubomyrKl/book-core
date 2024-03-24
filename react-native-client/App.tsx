import React, {useEffect, useState} from 'react';
import AppRoot from './src/app/AppRoot';

import {AppContext, IAppContext} from "./src/app/app-context";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Dimensions} from "react-native";


const windowDimensions = Dimensions.get('window');

const App = () => {
    const [theme, setTheme] = useState("dark");
    const [windowSize, setWindowSize] = useState(windowDimensions);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setWindowSize(window);
            },
        );
        return () => subscription?.remove();
    }, []);


    const contextValue:IAppContext = {theme, setTheme, windowSize};

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
