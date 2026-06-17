import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthContext from "../store/ContextProvider.tsx";
import ReactQueryProvider from "../lib/ReactQueryProvider.tsx";
import { Provider } from "react-redux";
import { store } from "../store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>

    <ReactQueryProvider>
      <AuthContext>
        <App />
      </AuthContext>
    </ReactQueryProvider>
    </Provider>
  </StrictMode>,
);
