import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import EncouragementPage from "./EncouragementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/encouragement" element={<EncouragementPage />} />
      </Routes>
    </Router>
  );
}

export default App;

