import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../hooks/axiosInterceptor";

const initialState = {
  company: [],
  addCompanyStatus: "",
  staff: [],
  status: null,
};

export const getCompanies = createAsyncThunk("staff/getCompanies", async () => {
  const res = await API.get("company/admin");

  return res.data.company;
});

export const registerCompany = createAsyncThunk(
  "staff/registerCompany",
  async (companyData, { dispatch }) => {
    try {
      const res = await API.post("/company/admin/register", companyData);
      dispatch(getCompanies());
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
);

export const removeCompany = createAsyncThunk(
  "staff/removeCompany",
  async (id, { dispatch }) => {
    const res = API.delete(`company/admin/${id}`);
    dispatch(getCompanies());
  }
);

export const getAllStaff = createAsyncThunk("staff/getAllStaff", async () => {
  const res = await API.get("staff/getall");

  return res.data.staff;
});

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    resetStaffState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: {
    [getCompanies.pending]: (state) => {
      state.status = "loading";
    },
    [getCompanies.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        company: payload,
        status: "success",
      };
    },
    [getCompanies.rejected]: (state) => {
      state.status = "failed";
    },
    [getAllStaff.pending]: (state) => {
      return {
        ...state,
      };
    },
    [getAllStaff.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        staff: payload,
        status: "success",
      };
    },
    [getAllStaff.rejected]: (state) => {
      state.status = "failed";
    },
    [registerCompany.pending]: (state) => {
      state.addCompanyStatus = "loading";
    },
    [registerCompany.fulfilled]: (state, { payload }) => {
      state.addCompanyStatus = "success";
    },
    [registerCompany.rejected]: (state) => {
      state.addCompanyStatus = "Failed To Add";
    },
  },
});

const { reducer, actions } = staffSlice;

export const { resetStaffState } = actions;

export default reducer;
