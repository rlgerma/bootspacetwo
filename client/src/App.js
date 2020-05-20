import React from "react";
import { Container } from "reactstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Application from "./pages/Application";
import UserProvider from "./providers/UserProvider";
function App() {
  return (
    <UserProvider>
      <Container>
        <NavBar />
        <Application />
        <Footer />
      </Container>
    </UserProvider>
  );
}
export default App;
