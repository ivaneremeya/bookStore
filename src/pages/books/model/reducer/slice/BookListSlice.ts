import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../../ui/TypeBooks";
import {
  fetchBooks,
  fetchFilterBooks,
  fethPaginationBooks,
} from "../../../api/ApiBooks";

interface BookInitialState {
  page: number;
  isLoading: boolean;
  books: Book[];
  isNotFoundFilter: boolean;
}

const getInitialState = (): BookInitialState => ({
  page: 1,
  isLoading: false,
  books: [],
  isNotFoundFilter: false,
});

const BookListSlice = createSlice({
  name: "bookList",
  initialState: getInitialState(),
  reducers: {
    setBookCreat: (state, action: PayloadAction<Book[]>) => {
      state.books = [...state.books, ...action.payload];
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload;
    });

    builder.addCase(fetchFilterBooks.fulfilled, (state, action) => {
      if (action.payload.length) {
        state.books = action.payload;
      }
    });
    builder.addCase(fethPaginationBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fethPaginationBooks.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setBookCreat, setPage } = BookListSlice.actions;
export default BookListSlice.reducer;
