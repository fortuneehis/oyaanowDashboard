import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

const theme = createTheme({
  typography: {
    fontFamily: `Poppins`,
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
