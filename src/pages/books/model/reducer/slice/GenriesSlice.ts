import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosInstance } from "../../../../../shared/api/auth";
import { Genreses } from "../../../ui/TypeBooks";

interface GenresesInitialState {
  genreses: Genreses[];
  isLoading: boolean;
}

const initialState: GenresesInitialState = {
  genreses: [],
  isLoading: false,
};

export const fetchGenreses = createAsyncThunk<
  Genreses[],
  void,
  { rejectValue: void }
>("genreses/fetchGenreses", async () => {
  const response = await AxiosInstance.get("/api/genres");
  return response.data.result;
});

const GenriesSlice = createSlice({
  name: "genreses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenreses.fulfilled, (state, action) => {
      state.genreses = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchGenreses.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default GenriesSlice.reducer;
