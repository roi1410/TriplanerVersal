import React, { useContext, useEffect } from "react";
import { CurrentContext } from "../../../../../context/CurrentContext";
import { GeneralContext } from "../../../../../context/GeneralContext";
import Skeleton from "react-loading-skeleton";
import { removeItem } from "../../../../../utils/CRUDService";

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
      <ul>
        {isLoading ? (
          <>
            <Skeleton count={5} className="outlined-card" />
          </>
        ) : (
          currentDay &&
          currentDay.day &&
          currentDay.Events &&
          (currentDay.Events.length > 0 ? (
            currentDay.Events.map((event, index) => (
              <li className="outlined-card" key={index}>
                <h4>{event.eventName}</h4>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveEvent(index)}
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>You haven't assigned any event to this day</p>
          ))
        )}
      </ul>
    </div>
  );
}

export default MyDay;
