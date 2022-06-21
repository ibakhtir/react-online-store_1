import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./hooks/useAuth";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/ui/navBar";
import ItemsProvider from "./hooks/useItems";
import UsersProvider from "./hooks/useUsers";

function App() {
  return (
    <>
      <AuthProvider>
        <UsersProvider>
          <ItemsProvider>
            <NavBar />
            <AppRouter />
          </ItemsProvider>
        </UsersProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
