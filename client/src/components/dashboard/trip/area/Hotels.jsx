import React, { useContext, useEffect } from "react";
import { checkForUser } from "../../../../utils/AuthService";
import { AppContext } from "../../../../context/AppContext";
function Hotels() {
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
    <div>Hotels</div>
  )
}

export default Hotels