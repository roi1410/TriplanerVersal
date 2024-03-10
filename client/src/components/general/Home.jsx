import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import travelMan from "../../assets/3d-travel-man.png";
import suitcaseMan from "../../assets/3d-suitcase-man.png";
import sunglasses from "../../assets/3d-sunglasses.png";
import "./general.css";
import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate()

const handleStart =() =>{
navigate("register");
}

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1 className="header">Welcome to</h1>
          <p>
            At Tripel, we believe that every journey is an adventure waiting to
            happen. Whether you're planning a solo escapade, a romantic getaway,
            or a family vacation, Tripel is here to make your travel dreams a
            reality.
          </p>
          <span>
            <button className="primary-button" onClick={handleStart}>Get Started</button>
            <a href="#information">Why should I choose you?</a>
          </span>
        </div>

        <div className="image-container">
          <img src={travelMan} alt="" />
        </div>
      </div>

      <div id="information">
        <ul className="bento-grid">
          <div>
            <li className="small-box">
              <h3>Explore Flights</h3>
              <p>
                Discover the best deals on flights to your dream destinations.
                With our user-friendly interface, you can easily compare prices,
                select your preferred airlines, and book your tickets
                hassle-free.
              </p>
            </li>
            <li>
              <h3>Discover Locations</h3>
              <p>
                Dive into our extensive database of travel destinations. From
                exotic beach resorts to bustling cityscapes, Tripel offers a
                wide range of options to suit every traveler's preferences.
              </p>
            </li>
          </div>
          <div>
            <li>
              <h3>Find Events</h3>
              <p>
                Immerse yourself in the local culture and entertainment scene
                with our curated list of events and attractions. From music
                festivals to art exhibitions, there's always something exciting
                happening wherever you go.
              </p>
            </li>
            <li className="small-box">
              <h3>Book Hotels</h3>
              <p>
                Find the perfect accommodation for your stay with Tripel. Browse
                through our selection of hotels, resorts, and vacation rentals,
                and choose the one that suits your budget and preferences.
              </p>
            </li>
          </div>
          <div>
            <li className="small-box">
              <h3>Plan Your Itinerary</h3>
              <p>
                Plan your vacation day by day with Tripel's itinerary planner.
                Organize your activities, manage your bookings, and make the
                most out of your trip with our handy tool.
              </p>
            </li>
            <li>
              <h3>Compare Prices</h3>
              <p>
                With Tripel, you can easily compare prices of flights and hotels
                to find the best deals. Save time and money by booking
                everything you need for your trip in one place.
              </p>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Home;
