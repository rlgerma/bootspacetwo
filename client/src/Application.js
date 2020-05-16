import React from "react";
import App from "./pages/App";
import UserProvider from "./providers/UserProvider";
function Application() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
export default Application;
