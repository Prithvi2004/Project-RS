import React, { useEffect, useState } from "react";
import "./ConsumerDashboard.css";

function ConsumerDashboard() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    // Fetch crops from localStorage
    const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    setCrops(storedCrops);
  }, []);

  return (
    <div className="consumer-dashboard">
      <h1>Available Crops</h1>
      <p>Below are the crops available from our local farmers.</p>

      <div className="crops-grid">
        {crops.length === 0 ? (
          <p>No crops available at the moment.</p>
        ) : (
          crops.map((crop, index) => (
            <div className="crop-box" key={index}>
              <h3>{crop.type}</h3>
              <p>Quantity: {crop.quantity} kg</p>
              <p>Farmer: {crop.farmerName}</p>
              <p>Address: {crop.farmerAddress}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ConsumerDashboard;
