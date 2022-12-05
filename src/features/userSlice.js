import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../hooks/axiosInterceptor";

const initialState = {
  user: {},
  isLoading: false,
  error: "",
  addBusStatus: "",
  addTerminalStatus: "",
  removeTerminalStatus: "",
  removeBusStatus: "",
  addRouteStatus: "",
  removeRouteStatus: "",
};

export const addBus = createAsyncThunk("user/addbus", async (busData) => {
  try {
    const res = await API.post("company/addbus", busData);
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    alert(error.response.data.message);
  }
});

export const removeBus = createAsyncThunk("user/removebus", async (busData) => {
  try {
    const { busId, companyId } = busData;
    const res = await API.patch(`/company/removebus/${busId}`, {
      company: `${companyId}`,
    });
    return busId;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
});

export const addTerminal = createAsyncThunk(
  "user/addterminal",
  async (terminalData) => {
    try {
      const res = await API.post("company/addterminal", terminalData);
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeTerminal = createAsyncThunk(
  "user/removeterminal",
  async (terminalData) => {
    try {
      const { terminalId, companyId } = terminalData;
      const res = await API.patch(`/company/removeterminal/${terminalId}`, {
        company: `${companyId}`,
      });
      return terminalId;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const addRoute = createAsyncThunk("user/addRoute", async (routeData) => {
  try {
    const res = await API.post("/company/addroute", routeData);
    return res.data.data;
  } catch (error) {
    alert(error.response.data.message);
  }
});

export const removeRoute = createAsyncThunk(
  "user/removeRoute",
  async (routeData) => {
    try {
      const { routeId, companyId } = routeData;
      const res = await API.patch(`/company/removeroute/${routeId}`, {
        company: `${companyId}`,
      });
      return routeId;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const addNyscRoute = createAsyncThunk(
  "company/addNyscRoute",
  async (nyscRouteData) => {
    try {
      const res = await API.post("/company/addnyscroute", nyscRouteData);
      return res.data.data;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

export const removeNyscRoute = createAsyncThunk(
  "company/removeNyscRoute",
  async (nyscRouteData) => {
    try {
      const { nyscRouteId, companyId } = nyscRouteData;
      const res = await API.patch(`/company/removenyscroute/${nyscRouteId}`, {
        company: `${companyId}`,
      });
      return nyscRouteId;
    } catch (error) {
      alert(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    getuserPending: (state) => {
      state.isLoading = true;
    },

    getuserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = "";
    },

    getuserFailed: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
  extraReducers: {
    [addBus.pending]: (state) => {
      return {
        ...state,
        addBusStatus: "loading",
      };
    },
    [addBus.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            buses: [...state.user.company.buses, payload],
          },
        },
        addBusStatus: "successful",
      };
    },

    [addBus.rejected]: (state) => {
      return {
        ...state,
      };
    },
    [removeBus.pending]: (state) => {
      return {
        ...state,
        removeBusStatus: "loading",
      };
    },
    [removeBus.fulfilled]: (state, { payload }) => {
      const updatedBus = state.user.company.buses.filter(
        (bus) => bus._id !== payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            buses: updatedBus,
          },
        },
        removeBusStatus: "successful",
      };
    },

    [removeBus.rejected]: (state) => {
      return {
        ...state,
        removeBusStatus: "Failed",
      };
    },
    [addTerminal.pending]: (state) => {
      return {
        ...state,
        addTerminalStatus: "loading",
      };
    },
    [addTerminal.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            terminals: [...state.user.company.terminals, payload],
          },
        },
        addTerminalStatus: "successful",
      };
    },

    [addTerminal.rejected]: (state) => {
      return {
        ...state,
      };
    },
    [removeTerminal.pending]: (state) => {
      return {
        ...state,
        removeTerminalStatus: "loading",
      };
    },
    [removeTerminal.fulfilled]: (state, { payload }) => {
      const updatedTerminal = state.user.company.terminals.filter(
        (terminal) => terminal._id !== payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            terminals: updatedTerminal,
          },
        },
        removeTerminalStatus: "successful",
      };
    },

    [removeTerminal.rejected]: (state) => {
      return {
        ...state,
        removeTerminalStatus: "Failed",
      };
    },
    [addRoute.pending]: (state) => {
      return {
        ...state,
        addRouteStatus: "loading",
      };
    },
    [addRoute.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            routes: [...state.user.company.routes, payload],
          },
        },
        addRouteStatus: "successful",
      };
    },

    [addRoute.rejected]: (state) => {
      return {
        ...state,
        addRouteStatus: "failed",
      };
    },
    [removeRoute.pending]: (state) => {
      return {
        ...state,
        removeRouteStatus: "loading",
      };
    },
    [removeRoute.fulfilled]: (state, { payload }) => {
      const updatedRoutes = state.user.company.routes.filter(
        (route) => route._id !== payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            routes: updatedRoutes,
          },
        },
        removeRouteStatus: "successful",
      };
    },

    [removeRoute.rejected]: (state) => {
      return {
        ...state,
        removeRouteStatus: "Failed",
      };
    },
    [addNyscRoute.pending]: (state) => {
      return {
        ...state,
        addRouteStatus: "loading",
      };
    },
    [addNyscRoute.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            nyscRoutes: [...state.user.company.nyscRoutes, payload],
          },
        },
        addRouteStatus: "successful",
      };
    },

    [addNyscRoute.rejected]: (state) => {
      return {
        ...state,
        addRouteStatus: "failed",
      };
    },
    [removeNyscRoute.pending]: (state) => {
      return {
        ...state,
        removeRouteStatus: "loading",
      };
    },
    [removeNyscRoute.fulfilled]: (state, { payload }) => {
      const updatedRoutes = state.user.company.nyscRoutes.filter(
        (route) => route._id !== payload
      );

      return {
        ...state,
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            nyscRoutes: updatedRoutes,
          },
        },
        removeRouteStatus: "successful",
      };
    },

    [removeNyscRoute.rejected]: (state) => {
      return {
        ...state,
        removeRouteStatus: "Failed",
      };
    },
  },
});

const { reducer, actions } = userSlice;

export const { getuserPending, getuserSuccess, getuserFailed, resetUser } =
  actions;

export default reducer;
