// Library imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Custom imports
import Home from "./pages/home";
import Login from "./pages/login";
import Error from "./pages/error";
import Register from "./pages/register";
import Food from "./pages/food";

function App() {
  return (
    <BrowserRouter basename="/smart_diet_tracker_web_frontend">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />} />
        <Route path="/register" element={<Register />} />
        <Route path="/food" element={<Food />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
