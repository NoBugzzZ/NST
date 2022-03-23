import React from "react";
import { Navigator, Paper, ApplicationForm } from "./components";

function App() {
  return (
    <div className="App">
      <Navigator />
      <Paper>
        <ApplicationForm />
      </Paper>
    </div>
  );
}

export default App;
