import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Notes from "./notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
