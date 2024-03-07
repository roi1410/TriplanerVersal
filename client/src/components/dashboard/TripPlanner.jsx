import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../context/GeneralContext";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { createItem, getItemsWithFilter } from "../../utils/CRUDService";
import Modal from "react-modal";
import { CurrentContext } from "../../context/CurrentContext";
import "./dashboard.css";

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

function TripPlanner() {
  const { user, setUser, areas, setAreas, isLoading, setIsLoading } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);

  const [areaIndex, setAreaIndex] = useState(-1);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };
  const handleChooseFlight = () => {
    navigate("flights");
  };

  const handleAreaChange = (event) => {
    const newAreas = [...areas];
    newAreas[areaIndex].areaName = event.target.value;
    setAreas(newAreas);
  };

  const handleAreaSubmit = () => {
    createItem("area", currentTrip.id, areas[areaIndex])
      .then((response) => {
        setCurrentArea(response.data);
        closeModal();
      })
      .catch((err) => console.log(err));
  };
  const handleChooseArea = (index) => {
    const tempArea = areas[index];
    setCurrentArea(tempArea);
    navigate("area/overview");
  };

  const handlePayment = () => {
    navigate("payment");
  };

  const handleAddLocation = (index) => {
    const newAreas = [...areas];
    newAreas.splice(index + 1, 0, { areaName: "" });
    setAreas(newAreas);
  };
  const handleRemoveLocation = (index) => {
    const newAreas = [...areas];
    newAreas.splice(index, 1);
    setAreas(newAreas);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(index) {
    setAreaIndex(index);
    setIsOpen(true);
  }
  function closeModal() {
    setAreaIndex(-1);
    setIsOpen(false);
  }

  useEffect(() => {
    getItemsWithFilter("area", { tripId: currentTrip.id })
      .then((response) => {
        if (response.data.length > 0) {
          setAreas(response.data);
        } else {
          setAreas([{ areaName: "" }]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [currentTrip]);

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
          {areas.length > 0 &&
            areas.map((location, index) => (
              <div key={index} className="flight-location-container">
                {areas[index].areaName == "" ? (
                  <div className="filled-card" onClick={() => openModal(index)}>
                    <h2>Enter Location</h2>{" "}
                  </div>
                ) : (
                  <div
                    className="filled-card"
                    onClick={() => handleChooseArea(index)}
                  >
                    <h2>{location.areaName}</h2>
                  </div>
                )}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Choose Area Modal"
                  appElement={document.getElementById("root")}
                  index={index}
                >
                  <input
                    type="text"
                    placeholder="Enter Location..."
                    onChange={(event) => handleAreaChange(event)}
                  />
                  <div className="modal-buttons">
                    <button onClick={closeModal} className="outlined-button">
                      Cancel
                    </button>
                    <button
                      onClick={handleAreaSubmit}
                      className="primary-button"
                    >
                      Submit
                    </button>
                  </div>
                </Modal>
                <div className="flight-location">
                  <div
                    className="filled-card small-card"
                    onClick={() => handleChooseFlight(index)}
                  >
                    Add Flight To...
                  </div>
                  <button
                    className="primary-button icon small-card"
                    onClick={() => handleAddLocation(index)}
                  >
                    <FaPlus />
                  </button>
                  {index > 0 && (
                    <button
                      className="delete-button icon small-card"
                      onClick={() => handleRemoveLocation(index)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <button className="primary-button" onClick={handlePayment}>
        Payment
      </button>
    </div>
  );
}

export default TripPlanner;
