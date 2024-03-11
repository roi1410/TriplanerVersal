import React, { useContext, useEffect } from "react";
import { CurrentContext } from "../../../../../context/CurrentContext";
import { GeneralContext } from "../../../../../context/GeneralContext";
import Skeleton from "react-loading-skeleton";
import { removeItem } from "../../../../../utils/CRUDService";
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

function MyDay({ setUpdateDay, updateDay }) {
  const { currentArea, currentDay, setCurrentDay } = useContext(CurrentContext);
  const { myDays, setMyDays, isLoading, setIsLoading } =
    useContext(GeneralContext);

  const handleRemoveEvent = async (index) => {
    const removedEvent = currentDay.Events[index];
    const response = await removeItem("day", currentDay.id, {
      events: [removedEvent.id],
    });
    console.log(response);
    setUpdateDay(!updateDay);
  };

  return (
    <div className="cards-container-center">
      {isLoading ? (
        <Skeleton count={5} className="outlined-card" />
      ) : (
        currentDay &&
        currentDay.day &&
        currentDay.Events &&
        (currentDay.Events.length > 0 ? (
          currentDay.Events.map((event, index) => (
            <div className="outlined-card added-event" key={index}>
              <div className="info">
                <h4 className="bold">{event.eventName}</h4>
                {JSON.parse(event.eventInfo).openingHours && (
                  <>
                    <div>
                      <p>
                        <FaClock />
                      </p>
                      <span>{JSON.parse(event.eventInfo).openingHours}</span>{" "}
                    </div>
                  </>
                )}
                <div>
                  <p>
                    <FaLocationDot />
                  </p>
                  <span>{JSON.parse(event.eventInfo).address}</span>{" "}
                </div>
              </div>

              <button
                className="delete-button"
                onClick={() => handleRemoveEvent(index)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>You haven't assigned any event to this day</p>
        ))
      )}
    </div>
  );
}

export default MyDay;
