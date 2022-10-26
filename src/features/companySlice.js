import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../hooks/axiosInterceptor";

export const getCompany = createAsyncThunk("company/getCompany", async () => {
  const res = await API.get("company/admin");

  return res.data.company;
});

export const addBus = createAsyncThunk(
  "company/addBus",
  async (busData, { dispatch }) => {
    try {
      const { company } = busData;
      const res = await API.post("/company/addbus", busData);
      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeBus = createAsyncThunk(
  "company/removeBus",
  async (busData, { dispatch }) => {
    try {
      const { busId, companyId } = busData;
      const res = await API.patch(`/company/removebus/${busId}`, {
        company: `${companyId}`,
      });

      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const addTerminal = createAsyncThunk(
  "company/addTerminal",
  async (terminalData, { dispatch }) => {
    try {
      const res = await API.post("/company/addterminal", terminalData);
      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeTerminal = createAsyncThunk(
  "company/removeTerminal",
  async (terminalData, { dispatch }) => {
    try {
      const { terminalId, companyId } = terminalData;
      console.log(`terminalId ${terminalId}`);
      console.log(`companyId ${companyId}`);
      const res = await API.patch(`/company/removeterminal/${terminalId}`, {
        company: `${companyId}`,
      });
      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const addRoute = createAsyncThunk(
  "company/addRoute",
  async (routeData, { dispatch }) => {
    try {
      const res = await API.post("/company/addroute", routeData);
      console.log(res);
      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeRoute = createAsyncThunk(
  "company/removeRoute",
  async (routeData, { dispatch }) => {
    try {
      const { routeId, companyId } = routeData;
      console.log(`routeId ${routeId}`);
      console.log(`companyId ${companyId}`);
      const res = await API.patch(`/company/removeroute/${routeId}`, {
        company: `${companyId}`,
      });
      dispatch(getCompany());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

const initialState = {
  company: [],
  getCompanyStatus: null,
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetCompanyState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [getCompany.pending]: (state) => {
      state.getCompanyStatus = "loading";
    },
    [getCompany.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        company: payload,
        getCompanyStatus: "success",
      };
    },
    [getCompany.rejected]: (state) => {
      state.getCompanyStatus = "failed";
    },
  },
});

const { reducer, actions } = companySlice;

export const { resetCompanyState } = actions;

export default reducer;
