import React, { useContext, useEffect } from "react";
import { checkForUser } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";

function Events() {

  const {setUser} = useContext(AppContext)
  useEffect(() => {
    checkForUser().then((response) => {
      if (response.data) {
        setUser(response.data);
      } else {
        logout();
        navigate("/");
        alert("Your previous session has ended, please login again.");
      }
    });
  }, []);
  return (
    <div>Events</div>
  )
}

export default Events