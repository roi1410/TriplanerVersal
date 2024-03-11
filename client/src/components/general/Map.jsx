import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useContext, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";
import { GeneralContext } from "../../context/GeneralContext";
import hotelPNG from "../../assets/image.png";
import { CurrentContext } from "../../context/CurrentContext";

export default function Map({
  mapType,
  handleSubmit,
  setdate,
  allShownDays,
  PNG,
  PNG2,
}) {
  const today = new Date();
  const iconUrl = "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png";
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const {
    hotels,
    events,
    setEvents,
    mapRef,
    search,
    setSearch,
    setIsLoading,
    isLoading,
  } = useContext(GeneralContext);
  const { currentArea } = useContext(CurrentContext);
  const ZOOM_LEVEL = 9;
  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  const customIcon = new L.Icon({
    //creating a custom icon to use in Marker
    iconUrl: PNG,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });
  const hotelIcon = new L.Icon({
    //creating a custom icon to use in Marker
    iconUrl: hotelPNG,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView({}) {
    let map = useMap();
    return null;
  }

  function renderIntoPopUp(event) {
    if (event?.image) {
      return (
        <div>
          <h1>{event.name}</h1>
          <span>{event.address}</span>
          <img
            className=" box-border bg-contain h-[20vh] w-[10vw]"
            src={event.image}
            alt=""
          />
        </div>
      );
    } else if (event?.website) {
      return (
        <div>
          <h1>{event.name}</h1>
          <span>{event.address}</span>
          <iframe src={event.website} frameBorder="0"></iframe>
        </div>
      );
    }
  }

  //   to search for the first entered location
  useEffect(() => {
    if (search == "" && mapType != "overview") {
      setIsLoading(true);
      handleSubmit(currentArea.areaName);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {mapType !== "overview" && (
        <div className="map-inputs">
         <div>
            <input
              type="text"
              placeholder="Enter Location"
              onChange={(e) => setSearch(e.target.value)}
            />
           <div>
              <button
                className="primary-button"
                onClick={() => handleSubmit(search)}
              >
                Submit
              </button>
              <button className="outlined-button" onClick={showMyLocation}>
                Locate Me
              </button>
           </div>
         </div>

          {mapType === "hotels" && (
            <div>
             <label>
                Check-in
                <input
                  type="date"
                  onChange={(e) =>
                    setdate((date) => ({
                      ...date,
                      checkIn: new Date(e.target.value),
                    }))
                  }
                  defaultValue={today.toISOString().substring(0, 10)}
                />
             </label>
             <label>
                Check-out
                <input
                  type="date"
                  onChange={(e) =>
                    setdate((date) => ({
                      ...date,
                      checkOut: new Date(e.target.value),
                    }))
                  }
                  defaultValue={today.toISOString().substring(0, 10)}
                />
             </label>
            </div>
          )}
        </div>
      )}

      <MapContainer
        ref={mapRef}
        className="map"
        center={center}
        zoom={ZOOM_LEVEL}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
          contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.loaded && !location.error && (
          <Marker
            icon={customIcon}
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>{"my Location"}</Popup>
          </Marker>
        )}
        {hotels &&
          mapType === "hotels" &&
          hotels.map((hotel, key) => {
            return (
              hotel.lat &&
              hotel.long && (
                <Marker
                  key={key}
                  icon={hotelIcon}
                  position={[hotel.lat, hotel.long]}
                >
                  <Popup>{hotel.name}</Popup>
                </Marker>
              )
            );
          })}
        {events &&
          mapType === "events" &&
          events.map((event, key) => {
            return (
              event?.lat &&
              event?.long && (
                <Marker
                  key={key}
                  icon={customIcon}
                  position={[event.lat, event.long]}
                >
                  <Popup>{event && renderIntoPopUp(event)}</Popup>
                </Marker>
              )
            );
          })}
          {allShownDays&&mapType==="overview"&&
          allShownDays.map((event))}

        <MapView />
      </MapContainer>
    </>
  );
}
