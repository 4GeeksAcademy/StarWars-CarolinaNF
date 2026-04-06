import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import injectContext from "./hooks/useGlobalReducer";
import "bootstrap/dist/css/bootstrap.min.css";

const ContextLayout = injectContext(() => <RouterProvider router={router} />);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextLayout />
);