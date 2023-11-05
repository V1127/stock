import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './home.css'; // Import your CSS file for styling

function Home() {
  const [inventory, setInventory] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value,
    });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.quantity > 0 && newProduct.price > 0) {
      setInventory([...inventory, newProduct]);
      setNewProduct({ name: '', quantity: 0, price: 0 });
    }
  };

  const deleteProduct = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  return (
    <div className="App">
      <h1>Inventory Management System</h1>
      <div className="add-product">
        <h2>Add Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <button className="add-button" onClick={addProduct}>
          Add
        </button>
      </div>
      <div className="inventory">
        <h2>In Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total Cost</th>
              <th>Action</th> {/* New column for Delete button */}
            </tr>
          </thead>
          <tbody>
            {inventory.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>₹{(product.quantity * product.price).toFixed(2)}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="track-button-container">
        {/* Add a button to navigate to the "track" page */}
        <Link to="/track" className="track-button">
          Track
        </Link>
      </div>
    </div>
  );
}

export default Home;
