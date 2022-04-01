import React from "react";
import { Navigator } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigator />
      <Outlet />
      {/* <Paper>
        <ApplicationForm />
      </Paper> */}

    </div>
  );
}

export default App;
