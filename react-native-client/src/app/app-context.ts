import {createContext} from "react";
import {ScaledSize} from "react-native";

export interface IAppContext {
    windowSize: ScaledSize
}

export const AppContext = createContext<IAppContext>({
    windowSize: {scale: 1, width: 1, height: 1}
});
