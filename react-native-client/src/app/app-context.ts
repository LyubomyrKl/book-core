import {createContext} from "react";
import {ScaledSize} from "react-native";

export interface IAppContext {
    theme: string;
    setTheme: (theme: string) => void;
    windowSize: ScaledSize
}

export const AppContext = createContext<IAppContext>({
    theme: 'light',
    setTheme: (theme: string) => {},
    windowSize: {scale: 1, width: 1, height: 1}
});
