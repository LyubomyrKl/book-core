import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IBookDetail} from "../../components/organism/book-item";
import stub from "../../stub";
import {RootState} from "../../hooks";


// As init recent book
// const emptyBook: IBookDetail = {
//     id: 'empty-book',
//     title: 'Add book to read',
//     author: 'Select some book',
//     cover: '',
//     left: 0,
//     pageCount: 0,
//     pagePassCount: 0,
//     isFinished: false,
//     isFavorite: false
// }

interface IBookSliceInitialState {
    mostRecentBook: IBookDetail,
    books: IBookDetail[]
}

const initialState:IBookSliceInitialState = {
    mostRecentBook: stub[0],
    books: stub,
}


export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setMostRecentReadBook: (state, action: PayloadAction<IBookDetail>) => {
            state.mostRecentBook = action.payload
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