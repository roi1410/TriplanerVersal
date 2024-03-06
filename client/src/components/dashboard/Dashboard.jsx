import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Skeleton from "react-loading-skeleton";
import { checkForUser } from "../../utils/AuthService";
import Modal from "react-modal";
import { createItem } from "../../utils/CRUDService";
// Modal.setAppElement('#yourAppElement');


const customStyles = {
  content: {
    display:"flex",
    flexDirection:"column",
    gap:"2rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding:"2rem 1.5rem",
    borderRadius:"0.5rem",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--secondary-300)",
  },
};

function Dashboard() {
  // let subtitle;
  const { user, setUser, trips, setTrips, currentTrip, setCurrentTrip } =
    useContext(AppContext);
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
        Start A New Trip
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Choose Trip Data Modal"
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
