import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";
import CreateQuiz from "./pages/Create";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateQuiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
