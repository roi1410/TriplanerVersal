import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GeneralContext } from "../../context/GeneralContext";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import {
  CreateDateFromMinMax,
  createItem,
  getItemsWithFilter,
  updateItem,
} from "../../utils/CRUDService";
import Modal from "react-modal";
import { CurrentContext } from "../../context/CurrentContext";
import { MdEdit } from "react-icons/md";
import "./dashboard.css";
import { format, addDays } from "date-fns";

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
  const { user, setUser, areas, setAreas, isLoading, setIsLoading, setGoBack } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));

  const [areaIndex, setAreaIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      setGoBack("/dashboard");
    }
  }, [user.id]);


  const handleChooseFlight = () => {
    navigate("flights");
  };

  const handleAreaChange = (event) => {
    const newAreas = [...areas];
    newAreas[areaIndex].areaName = event.target.value;
    setAreas(newAreas);
  };

  const handleAreaSubmit = () => {
    if (areas[areaIndex].id === currentArea.id && areas[areaIndex].id) {
      updateItem("area", currentArea.id, areas[areaIndex])
        .then((response) => {
          CreateDateFromMinMax(startDate, endDate, currentTrip.id, {
            areaId: currentArea.id,
          });
          setCurrentArea(response.data);
          closeModal();
        })
        .catch((err) => console.log(err));
    } else {
      createItem("area", currentTrip.id, areas[areaIndex])
        .then((response) => {
          CreateDateFromMinMax(startDate, endDate, currentTrip.id, {
            areaId: currentArea.id,
          });
          setCurrentArea(response.data);
          closeModal();
        })
        .catch((err) => console.log(err));
    }
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
  }, [currentTrip, currentArea]);

  const handleAreaEdit = (event, index) => {
    event.stopPropagation();
    setCurrentArea(areas[index]);
    openModal(index);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setStartDate(selectedDate);
    if (selectedDate > endDate) {
      setEndDate(addDays(selectedDate, 1));
    }
  };

  const handleEndDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setEndDate(selectedDate);
  };

  return (
    <div>
      <div className="cards-container-center">
        <div className="flight-location-container">
          <div className="filled-card small-card" onClick={handleChooseFlight}>
            <p>Add Flight To...</p>
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
                    <button
                      className="outlined-button edit icon"
                      onClick={(event) => handleAreaEdit(event, index)}
                    >
                      <MdEdit />
                    </button>
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
                    defaultValue={currentArea.areaName || ""}
                    onChange={(event) => handleAreaChange(event)}
                  />
                  <div className="date-inputs">
                    <label htmlFor="start-date">
                      Start Date
                      <input
                        type="date"
                        id="start-date"
                        value={format(startDate, "yyyy-MM-dd")}
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={handleStartDateChange}
                      />
                    </label>

                    <label htmlFor="end-date">
                      End Date
                      <input
                        type="date"
                        id="end-date"
                        value={format(endDate, "yyyy-MM-dd")}
                        min={format(startDate, "yyyy-MM-dd")}
                        onChange={handleEndDateChange}
                      />
                    </label>
                  </div>
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
                    <p> Add Flight To...</p>
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
