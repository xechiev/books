import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BookApiService from "../../services/bookService";

const api = new BookApiService();

const initialState = {
  books: [],
  book: [],
  status: null,
  error: null,
  toggleBook: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await api.getBooksData();
  return response;
});

export const fetchBook = createAsyncThunk("books/fetchBook", async (userId) => {
  const response = await api.getBook(userId);
  return response;
});

export const createBook = createAsyncThunk("books/createBook", async (data) => {
  const response = await api.createBook(data);
  return response;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (data, id) => {
    const response = await api.updateBook(data, id);
    return response;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  const response = await api.deleteBook(id);
  return response;
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    toggleBooks(state, action) {
      state.toggleBook = action.payload;
    },
    clearBookArray(state) {
      state.book = [];
    },
    sortByTitle(state) {
      state.books.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    },
    sortByPublishedDate(state) {
      state.books.sort(
        (a, b) =>
          new Date(b.publishedDate).getFullYear() -
          new Date(a.publishedDate).getFullYear()
      );
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.books = action.payload;
    },
    [fetchBooks.rejected]: (state, action) => {},
    [fetchBook.fulfilled]: (state, action) => {
      state.book = action.payload;
      state.status = "resolved";
    },
  },
});

export const { sortByTitle, sortByPublishedDate, toggleBooks, clearBookArray } =
  booksSlice.actions;

export default booksSlice.reducer;
