import { Home } from "./pages/Home";
import { PokemonInfo } from "./pages/PokemonInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-info" element={<PokemonInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
