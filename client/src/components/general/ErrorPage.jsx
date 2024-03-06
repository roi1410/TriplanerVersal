import React from 'react';
import { useNavigate } from 'react-router-dom';


function ErrorPage() {

const navigate = useNavigate();

const handleGoBack = () => {
  navigate(-1);
};

  return (
    <div className="error">
      <div>
        PAGE NOT FOUND | 404
        <button onClick={handleGoBack} className="go-back">Go Back</button> 
      </div>
      </div>
  )
}

export default ErrorPage