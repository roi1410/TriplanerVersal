import { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { fetchPlace, fetchPlaceLanLon } from "../../../../utils/MapService";
import eventlPNG from "../../../../assets/event.png";
import Map from "../../../general/Map";
import Skeleton from "react-loading-skeleton";
import { createItem } from "../../../../utils/CRUDService";
import { CurrentContext } from "../../../../context/CurrentContext";

function Events() {
  const {
    isGuest,
    setUser,
    events,
    mapRef,
    sendToLocation,
    setEvents,
    isLoading,
    setIsLoading,
  } = useContext(GeneralContext);
  const { currentArea } = useContext(CurrentContext);
  const today = new Date();
  const [date, setdate] = useState({
    checkIn: today.toISOString().substring(0, 10),
    checkOut: today.toISOString().substring(0, 10),
  });

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("eventsDisplay")));
  }, []);
  async function setItemLocalStorage() {
    localStorage.setItem("eventsDisplay", JSON.stringify(events));
  }

  async function handleSubmitEvents(search) {
    setIsLoading(true);
    const res = await fetchPlaceLanLon(search);
    console.log(search);

    if (res.region_id && res.coordinates) {
      sendToLocation(res.coordinates);

      const res2 = await fetchPlace(res.coordinates);

      if (res2) {
        setEvents(res2.filter((elm) => elm !== null));
        setItemLocalStorage()
        setIsLoading(false);
      }
    }
  }
  async function eventAddToTrip(data) {
    const res = await createItem("event", currentArea.id, {
      eventName: data.name,
      eventInfo: JSON.stringify(data),
    });
    console.log(res);
  }

  return (
    <div>
      <button onClick={() => console.log(events)}>test</button>
      <div className="hotels-container">
        <div className="cards-container">
          {isLoading ? (
            // Loader
            <Skeleton className="filled-card" count={20} />
          ) : events ? (
            events.map((event, index) => {
              return (
                <div key={index} className="filled-card">
                  <h4>{event.name}</h4>
                  {event.image && <img src={event.image} alt="ops" />}

                  {event.website && (
                    <a href={event.website} target="_blank">
                      Go to website
                    </a>
                  )}
                  {event.openingHours && (
                    <>
                      <span>openingHours-{event.openingHours}</span>
                    </>
                  )}
                  {event.contact && (
                    <>
                      <span>phon Number-{event.contact}</span>
                    </>
                  )}
                  <span>Address-{event.address}</span>
                  <button onClick={() => eventAddToTrip(event)}>
                    add to trip
                  </button>
                </div>
              );
            })
          ) : (
            <div className="filled-card"> no events provided</div>
          )}

          <></>
        </div>
        <div className="map-container">
          <Map
            mapType={"events"}
            handleSubmit={handleSubmitEvents}
            sendToLocation={sendToLocation}
            setdate={setdate}
            today={today}
            PNG={eventlPNG}
          />
        </div>
      </div>
    </div>
  );
}

export default Events;
