import React, { useContext, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  getItemsWithFilter,
  createItem,
} from "../../../../../utils/CRUDService";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { CurrentContext } from "../../../../../context/CurrentContext";
import Skeleton from "react-loading-skeleton";

function MyEvents({setUpdateDay , updateDay}) {
  const { myEvents, setMyEvents, isLoading, setIsLoading, myDays, setMyDays } =
    useContext(GeneralContext);
  const { currentArea, currentDay, setCurrentDay, currentTrip } =
    useContext(CurrentContext);

  useEffect(() => {
    setIsLoading(true);
    getItemsWithFilter("event", { areaId: currentArea.id })
      .then((response) => {
        console.log("MY EVENTS ", response.data);
        setMyEvents(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false); // Set loading state to false after fetching data
      });
  }, [currentArea]);

  const handleAssignEvent = async (index) => {
    const assignedEvent = myEvents[index];
    const response = await createItem("day", currentTrip.id, {
      day: currentDay.day,
      events: [assignedEvent.id],
    });
    setUpdateDay(!updateDay);
  };

  return (
    <div>
      <ul className="cards-container-center">
        {isLoading ? (
          <Skeleton className="filled-card" count={5} />
        ) : myEvents && myEvents.length > 0 ? (
          myEvents.map((event, index) => (
            <li
              key={index}
              className="filled-card"
              onClick={() => handleAssignEvent(index)}
            >
              <h4>{event.eventName}</h4>
            </li>
          ))
        ) : (
          <p>You haven't added any events to schedule on your trip</p>
        )}
      </ul>
    </div>
  );
}

export default MyEvents;
