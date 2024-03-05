import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "react-loading-skeleton";

function Dashboard() {
  const { user, trips, setTrips, currentTrip, setCurrentTrip } =
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
    if (!user.id) {
      navigate("trip-planner");
    }
  }, []);

  return (
    <div className="trips-container">
      <button className="dashed-card" onClick={() => handlePlanTrip(-1)}>
        Start A New Trip
      </button>
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
