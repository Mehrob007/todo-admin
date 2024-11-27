import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://65a8e3ef219bfa371867ddad.mockapi.io/api/data";

const handleError = (error, defaultMessage) =>
  error.response?.data || defaultMessage;

export const getData = createAsyncThunk(
  "data/getData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error fetching data"));
    }
  }
);

export const addData = createAsyncThunk(
  "data/addData",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API, form);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error adding data"));
    }
  }
);

export const deleteData = createAsyncThunk(
  "data/deleteData",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error deleting data"));
    }
  }
);

export const editData = createAsyncThunk(
  "data/editData",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Error updating data"));
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  filter: "",
  loading: false,
  error: null,
};

const setLoadingState = (state) => {
  state.loading = true;
  state.error = null;
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredItems = state.items.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, setLoadingState)
      .addCase(getData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload.filter((item) =>
          item.name.toLowerCase().includes(state.filter.toLowerCase())
        );
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addData.pending, setLoadingState)
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.filteredItems.push(action.payload);
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteData.pending, setLoadingState)
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.filteredItems = state.items.filter((item) =>
          item.name.toLowerCase().includes(state.filter.toLowerCase())
        );
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editData.pending, setLoadingState)
      .addCase(editData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
          state.filteredItems = state.items.filter((item) =>
            item.name.toLowerCase().includes(state.filter.toLowerCase())
          );
        }
      })
      .addCase(editData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilter } = dataSlice.actions;

export default dataSlice.reducer;
