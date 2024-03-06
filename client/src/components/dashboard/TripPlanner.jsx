import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { checkForUser } from "../../utils/AuthService";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import "./dashboard.css";
import { createItem } from "../../utils/CRUDService";
import Modal from "react-modal";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2rem 1.5rem",
    borderRadius: "0.5rem",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--secondary-300)",
  },
};
function TripPlanner() {
  const { user, setUser, currentTrip, setCurrentTrip } = useContext(AppContext);
  const [tempAreas, setTempAreas] = useState([]);
  const [area, setArea] = useState({ areaName: "" });
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };
  const handleChooseFlight = () => {
    navigate("flights");
  };
  const handleChooseArea = () => {
    console.log(currentTrip, area);
    createItem("area", currentTrip.id, area)
      .then((response) => {
        console.log(response.data);
        navigate("area/overview");
      })
      .catch((err) => console.log(err));
  };
  const handlePayment = () => {
    navigate("payment");
  };
  const handleAddLocation = (index) => {
    const newTempAreas = [...tempAreas];
    newTempAreas.splice(index, 0, index);
    setTempAreas(newTempAreas);
  };
  const handleRemoveLocation = (index) => {
    const newTempAreas = [...tempAreas];
    newTempAreas.splice(index, 1);
    setTempAreas(newTempAreas);
  };

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
    <div>
      <div className="cards-container-center">
        {user.id && (
          <IoMdArrowRoundBack onClick={handleGoBack} className="go-back" />
        )}

        <div className="flight-location-container">
          <div className="filled-card small-card" onClick={handleChooseFlight}>
            Add Flight To...
          </div>
          <div className="filled-card" onClick={openModal}>
            Add Location
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Choose Area Modal"
          >
            <input
              type="text"
              placeholder="Enter Location..."
              onChange={(e) => setArea({ ...area, areaName: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={closeModal} className="outlined-button">
                Cancel
              </button>
              <button onClick={handleChooseArea} className="primary-button">
                Submit
              </button>
            </div>
          </Modal>

          <div className="flight-location">
            <div
              className="filled-card small-card"
              onClick={handleChooseFlight}
            >
              Add Flight To...
            </div>
            <button
              className="primary-button icon small-card"
              onClick={() => handleAddLocation(0)}
            >
              <FaPlus />
            </button>
          </div>
        </div>
        {tempAreas &&
          tempAreas.map((location, index) => (
            <div key={index} className="flight-location-container">
              <div className="filled-card" onClick={openModal}>
                Add Location
              </div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Choose Area Modal"
              >
                <input
                  type="text"
                  placeholder="Enter Location..."
                  onChange={(e) =>
                    setArea({ ...area, areaName: e.target.value })
                  }
                />
                <div className="modal-buttons">
                  <button onClick={closeModal} className="outlined-button">
                    Cancel
                  </button>
                  <button onClick={handleChooseArea} className="primary-button">
                    Submit Location
                  </button>
                </div>
              </Modal>
              <div className="flight-location">
                <div
                  className="filled-card small-card"
                  onClick={handleChooseFlight}
                >
                  Add Flight To...
                </div>
                <button
                  className="primary-button icon small-card"
                  onClick={() => handleAddLocation(index)}
                >
                  <FaPlus />
                <button
                  className="delete-button icon small-card"
                  onClick={() => handleRemoveLocation(index)}
                >
                </button>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
      <button className="primary-button" onClick={handlePayment}>
        Payment
      </button>
    </div>
  );
}

export default TripPlanner;
