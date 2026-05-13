import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ResumePage from "./ResumePage";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}
