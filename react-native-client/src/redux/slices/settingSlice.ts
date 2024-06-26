import { createSlice } from '@reduxjs/toolkit'
import {IBookDetail} from "../../components/organism/book-item";
import {RootState} from "../../hooks";


interface ISettingSliceInitialState {
    theme: 'light' | 'dark',
    bg: string,
    fg: string,
    size: string,
    height: string,
}

const initialState:ISettingSliceInitialState = {
    theme: 'light',
    bg: '#fafafa',
    fg: '#000000',
    size: '100%',
    height: 'normal',
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        modifySetting: (state, action) => {
            state = action.payload
        },

        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const selectTheme = (state: RootState) => state.settings.theme
export const {modifySetting, setTheme} = settingsSlice.actions

export default settingsSlice.reducer