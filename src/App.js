import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.js"; // Página inicial


import TopsisFormPage from "./pages/TopsisFormPage/topsisFormPage.js";
import ResultPage from "./pages/ResultPage/resultPage.js";
import Footer from "./layout/footer/footer.js";
function App() {
  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/TopsisForm" element={<TopsisFormPage />} />

        <Route path="/Result" element={<ResultPage />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
