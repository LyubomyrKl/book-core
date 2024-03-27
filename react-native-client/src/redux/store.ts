import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, createMigrate,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';


import bookReducer from "./slices/booksSlice";
import settingReducer from "./slices/settingSlice";
import quotesReducer from "./slices/quotesSlice";


const migrations = {
    1: (state: any) => {
        return {
            ...state,
            // Add 'mostRecentBook' field with default value
            books: {
                ...state.books,
                mostRecentBook: null
            }
        };
    }
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    migrate: createMigrate(migrations, { debug: false }),
    whitelist: ['books', 'settings', 'quotes'],
}



const persistedReducer = persistReducer(persistConfig, combineReducers({
    books: bookReducer,
    quotes: quotesReducer,
    settings: settingReducer
}));

const AppStore = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})


const persistor = persistStore(AppStore)
persistor.purge();

export { AppStore, persistor }
