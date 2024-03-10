import React, { useContext, useEffect, useState } from "react";
import { checkForUser, logout } from "../../../../utils/AuthService";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CurrentContext } from "../../../../context/CurrentContext";
import { format } from "date-fns";
import { getItemsWithFilter } from "../../../../utils/CRUDService";

function Overview() {
  const { user, setUser, areas, setAreas, isLoading, setIsLoading } =
    useContext(GeneralContext);
  const { currentTrip, setCurrentTrip, currentArea, setCurrentArea } =
    useContext(CurrentContext);
  const [allShownDays, setAllShownDays] = useState([])

  useEffect(() => {
    getAreaDays()
  }, [])



  const getAreaDays = async () => {
    const alldays = await getItemsWithFilter("area",{id: currentArea.id})
    console.log(alldays);
    setAllShownDays(alldays.data[0].Days)
  }

  useEffect(()=>{
console.log(allShownDays);
  },[allShownDays])

  return (
    <div>
      {
        allShownDays.map((day , dayIndex)=>
        <div key={dayIndex}>
          <span>{day.day}</span>
        </div>
        )
      }

    </div>
  )
}

export default Overview