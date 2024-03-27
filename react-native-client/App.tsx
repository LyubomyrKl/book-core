// Imports organized alphabetically and grouped by type
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

// Custom imports
import AppRoot from './src/app/AppRoot';
import { AppContext, IAppContext } from './src/app/app-context';
import { persistor, AppStore } from './src/redux/store';


const windowDimensions = Dimensions.get('window');


//Todo: add heart to favorite books
//Todo: add sign to favorite quotes
//Todo: make book settings
//Todo: make quote settings
//Todo: make Ebook reader
//Todo: make pdf reader
//Todo: implement AI summarizer


const App = () => {
    const [windowSize, setWindowSize] = useState(windowDimensions);

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window}) => {
                setWindowSize(window);
            },
        );
        return () => subscription?.remove();
    }, []);


    useEffect(() => {
        // @ts-ignore
        if (Text.defaultProps == null) Text.defaultProps = {};
        // @ts-ignore
        Text.defaultProps.allowFontScaling = false;
    }, []);


    const contextValue:IAppContext = { windowSize};

    return (
        <SafeAreaProvider>
            <AppContext.Provider value={contextValue}>
                <Provider store={AppStore}>
                    <PersistGate loading={null} persistor={persistor}>
                        <NavigationContainer>
                            <AppRoot />
                        </NavigationContainer>
                    </PersistGate>
                </Provider>
            </AppContext.Provider>
        </SafeAreaProvider>

    );
};

export default App;
