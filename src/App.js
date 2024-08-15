
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinsList from "./components/CoinsList";
import Landing from "./components/Landing";
import CoinDetails from './components/CoinDetails';



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<CoinsList />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
