import React from "react";
import { Router } from "@reach/router";
import Application from "./pages/Application";
import UserProvider, { UserContext } from "./providers/UserProvider";
function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}
export default App;
