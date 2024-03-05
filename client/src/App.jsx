import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AppContext, ContextProvider } from "./context/AppContext";
import Navbar from "./components/general/Navbar";
import Home from "./components/general/Home";
import Login from "./components/general/Login";
import Register from "./components/general/Register";
import Footer from "./components/general/Footer";
import ErrorPage from "./components/general/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";
import TripPlanner from "./components/dashboard/TripPlanner";
import Payment from "./components/dashboard/trip/Payment";
import Flights from "./components/dashboard/trip/Flights";
import Area from "./components/dashboard/trip/Area";
import Overview from "./components/dashboard/trip/area/Overview";
import Events from "./components/dashboard/trip/area/Events";
import Hotels from "./components/dashboard/trip/area/Hotels";
import DailyPlanner from "./components/dashboard/trip/area/DailyPlanner";
import MyEvents from "./components/dashboard/trip/area/day/MyEvents";
import MyHotels from "./components/dashboard/trip/area/day/MyHotels";
import { useContext } from "react";

function App() {
  const {user} = useContext(AppContext);


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
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/dashboard/trip-planner" element={<TripPlanner />}/>
              <Route path="/dashboard/trip-planner" element={<TripPlanner />}/>
              <Route path="/dashboard/trip-planner/payment" element={<Payment />} />
              <Route path="/dashboard/trip-planner/flights" element={<Flights />} />
              <Route path="/dashboard/trip-planner/area" element={<Area />}>
                  <Route path="/dashboard/trip-planner/area/overview" element={<Overview />} />
                  <Route path="/dashboard/trip-planner/area/events" element={<Events />} />
                  <Route path="/dashboard/trip-planner/area/hotels" element={<Hotels />} />
                  <Route path="/dashboard/trip-planner/area/daily-planner" element={<DailyPlanner />} />
                  <Route path="/dashboard/trip-planner/area/daily-planner/my-hotels" element={<MyHotels />} />
                  <Route path="/dashboard/trip-planner/area/daily-planner/my-events" element={<MyEvents />} />
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
