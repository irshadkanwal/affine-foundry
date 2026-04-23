// src/App.js

import React from "react";
import UIShell from "./content/UIShell/UIShell";
import "./App.scss";

import Loading from "./components/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="app">
      <UIShell
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          success: {
            iconTheme: {
              primary: "#62AF83",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF5251",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
