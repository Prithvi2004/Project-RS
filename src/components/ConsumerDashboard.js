import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa"; // Import icons
import "./ConsumerDashboard.css";

function ConsumerDashboard() {
  const [crops, setCrops] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCart, setShowCart] = useState(false); // To toggle cart visibility
  const [selectedCrop, setSelectedCrop] = useState(null); // For selected crop
  const [quantity, setQuantity] = useState(""); // Quantity to be purchased
  const [cartBounce, setCartBounce] = useState(false); // For cart icon animation

  useEffect(() => {
    const storedCrops = JSON.parse(localStorage.getItem("crops")) || [];
    setCrops(storedCrops);
  }, []);

  // Handle adding to cart
  const handleAddToCart = (crop) => {
    setSelectedCrop(crop);
  };

  // Handle quantity selection and add to cart
  const handleQuantitySubmit = () => {
    const enteredQuantity = parseFloat(quantity); // Ensure the quantity is treated as a number

    if (enteredQuantity > 0 && enteredQuantity <= selectedCrop.quantity) {
      const totalPrice = enteredQuantity * selectedCrop.cost;
      const newCartItem = {
        ...selectedCrop,
        quantity: enteredQuantity,
        totalPrice,
      };
      setCart((prevCart) => [...prevCart, newCartItem]);

      // Update total amount
      setTotalAmount((prevTotal) => prevTotal + totalPrice);

      // Trigger cart bounce animation
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 1000); // Bounce effect

      // Clear and close modal
      setSelectedCrop(null);
      setQuantity(""); // Reset quantity
    } else {
      alert("Please select a valid quantity.");
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (index) => {
    const removedItem = cart[index];
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    // Update total amount
    setTotalAmount((prevTotal) => prevTotal - removedItem.totalPrice);
  };

  // Handle Proceed to Pay
  const handleProceedToPay = () => {
    alert(`Total Bill Amount: ₹${totalAmount}`);
  };

  return (
    <div className="consumer-dashboard">
      <h1>Available Crops</h1>
      <button
        className={`cart-btn ${cartBounce ? "bounce" : ""}`}
        onClick={() => setShowCart(!showCart)}
      >
        <FaShoppingCart /> {cart.length} items
      </button>

      {showCart && (
        <div className="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cart.map((crop, index) => (
                <div key={index} className="cart-item">
                  <p>
                    {crop.type} - {crop.quantity} kg - ₹{crop.totalPrice}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
              <p className="total-amount">Total Bill Amount: ₹{totalAmount}</p>
              <button className="proceed-btn" onClick={handleProceedToPay}>
                Proceed to Pay
              </button>
            </div>
          )}
        </div>
      )}

      <div className="crops-grid">
        {crops.length === 0 ? (
          <p>No crops available at the moment.</p>
        ) : (
          crops.map((crop, index) => (
            <div className="crop-box" key={index}>
              <h3>{crop.type}</h3>
              <p>Quantity: {crop.quantity} kg</p>
              <p>Cost: ₹{crop.cost} per kg</p>
              <p>Farmer: {crop.farmerName}</p>
              <p>Address: {crop.farmerAddress}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(crop)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quantity Popup */}
      {selectedCrop && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Quantity</h2>
            <p>
              {selectedCrop.type} - Available: {selectedCrop.quantity} kg
            </p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max={selectedCrop.quantity}
              placeholder="Enter quantity"
              className="quantity-input"
            />
            <div className="modal-buttons">
              <button className="ok-btn" onClick={handleQuantitySubmit}>
                OK
              </button>
              <button
                className="cancel-btn"
                onClick={() => setSelectedCrop(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsumerDashboard;
