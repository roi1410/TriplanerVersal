import { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { fetchPlace, fetchPlaceLanLon } from "../../../../utils/MapService";
import eventlPNG from "../../../../assets/event.png"
import Map from "../../../general/Map";

function Events() {
  
  const { isGuest, setUser, events, mapRef, sendToLocation, setEvents } =
    useContext(GeneralContext);
  const today = new Date();
  const [date, setdate] = useState({
    checkIn: today.toISOString().substring(0, 10),
    checkOut: today.toISOString().substring(0, 10),
  });

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("eventsDisplay")));
  }, []);

  async function handleSubmitEvents(search) {
    const res = await fetchPlaceLanLon(search);
    console.log(search);

    if (res.region_id && res.coordinates) {
      sendToLocation(res.coordinates);

      const res2 = await fetchPlace(res.coordinates);

      if (res2) {
        setEvents(res2.filter((elm) => elm !== null));
        console.log(res2);
        localStorage.setItem("eventsDisplay", JSON.stringify(events));
      }
    }
  }

  return (
    <div>
      <button onClick={() => console.log(events)}>test</button>
      <div className="hotels-container">
        <div className="cards-container">
          {events ? (
            events.map((event, index) => {
              return (
                <div key={index} className="filled-card">
                  <h4>{event.name}</h4>
                  {event.image && <img src={event.image} alt="ops" />}

                  {event.website && (
                    <a href={event.website} target="_blank">Go to website</a>
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
