import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;