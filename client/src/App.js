import React from "react";
import { Container } from "reactstrap";
import Footer from "./components/Footer";
import Application from "./pages/Application";
import UserProvider from "./providers/UserProvider";
function App() {
  return (
    <UserProvider>
      <Container>
        <Application />
        <Footer />
      </Container>
    </UserProvider>
  );
}
export default App;
