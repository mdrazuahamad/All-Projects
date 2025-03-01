import { Router } from "@reach/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Home path='/' />
      <About path='/about' />
      <Contact path='/contact' />
    </Router>
  );
};

export default App;
