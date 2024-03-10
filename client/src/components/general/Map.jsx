import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useContext } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";
import { GeneralContext } from "../../context/GeneralContext";
import { CurrentContext } from "../../context/CurrentContext";

export default function Map({ mapType, handleSubmit ,setdate,today,PNG}) {
  const iconUrl = "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png";
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const { hotels, events, setEvents, mapRef, search, setSearch, setIsLoading } =
    useContext(GeneralContext);
    const { currentArea, setCurrentArea } = useContext(CurrentContext);


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

  return (
    <>
      <div className="map-inputs">
        <input
          type="text"
          placeholder="Enter Location"
          defaultValue={currentArea.areaName}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primary-button" onClick={() => handleSubmit(search)}>
          Submit
        </button>
        <button className="outlined-button" onClick={showMyLocation}>
          Locate Me
        </button>
      </div>

      {mapType === "hotels" && (
        <div className="map-inputs">
          Check-In
          <input
            type="date"
            onChange={(e) =>
              setdate({ ...date, checkIn: new Date(e.target.value) })
            }
            defaultValue={today.toISOString().substring(0, 10)}
          />
          Check-Out
          <input
            type="date"
            onChange={(e) =>
              setdate({ ...date, checkOut: new Date(e.target.value) })
            }
            defaultValue={today.toISOString().substring(0, 10)}
          />
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
          hotels.map((hotel, hotelIndex) => {
            return (
              hotel.lat &&
              hotel.long && (
                <Marker
                  key={hotelIndex}
                  icon={customIcon}
                  position={[hotel.lat, hotel.long]}
                >
                  <Popup>{hotel.name}</Popup>
                </Marker>
              )
            );
          })}
        {events &&
          events.map((event, eventIndex) => {
            return (
              event?.lat &&
              event?.long && (
                <Marker
                  key={eventIndex}
                  icon={customIcon}
                  position={[event.lat, event.long]}
                >
                  <Popup>{event && renderIntoPopUp(event)}</Popup>
                </Marker>
              )
            );
          })}

        <MapView />
      </MapContainer>
    </>
  );
}
