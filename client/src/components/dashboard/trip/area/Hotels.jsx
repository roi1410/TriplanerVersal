import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import Map from "../../../general/Map";
import { FaLink } from "react-icons/fa";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import "./area.css";
import Skeleton from "react-loading-skeleton";

function Hotels() {
  const {
    isGuest,
    setUser,
    hotels,
    setHotels,
    isLoading,
    myHotels,
    setMyHotels,
  } = useContext(GeneralContext);

  useEffect(() => {
    console.log(hotels), [hotels];
  });

  const handleAddFavorite = (index) => {
    const tempHotels = [...hotels];
    setMyHotels((prev) => [...prev, tempHotels[index]]);
  };

  return (
    <div>
      <div className="hotels-container">
        <div className="cards-container">
          {isLoading ? (
            // Loader
            <Skeleton className="filled-card" count={20} />
          ) : hotels ? (
            hotels.map((hotel, index) => (
              <div className="filled-card" key={index}>
                <b>{hotel.name}</b>
                <p>{hotel.street}</p>
                <div>
                  {hotel.websiteURL && (
                    <a className="link" target="blank" href={hotel.websiteURL}>
                      <FaLink />
                    </a>
                  )}

                  {myHotels.includes(hotels[index]) ? (
                    <button>
                      <AiFillStar style={{ color: "gold" }} />
                    </button>
                  ) : (
                    <button>
                      <AiOutlineStar />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Location not found, please try again</p>
          )}
        </div>
        <div className="map-container">
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Hotels;
