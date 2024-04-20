import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoriesProvider from "./context/CategoriesProvider.jsx";
import AdminProvider from "./context/AdminProvider.jsx";
import AdvertismentsProvidr from "./context/AdvertismentsProvider.jsx";
import LanguageProvider from "./context/LanguageProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <AdminProvider>
        <CategoriesProvider>
          <AdvertismentsProvidr>
            <App />
          </AdvertismentsProvidr>
        </CategoriesProvider>
      </AdminProvider>
    </LanguageProvider>
  </React.StrictMode>
);
