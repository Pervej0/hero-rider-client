import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/Shared/Header/Header";
import RiderSignUp from "./Component/Register/RiderSignUp/RiderSignUp";
import LearnerSignUp from "./Component/Register/LearnerSignUp/LearnerSignUp";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="riderSignup" element={<RiderSignUp />} />
        <Route path="learnerSignup" element={<LearnerSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
