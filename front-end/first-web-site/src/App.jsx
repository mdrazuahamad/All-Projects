import { Router } from "@reach/router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Task from "./pages/Task";

const App = () => {
  return (
    <Router>
      <Home path='/' />
      <About path='/about' />
      <Contact path='/contact' />
      <Task path='/task' />
    </Router>
  );
};

export default App;
