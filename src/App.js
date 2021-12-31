import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Header from "./Component/Shared/Header/Header";
import RiderSignUp from "./Component/Register/RiderSignUp/RiderSignUp";
import LearnerSignUp from "./Component/Register/LearnerSignUp/LearnerSignUp";
import AuthProvider from "./Context/AuthProvider";
import Dashboard from "./Component/Dashboard/Dashboard";
import Services from "./Component/Services/Services";
import SignIn from "./Component/SignIn/SignIn";
import PrivateRoute from "./Component/PrivatRouter/PrivateRouter";
import Users from "./Component/Dashboard/Users/Users";
import MakeAdmin from "./Component/Dashboard/MakeAdmin/MakeAdmin";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route
            index
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route
            path="riderSignup"
            element={
              <>
                <Header /> <RiderSignUp />
              </>
            }
          />
          <Route
            path="learnerSignup"
            element={
              <>
                <Header /> <LearnerSignUp />
              </>
            }
          />
          <Route
            path="signin"
            element={
              <>
                <Header />
                <SignIn />
              </>
            }
          />
          <Route
            path="services"
            element={
              <PrivateRoute>
                <>
                  <Header />
                  <Services />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="dashboard/users" element={<Users />} />
          <Route path="dashboard/makeAdmin" element={<MakeAdmin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
