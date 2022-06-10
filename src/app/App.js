import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./hooks/useAuth";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/ui/navBar";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <AppRouter />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
