import {combineReducers, combineSlices, configureStore} from "@reduxjs/toolkit";

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

const migrations = {
    1: (state) => {
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
    whitelist: ['books'],
}



const persistedReducer = persistReducer(persistConfig, combineReducers({
    books: bookReducer,
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

export { AppStore, persistor }
