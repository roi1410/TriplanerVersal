import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function Home() {
  const [count, setCount] = useState();

  useEffect(() =>{
    setTimeout(() => setCount(100), 100000);

  },[])

  return (
    <div>
      <h1>Home</h1>
      <p>{count || <Skeleton containerClassName="skeleton-container"  string count={10}/>}</p>
    </div>
  );
}

export default Home;
