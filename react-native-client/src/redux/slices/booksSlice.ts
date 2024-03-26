import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IBookDetail} from "../../components/organism/book-item";
import stub from "../../stub";
import {RootState} from "../../hooks";

interface IBookSliceInitialState {
    mostRecentBook: IBookDetail | null,
    books: IBookDetail[]
}

const initialState:IBookSliceInitialState = {
    mostRecentBook: stub[0],
    books: stub,
}


export const booksSlice = createSlice<IBookSliceInitialState>({
    name: 'books',
    initialState,
    reducers: {
        setMostRecentReadBook: (state, action) => {
            state.mostRecentBook = action.payload
        },
        getBook: (state, action: PayloadAction<string>) => {
            return state.books.find(book => book.id === action.payload)
        },
        setBooks: (state, action) => {
            state.books = action.payload
        }
    }
})


export const selectBooks = (state: RootState) => state.books.books
export const selectMostRecentReadBook = (state: RootState) => state.books.mostRecentBook
export const {setMostRecentReadBook, setBooks} = booksSlice.actions
export default booksSlice.reducer