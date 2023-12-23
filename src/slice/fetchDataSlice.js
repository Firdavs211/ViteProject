import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
});

const getDataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      (state.loading = false), (state.error = true);
    });
  },
});

export default getDataSlice.reducer;
