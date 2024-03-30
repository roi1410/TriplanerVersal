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
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import placeholderImage from "../../../../../assets/placeholder.jpg";
import "./day.css";

function MyEvents({ setUpdateDay, updateDay }) {
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
    <div className="cards-container-center">
      {isLoading ? (
        <div className="skeleton-container">
          <Skeleton className="filled-card my-day-sk" count={5} />
        </div>
      ) : myEvents && myEvents.length > 0 ? (
        myEvents.map((event, index) => (
          <div
            key={index}
            className="filled-card add-event"
            onClick={() => handleAssignEvent(index)}
          >
            {event.image ? (
              <img src={JSON.parse(event.eventInfo).image} alt="Event image" />
            ) : (
              <img src={placeholderImage} alt="Event image" />
            )}
            <div className="info">
              <div className="event-name">
                <h4 className="bold">{event.eventName}</h4>
                {/* {JSON.parse(event.eventInfo).website && (
                    <a href={JSON.parse(event.eventInfo).website} target="_blank">
                      <FaLink />
                    </a>
                  )} */}
              </div>{" "}
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
          </div>
        ))
      ) : (
        <p>You haven't added any events to schedule on your trip</p>
      )}
    </div>
  );
}

export default MyEvents;
