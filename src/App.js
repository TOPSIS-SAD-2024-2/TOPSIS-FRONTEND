import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.js"; // Página inicial


import TopsisFormPage from "./pages/TopsisFormPage/topsisFormPage.js";
import ResultPage from "./pages/ResultPage/resultPage.js";
import Footer from "./layout/footer/footer.js";
import Guide from "./pages/guide/guide.js";
function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/guide" element={<Guide />} />

        <Route path="/TopsisForm" element={<TopsisFormPage />} />

        <Route path="/Result" element={<ResultPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
