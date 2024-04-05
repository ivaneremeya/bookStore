import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../shared/api/auth";
import { Autor } from "../../books/ui/TypeBooks";

interface AutorInitialState {
  autors: Autor[];
  isLoading: boolean;
  page: number;
}

const initialState: AutorInitialState = {
  autors: [],
  isLoading: false,
  page: 0,
};

export const fetchAutors = createAsyncThunk<
  Autor[],
  void,
  { rejectValue: void }
>("autorList/fetchAutor", async () => {
  const response = await AxiosInstance.get("/api/authors/");
  return response.data.result;
});

const AutorListSlice = createSlice({
  name: "autorList",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAutors.fulfilled, (state, action) => {
      state.autors = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAutors.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setPage } = AutorListSlice.actions;
export default AutorListSlice.reducer;
