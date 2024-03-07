import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useRef, useState, useEffect, useContext } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useGeoLocation from "../../hooks/useGeoLocation";
import {
  fetchPlaceLanLon,
  fetchNearHotels,
  fetchPlace,
} from "../../utils/MapService";
import { GeneralContext } from "../../context/GeneralContext";

export default function Map() {
  const iconUrl = "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png";
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const [search, setSearch] = useState("");
  const input = useRef();
  const { hotels, setHotels, events, setEvents } = useContext(GeneralContext);
  const ZOOM_LEVEL = 9;
  const location = useGeoLocation();
  const mapRef = useRef();

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
    iconUrl: iconUrl,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    let map = useMap();
    return null;
  }

  function sendToLocation({ lat, long }) {
    if (lat && long) {
      mapRef.current.flyTo([lat, long], ZOOM_LEVEL, { animate: true });
    } else {
      alert(location.error.message);
    }
  }

  async function handleSubmit(search) {
    const res = await fetchPlaceLanLon(search);
    console.log(search);

    sendToLocation(res);

    const res2 = await fetchNearHotels(res);
    setHotels(res2);
  }
  const cores = { lat: "35.694574086736104", long: "139.74384544324104" };
  async function eventsFetch(coords) {
    const res = await fetchPlace(coords);
    setEvents(res);
    console.log(res);
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
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="primary-button" onClick={() => handleSubmit(search)}>
          Submit
        </button>
        <button className="outlined-button" onClick={showMyLocation}>
          Locate Me
        </button>
      </div>
      <button onClick={() => eventsFetch(cores)}>eventFetch</button>
      <button onClick={() => console.log(hotels)}>test</button>

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
          hotels.map((hotel, key) => {
            return (
              hotel.lat &&
              hotel.long && (
                <Marker
                  key={key}
                  icon={customIcon}
                  position={[hotel.lat, hotel.long]}
                >
                  <Popup>{" My location"}</Popup>
                </Marker>
              )
            );
          })}
        {events &&
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

        <MapView />
      </MapContainer>
    </>
  );
}
