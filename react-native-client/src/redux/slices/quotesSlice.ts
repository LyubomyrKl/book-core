import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IBookDetail} from "../../components/organism/book-item";
import stub from "../../stub";
import {RootState} from "../../hooks";

interface IQuotesSliceInitialState {
    quotes: {
        [key: string]: [
            {
                id: string,
                quote: string,
            }
        ]
    },
    favoriteQuotesIds: string[]
}

const initialState:IQuotesSliceInitialState = {
    quotes: {

    }
}


export const quotesSlice = createSlice<IBookSliceInitialState>({
    name: 'quotesSlice',
    initialState,
    reducers: {

    }
})

export const {} = quotesSlice.actions
export default quotesSlice.reducer