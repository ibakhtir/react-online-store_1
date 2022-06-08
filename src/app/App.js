import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./hooks/useAuth";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
