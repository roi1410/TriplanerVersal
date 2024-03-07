import React, { useContext, useEffect } from "react";
import { checkForUser , logout } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";

function Events() {

  const {isGuest ,setUser} = useContext(AppContext)


  return (
    <div>Events</div>
  )
}

export default Events