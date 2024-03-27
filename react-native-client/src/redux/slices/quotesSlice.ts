import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {quotesStub} from "../../stub";


export interface IQuote {
    quoteId: string;
    quote: string;
}

interface IQuotesSliceInitialState {
    quotes: {
        [bookId: string]: IQuote[]
    },

    favoriteQuotesIds: {
        [bookId: string]: string[]
    },

    filteredQuotes: IQuote[],
}

const initialState:IQuotesSliceInitialState = {
    quotes: {
        '1': quotesStub
    },
    favoriteQuotesIds: {
        '1': ["1", "2", "3", "9"]
    },
    filteredQuotes: [],
}

export const quotesSlice = createSlice({
    name: 'quotesSlice',
    initialState,
    reducers: {
        setAllQuotes: (state, action: PayloadAction<string>) => {
            state.filteredQuotes = state.quotes[action.payload]
        },
        setFavoriteQuotes: (state, action: PayloadAction<string>) => {
            state.filteredQuotes = state.quotes[action.payload] ? state.quotes[action.payload].filter(quote => state.favoriteQuotesIds[action.payload].includes(quote.quoteId)) : []
        },
        setRecentQuotes: (state, action: PayloadAction<string>) => {
            state.filteredQuotes = state.quotes[action.payload] ? state.quotes[action.payload].slice(-5).reverse() : []
        },
    }
})

export const {setAllQuotes, setFavoriteQuotes, setRecentQuotes} = quotesSlice.actions
export default quotesSlice.reducer