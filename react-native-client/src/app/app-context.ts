import {createContext} from "react";

export interface IAppContext {
    theme: string;
    setTheme: (theme: string) => void;
}

export const AppContext = createContext<IAppContext>({
    theme: 'light',
    setTheme: (theme: string) => {}
});
