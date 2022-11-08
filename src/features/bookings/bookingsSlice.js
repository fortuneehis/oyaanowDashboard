import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../hooks/axiosInterceptor";

const initialState = {
  staffCustomers: [],
  customers: [],
  busCharter: [],
  dubaivisa: [],
  getStaffCustomersStatus: "",
  getBusCharterStatus: "",
  getDubaiVisaStatus: "",
  getCustomersStatus: "",
};

export const getStaffCustomers = createAsyncThunk(
  "bookings/staffcustomers",
  async () => {
    try {
      const res = await API.get("company/customers");
      return res.data.customer;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const getCustomers = createAsyncThunk("bookings/customers", async () => {
  const res = await API.get("company/admin/customers");

  return res.data.customer;
});

export const getBusCharter = createAsyncThunk(
  "bookings/buscharter",
  async () => {
    const res = await API.get("company/admin/buscharter");

    return res.data.customer;
  }
);

export const getDubaiVisa = createAsyncThunk("bookings/dubaivisa", async () => {
  const res = await API.get("company/admin/dubaivisa");

  return res.data.customer;
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetBookingsState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [getCustomers.pending]: (state) => {
      return {
        ...state,
        getCustomersStatus: "loading",
      };
    },
    [getCustomers.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        customers: payload,
        getCustomersStatus: "successful",
      };
    },
    [getCustomers.rejected]: (state) => {
      return {
        ...state,
        getCustomersStatus: "failed",
      };
    },
    [getBusCharter.pending]: (state) => {
      return {
        ...state,
        getBusCharterStatus: "loading",
      };
    },
    [getBusCharter.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        busCharter: payload,
        getBusCharterStatus: "successful",
      };
    },
    [getBusCharter.rejected]: (state) => {
      return {
        ...state,
        getBusCharterStatus: "failed",
      };
    },
    [getDubaiVisa.pending]: (state) => {
      return {
        ...state,
        getDubaiVisaStatus: "loading",
      };
    },
    [getDubaiVisa.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        dubaivisa: payload,
        getDubaiVisaStatus: "successful",
      };
    },
    [getDubaiVisa.rejected]: (state) => {
      return {
        ...state,
        getDubaiVisaStatus: "failed",
      };
    },
    [getStaffCustomers.pending]: (state) => {
      return {
        ...state,
        getStaffCustomersStatus: "loading",
      };
    },
    [getStaffCustomers.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        staffCustomers: payload,
        getStaffCustomersStatus: "successful",
      };
    },
    [getStaffCustomers.rejected]: (state) => {
      return {
        ...state,
        getStaffCustomersStatus: "failed",
      };
    },
  },
});

const { reducer, actions } = bookingsSlice;

export const { resetBookingsState } = actions;

export default reducer;
