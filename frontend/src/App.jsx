import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
