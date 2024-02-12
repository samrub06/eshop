import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
    <Header />
    <main className="py-3"> 
    <Container>
      <Outlet />
      </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
