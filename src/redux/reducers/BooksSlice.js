import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  status: null,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function () {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=isbn"
    );
    const data = await response.json();

    return data.items;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBooks(state, action) {
      state.books.push(action.payload);
    },
    removeBooks(state, action) {
      state.books = state.books.filter((item) => item.id !== action.payload);
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
      state.books = action.payload.map((el) => {
        el.volumeInfo.id = el.id;
        return el.volumeInfo;
      });
    },
    [fetchBooks.rejected]: (state, action) => {},
  },
});

export const { addBooks, removeBooks, sortByTitle, sortByPublishedDate } =
  booksSlice.actions;

export default booksSlice.reducer;
