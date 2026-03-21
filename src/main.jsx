import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import injectContext from "./hooks/useGlobalReducer";

const ContextLayout = injectContext(() => <RouterProvider router={router} />);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextLayout />
);