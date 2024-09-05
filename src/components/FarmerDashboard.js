import React, { useState, useEffect } from "react";
import "./FarmerDashboard.css";

function FarmerDashboard() {
  const [crops, setCrops] = useState([]);
  const [showModal, setShowModal] = useState(false); // To toggle the modal visibility
  const [cropData, setCropData] = useState({
    type: "",
    quantity: "",
    cost: "",
    farmerName: "",
    farmerAddress: "",
  });

  useEffect(() => {
    const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    setCrops(storedCrops);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCropData({ ...cropData, [name]: value });
  };

  // Add crop to the list and store in localStorage
  const handleAddCropSubmit = () => {
    if (
      cropData.type &&
      cropData.quantity &&
      cropData.cost &&
      cropData.farmerName &&
      cropData.farmerAddress
    ) {
      const updatedCrops = [...crops, cropData];
      setCrops(updatedCrops);
      setShowModal(false); // Close modal
      setCropData({
        type: "",
        quantity: "",
        cost: "",
        farmerName: "",
        farmerAddress: "",
      });

      localStorage.setItem("crops", JSON.stringify(updatedCrops));
    }
  };

  const handleDeleteCrop = (index) => {
    const updatedCrops = crops.filter((_, i) => i !== index);
    setCrops(updatedCrops);

    localStorage.setItem("crops", JSON.stringify(updatedCrops));
  };

  return (
    <div className="farmer-dashboard">
      <h1>Farmer Dashboard</h1>
      <p>Manage your crops and set prices.</p>
      <button className="add-crop-btn" onClick={() => setShowModal(true)}>
        Add Crop
      </button>

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
              <label>Cost (per kg)</label>
              <input
                type="number"
                name="cost"
                value={cropData.cost}
                onChange={handleInputChange}
                placeholder="Enter cost per kg"
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

      <div className="crops-grid">
        {crops.length === 0 ? (
          <p>No crops added yet.</p>
        ) : (
          crops.map((crop, index) => (
            <div className="crop-box" key={index}>
              <h3>{crop.type}</h3>
              <p>Quantity: {crop.quantity} kg</p>
              <p>Cost: ₹{crop.cost} per kg</p>
              <p>Farmer: {crop.farmerName}</p>
              <p>Address: {crop.farmerAddress}</p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteCrop(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FarmerDashboard;
