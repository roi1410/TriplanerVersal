import React, { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CurrentContext } from "../../../../context/CurrentContext";
import { format } from "date-fns";
import { getItemsWithFilter } from "../../../../utils/CRUDService";
import Skeleton from "react-loading-skeleton";
import hotelPNG from "../../../../assets/image.png";
import Map from "../../../general/Map";

function Overview() {
  const { user, setUser, areas, setAreas, isLoading, setIsLoading,setGoBack } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);
  const [allShownDays, setAllShownDays] = useState([]);
  const events = [
    {
      address:
        "The Garden Tomb, Bab a-Zahara, Jerusalem, Jerusalem Subdistrict, Israel",
      contact: "+972 - 2 -539 -8100",
      lat: 31.783752200000002,
      long: 35.23037041949922,
      name: "גַן הַקֶבֶר",
      openingHours: "Mo-Sa 08:30-17:30",
      type: "leisure",
    },
    {
      address:
        "Palestine Museum of Natural History, شارع القدس-الخليل, Bethlehem, Palestinian Territory",
      contact: "+970 (02) 277-3553",
      lat: 31.7178605,
      long: 35.2054099,
      name: "متحف فلسطين للتاريخ الطبيعي",
      openingHours: "24/7",
      type: "entertainment",
      website: "https://www.palestinenature.org",
    },
  ];


  const hotels = [
    {
      checkIn: "2024-03-10",
      checkOut: "2024-03-10",
      hotelName: "Theatron Jerusalem Hotel & Spa MGallery Collection",
      image:
        "https://images.trvl-media.com/lodging/92000000/91670000/91660800/91660710/b32d02cd.jpg?impolicy=resizecrop&rw=455&ra=fit",
      lat: 31.768717,
      long: 35.214667,
      price: "$349",
    },
    {
      checkIn: "2024-03-10",
      checkOut: "2024-03-10",
      hotelName: "All Seasons Boutique Hotel - Jerusalem",
      image:
        "https://images.trvl-media.com/lodging/94000000/93460000/93452500/93452491/6f56ccfa.jpg?impolicy=resizecrop&rw=455&ra=fit",
      lat: 31.786844,
      long: 35.23264,
      price: "$150",
    },
  ];

  // setGoBack("/dashboard")


  // useEffect(() => {
  //   getAreaDays()
  // }, [])


  // const getAreaDays = async () => {
  //   const alldays = await getItemsWithFilter("day", { areaId:currentArea.id})
  //   console.log(alldays);
  //   setAllShownDays(alldays.data)
  // }


  useEffect(()=>{
console.log(allShownDays);
  },[allShownDays])

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
                ) : hotels && events ? (
                  <>
                    {events.map((event, index) => (
                      <div key={index} className="filled-card">
                        <h4>{event.name}</h4>
                        {event.image && <img src={event.image} alt="ops" />}

                        {event.website && (
                          <a
                            href={event.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Go to website
                          </a>
                        )}
                        {event.openingHours && (
                          <span>Opening Hours: {event.openingHours}</span>
                        )}
                        {event.contact && (
                          <span>Phone Number: {event.contact}</span>
                        )}
                        <span>Address: {event.address}</span>
                        <button onClick={() => eventAddToTrip(event)}>
                          Add to trip
                        </button>
                      </div>
                    ))}

                    {hotels.map((hotel, index) => (
                      <div key={index} className="filled-card">
                        <h4>{hotel.hotelName}</h4>
                        <img src={hotel.image} alt="" />
                        <span className="checkedInAndOut">
                          Check-In: {hotel.checkIn} _______________ Check-Out:{" "}
                          {hotel.checkOut}
                        </span>
                        <span className="price">Price: {hotel.price}</span>
                        <button onClick={() => addHotelToTrip(hotel)}>
                          Add to favorites
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Location not found, please try again</p>
                )}
              </div>
            </div>
          </div>
          <div className="map-container">
            <Map
              mapType={"overview"}
              PNG={hotelPNG}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
