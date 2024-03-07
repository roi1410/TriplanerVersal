import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { createItem } from "../../utils/CRUDService";
import Modal from "react-modal";
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
  const { isGuest, user, setUser, currentTrip, setCurrentTrip } =
    useContext(AppContext);
  const [area, setArea] = useState([{ areaName: "" }]);
  const [areaIndex , setAreaIndex] = useState(-1);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard");
  };
  const handleChooseFlight = () => {
    navigate("flights");
  };

  const handleAreaChange = (event) => {
    const newAreas = [...area];
    newAreas[areaIndex].areaName = event.target.value;
    setArea(newAreas);
   };   

  const handleChooseArea = () => {
    createItem("area", currentTrip.id, area[areaIndex])
      .then((response) => {
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handlePayment = () => {
    navigate("payment");
  };

  const handleAddLocation = (index) => {
    const newAreas = [...area];
    newAreas.splice(index + 1, 0, { areaName: "" });
    setArea(newAreas);
   };   
  const handleRemoveLocation = (index) => {
    const newAreas = [...area];
    newAreas.splice(index, 1);
    setArea(newAreas);
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

          {area &&
            area.map((location, index) => (
              <div key={index} className="flight-location-container">
                {area[index].areaName == "" ? (
                  <div className="filled-card" onClick={()=>openModal(index)}>
                    <h2>Enter Location</h2>{" "}
                  </div>
                //  <div>
                //     <input
                //       type="text"
                //       placeholder="Enter Location..."
                //       onChange={(event) => handleAreaChange(event, index)}
                //     />
                //     <div className="modal-buttons">
                //       <button onClick={closeModal} className="outlined-button">
                //         Cancel
                //       </button>
                //       <button
                //         onClick={() => handleChooseArea(index)}
                //         className="primary-button"
                //       >
                //         Submit
                //       </button>
                //     </div>
                //  </div>
                ) : (
                  <div
                    className="filled-card"
                    onClick={()=>navigate("area/overview")}
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
                      onClick={handleChooseArea}
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
