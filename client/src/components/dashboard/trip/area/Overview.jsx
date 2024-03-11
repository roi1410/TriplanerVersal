import React, { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CurrentContext } from "../../../../context/CurrentContext";
import { format } from "date-fns";
import { getItemsWithFilter } from "../../../../utils/CRUDService";
import Skeleton from "react-loading-skeleton";
import hotelPNG from "../../../../assets/image.png";
import Map from "../../../general/Map";
import FlightsSummery from "./FlightsSummery";

function Overview() {
  const { user, setUser, areas, setAreas, isLoading, setIsLoading, setGoBack } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);
  const [allShownDays, setAllShownDays] = useState([]);
  const [allEventHotels, setAllEventHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);

  // setGoBack("/dashboard")

  useEffect(() => {
    if (Object.keys(currentTrip).length > 0) {
      if (Object.keys(currentArea).length > 0) {
        const res = getAreaDays();
        res && setIsLoading(false);
      }
    }
  }, [currentTrip, currentArea]);

  const getAreaDays = async () => {
    const alldays = await getItemsWithFilter("area", { id: currentArea.id });
    setAllEventHotels(alldays.data[0]);

    setAllShownDays(alldays.data[0].Days);
    return alldays;
  };

  useEffect(() => {
    console.log(allShownDays);
  }, [allShownDays]);

  return (
    <div>
      {/* {allShownDays.map((v) => (
        <div>
          <span>{v.day}</span>

      {
        allShownDays.map((day , dayIndex)=>
        <div key={dayIndex}>
          <span>{day.day}</span>

        </div>
      ))} */}
      <div>
        <div className="hotels-container">
          <div className="cards-container">
            <div className="hotels-container">
              <div className="cards-container">
                {isLoading ? (
                  // Loader
                  <Skeleton className="filled-card" count={20} />
                ) : allShownDays ? (
                  <>
                    {allShownDays.map((day, index) => {
                      return (
                        <div key={index} className="filled-card">
                              <h1>day {index + 1}</h1>

                          {day?.Flights &&
                            day.Flights.map((flightRawData) => {
                              const flight = JSON.parse(
                                flightRawData.flightInfo
                              );

                              const startFlight = flight[0];
                              const endFlight = flight[-1];
                              console.log(flight);
                              return (
                                <>
                                  <FlightsSummery
                                    flights={flight.flights}
                                    price={flight.price}
                                  />
                                </>
                              );
                            })}
                          {day.Hotel?.hotelInfo && (
                            <>
                          

                              <h4>{day.Hotel.hotelInfo.hotelName}</h4>
                              <img src={day.Hotel.hotelInfo.image} alt="" />
                              <span className="checkedInAndOut">
                                Check-In: {day.Hotel.hotelInfo.checkIn}{" "}
                                _______________ Check-Out:{" "}
                                {day.Hotel.hotelInfo.checkOut}
                              </span>
                              <span className="price">
                                Price: {day.Hotel.hotelInfo.price}
                              </span>

                            </>
                          )}
                          ________________________________________________________________
                          {day.Events &&
                            day.Events.map((event, index) => {
                              const parseEv = JSON.parse(event.eventInfo);

                              return (
                                parseEv && (
                                  <div key={index} className="filled-card">
                                    <>
                                      <h1>Event</h1>
                                      <h4>{parseEv.name}</h4>
                                      {parseEv.image && (
                                        <img src={parseEv.image} alt="ops" />
                                      )}

                                      {parseEv.website && (
                                        <a
                                          href={parseEv.website}
                                          target="_blank"
                                        >
                                          Go to website
                                        </a>
                                      )}
                                      {parseEv.openingHours && (
                                        <>
                                          <span>
                                            openingHours-
                                            {parseEv.openingHours}
                                          </span>
                                        </>
                                      )}
                                      {parseEv.contact && (
                                        <>
                                          <span>
                                            phon Number-{parseEv.contact}
                                          </span>
                                        </>
                                      )}
                                      <span>Address-{parseEv.address}</span>
                                    </>
                                  </div>
                                )
                              );
                            })}

                        </div>
                      );
                    })}
                  </>
                ) : (
                  <p>Location not found, please try again</p>
                )}
              </div>
            </div>
          </div>
          <div className="map-container">
            <button
              onClick={() =>
                console.log(JSON.parse(allShownDays[0].Flights[0].flightInfo))
              }
            >
              test
            </button>
            {/* <Map
              allEventHotels={allEventHotels}
              mapType={"overview"}
              PNG={hotelPNG}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
