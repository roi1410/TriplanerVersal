import React, { useContext, useEffect } from "react";
import { checkForUser , logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";

function Events() {

  const {isGuest ,setUser} = useContext(GeneralContext)


  return (
    <div>Events</div>
  )
}

export default Events