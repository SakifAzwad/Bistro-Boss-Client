import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { HelmetProvider } from "react-helmet-async";
import AuthProv from "./providers/AuthProv";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProv>
      <HelmetProvider>
        <div className="max-w-screen-xl mx-auto">
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProv>
  </React.StrictMode>
);
