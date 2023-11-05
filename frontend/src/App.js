import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import "./App.css";
import Navbar from "./Common/Navbar";

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
