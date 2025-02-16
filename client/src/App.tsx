import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { Toaster } from "@/components/ui/toaster";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
