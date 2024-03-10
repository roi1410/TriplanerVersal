import React, { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CurrentContext } from "../../../../context/CurrentContext";
import { format } from "date-fns";
import { getItemsWithFilter } from "../../../../utils/CRUDService";

function Overview() {
  const { user, setUser, areas, setAreas, isLoading, setIsLoading,setGoBack } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);
  const [allShownDays, setAllShownDays] = useState([])

  // setGoBack("/dashboard")
  useEffect(() => {
    getAreaDays()
    
  }, [])



  const getAreaDays = async () => {
    const alldays = await getItemsWithFilter("day", { areaId:currentArea.id})
    console.log(alldays);
    setAllShownDays(alldays.data)
  }

  return (
    <div>
      {
        allShownDays.map((v)=>
        <div>
          <span>{v.day}</span>
        </div>
        )
      }

    </div>
  )
}

export default Overview