import React, { useState, useEffect } from "react";
import "./FarmerDashboard.css";

function FarmerDashboard() {
  const [crops, setCrops] = useState([]);
  const [showModal, setShowModal] = useState(false); // To toggle the modal visibility
  const [cropData, setCropData] = useState({
    type: "",
    quantity: "",
    farmerName: "",
    farmerAddress: "",
  });

  useEffect(() => {
    // Fetch existing crops from localStorage
    const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    setCrops(storedCrops);
  }, []);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  // Function to add crop to the list and store in localStorage
  const handleAddCropSubmit = () => {
    if (
      cropData.type &&
      cropData.quantity &&
      cropData.farmerName &&
      cropData.farmerAddress
    ) {
      const updatedCrops = [...crops, cropData]; // Add new crop to the crops array
      setCrops(updatedCrops); // Update state
      setShowModal(false); // Close modal
      setCropData({
        type: "",
        quantity: "",
        farmerName: "",
        farmerAddress: "",
      }); // Reset form

      // Store the crops in localStorage
      localStorage.setItem("crops", JSON.stringify(updatedCrops));
    }
  };

  return (
    <div className="farmer-dashboard">
      <h1>Farmer Dashboard</h1>
      <p>Welcome to your Crop Management Dashboard. Add your crops below.</p>
      <button className="add-crop-btn" onClick={() => setShowModal(true)}>
        Add Crop
      </button>

      {/* Modal Popup for Adding Crop */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a Crop</h2>
            <div className="input-group">
              <label>Type of Crop</label>
              <input
                type="text"
                name="type"
                value={cropData.type}
                onChange={handleInputChange}
                placeholder="Enter crop type"
              />
            </div>
            <div className="input-group">
              <label>Quantity (in kg)</label>
              <input
                type="number"
                name="quantity"
                value={cropData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
              />
            </div>
            <div className="input-group">
              <label>Farmer Name</label>
              <input
                type="text"
                name="farmerName"
                value={cropData.farmerName}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-group">
              <label>Farmer Address</label>
              <input
                type="text"
                name="farmerAddress"
                value={cropData.farmerAddress}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
            <div className="modal-buttons">
              <button className="ok-btn" onClick={handleAddCropSubmit}>
                OK
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display List of Crops */}
      <div className="crops-grid">
        {crops.length === 0 ? (
          <p>No crops added yet.</p>
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

export default FarmerDashboard;
