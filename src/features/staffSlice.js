import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../hooks/axiosInterceptor";

const initialState = {
  company: [],
  addCompanyStatus: "",
  staff: [],
  getCompaniesStatus: "",
  getStaffsStatus: "",
};

export const getCompanies = createAsyncThunk("staff/getCompanies", async () => {
  try {
    const res = await API.get("company/admin");
    return res.data.company;
  } catch (error) {
    alert(error.response.data.message);
  }
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
    try {
      const res = await API.delete(`company/admin/${id}`);
      dispatch(getCompanies());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const getAllStaff = createAsyncThunk("staff/getAllStaff", async () => {
  try {
    const res = await API.get("staff/getall");
    return res.data.staff;
  } catch (error) {
    alert(error.response.data.message);
  }
});
export const registerStaff = createAsyncThunk(
  "staff/registerStaff",
  async (user, { dispatch }) => {
    try {
      const res = await API.post("/staff/register", user);
      dispatch(getAllStaff());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeStaff = createAsyncThunk(
  "staff/removeStaff",
  async (id, { dispatch }) => {
    try {
      const res = await API.delete(`staff/${id}`);
      dispatch(getAllStaff());
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

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
      state.getCompaniesStatus = "loading";
    },
    [getCompanies.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        company: payload,
        getCompaniesStatus: "success",
      };
    },
    [getCompanies.rejected]: (state) => {
      state.getCompaniesStatus = "failed";
    },
    [getAllStaff.pending]: (state) => {
      return {
        ...state,
        getStaffsStatus: "loading",
      };
    },
    [getAllStaff.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        staff: payload,
        getStaffsStatus: "success",
      };
    },
    [getAllStaff.rejected]: (state) => {
      state.getStaffsStatus = "failed";
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
