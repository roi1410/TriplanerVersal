import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import Skeleton from "react-loading-skeleton";
import Modal from "react-modal";
import { createItem, getItemsWithFilter } from "../../utils/CRUDService";
import { CurrentContext } from "../../context/CurrentContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2rem 1.5rem",
    borderRadius: "0.5rem",
  },
};

function Dashboard() {
  const { user, setUser, trips, setTrips, isLoading, setIsLoading } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip } = useContext(CurrentContext);
  const [tripData, setTripData] = useState({});

  const navigate = useNavigate();

  const handleCreateTrip = () => {
    console.log(tripData);
    createItem("trip", user.id, tripData)
      .then((response) => {
        setCurrentTrip(response.data);
        navigate("trip-planner");
      })
      .catch((err) => console.log(err));
  };
  

  const handlePlanTrip = async(index) => {
    console.log(index);
    if (index === -1) {
      setCurrentTrip({});
    } else {
      const tempTrip = trips[index];
      console.log(tempTrip);
      setCurrentTrip(tempTrip);
    }
    navigate("trip-planner");
  };

  useEffect(() => {
    getItemsWithFilter("trip", { userId: user.id })
      .then((response) => {
        setTrips(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentTrip]);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="cards-container">
      <div className="dashed-card" onClick={openModal}>
        <p>Start A New Trip</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Choose Trip Data Modal"
        appElement={document.getElementById("root")}
      >
        <input
          type="text"
          placeholder="Enter Trip Name..."
          onChange={(e) =>
            setTripData({ ...tripData, tripName: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Enter Budget..."
          onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
        />
        <div className="modal-buttons">
          <button onClick={closeModal} className="outlined-button">
            Cancel
          </button>
          <button onClick={() => handleCreateTrip()} className="primary-button">
            Submit
          </button>
        </div>
      </Modal>
      <div className="trips">
        {!isLoading ? (
          trips.length > 0 ? (
            trips.map((trip, index) => (
              <div
                className="filled-card"
                key={index}
                onClick={() => handlePlanTrip(index)}
              >
                <h2>{trip.tripName}</h2>
              </div>
            ))
          ) : (
            <p>You haven't planned any trips yet</p>
          )
        ) : (
          <Skeleton count={5} className="filled-card" />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
