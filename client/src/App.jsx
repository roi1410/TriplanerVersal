import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ContextProvider } from "./context/AppContext";
import Navbar from "./components/general/Navbar";
import Home from "./components/general/Home";
import Login from "./components/general/Login";
import Register from "./components/general/Register";
import Footer from "./components/general/Footer";
import ErrorPage from "./components/general/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div>
      <ContextProvider>
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}>
              {/* <Route path="" element={<MyCvs />} />
              <Route path="" element={<MyCvs />} /> */}
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
