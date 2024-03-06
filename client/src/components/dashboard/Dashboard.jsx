import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "react-loading-skeleton";
import { checkForUser } from "../../utils/AuthService";

function Dashboard() {
  const { user, setUser, trips, setTrips, currentTrip, setCurrentTrip } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handlePlanTrip = (index) => {
    if (index === -1) {
      setCurrentTrip({});
    } else {
      const tempTrip = trips[index];
      setCurrentTrip(tempTrip);
    }
    navigate("trip-planner");
  };

  useEffect(() => {
    // send request to server to update setTrips
    // setTrips(response.data)
  }, [currentTrip]);

  useEffect(() => {
    checkForUser().then((response) => {
      if (response.data) {
        setUser(response.data);
      } else {
        logout();
        navigate("/");
        alert("Your previous session has ended, please login again.");
      }
    });
  }, []);

  return (
    <div className="cards-container">
      <div className="dashed-card" onClick={() => handlePlanTrip(-1)}>
        Start A New Trip
      </div>
      <div className="trips">
        {trips ? (
          trips.map((trip, index) => (
            <div
              className="filled-card"
              key={index}
              onClick={(index) => handlePlanTrip(index)}
            >
              {trip} || <Skeleton />
            </div>
          ))
        ) : (
          <p>You haven't planned any trips yet</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
