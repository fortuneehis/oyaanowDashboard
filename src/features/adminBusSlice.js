import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBuses = createAsyncThunk("adminBus/getBuses", async () => {
  const res = await axios.get("https://oyanow-api.herokuapp.com/company");

  const response = res.data.company;
  const buses = [];
  console.log(response);
  for (const company of response) {
    if (company.buses[0]) {
      console.log(company.buses);
      buses.push(...company.buses);
    }
  }
  console.log(buses);
  return buses;
});

export const addBuses = createAsyncThunk(
  "company/addBuses",
  async (busData) => {
    const res = await axios.post(
      "https://oyanow-api.herokuapp.com/company/addbus",
      busData
    );

    return res.data.bus;
  }
);

const initialState = {
  status: null,
  buses: [],
};
const adminBusSlice = createSlice({
  name: "adminBus",
  initialState,
  extraReducers: {
    [getBuses.pending]: (state) => {
      state.status = "loading";
    },
    [getBuses.fulfilled]: (state, { payload }) => {
      state.buses = payload;
      state.status = "success";
    },
    [getBuses.rejected]: (state) => {
      state.status = "failed";
    },
    [addBuses.pending]: (state) => {
      state.status = "loading";
    },
    [addBuses.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        buses: [payload, ...state.buses],
      };
    },
    [addBuses.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default adminBusSlice.reducer;
