import React, { useState } from 'react';
import './track.css';

function Track() {
  const [yetToComeStock, setYetToComeStock] = useState([]);
  const [currentStock, setCurrentStock] = useState([]);
  const [soldOutStock, setSoldOutStock] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 0,
    price: 0,
  });

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value,
    });
  };

  const addNewItem = (category) => {
    if (newItem.name && newItem.quantity > 0 && newItem.price > 0) {
      const newItemWithTotalCost = {
        ...newItem,
        totalCost: newItem.quantity * newItem.price,
      };
      switch (category) {
        case 'yetToComeStock':
          setYetToComeStock([...yetToComeStock, newItemWithTotalCost]);
          break;
        case 'currentStock':
          setCurrentStock([...currentStock, newItemWithTotalCost]);
          break;
        case 'soldOutStock':
          setSoldOutStock([...soldOutStock, newItemWithTotalCost]);
          break;
        default:
          break;
      }
      setNewItem({ name: '', quantity: 0, price: 0 });
    }
  };

  const calculateTotalQuantityAndCost = (stock) => {
    const totalQuantity = stock.reduce((total, item) => total + item.quantity, 0);
    const totalCost = stock.reduce((total, item) => total + item.totalCost, 0);
    return { totalQuantity, totalCost };
  };

  const yetToComeTotal = calculateTotalQuantityAndCost(yetToComeStock);
  const currentTotal = calculateTotalQuantityAndCost(currentStock);
  const soldOutTotal = calculateTotalQuantityAndCost(soldOutStock);

  return (
    <div className="track-page">
      <h2>Track Page</h2>
      <div className="stock-section">
        <div className="stock-category">
          <h3>Yet to Come Stock</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {yetToComeStock.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>Qty: {yetToComeTotal.totalQuantity}</td>
                <td>₹{yetToComeTotal.totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="add-item">
            <h3>Add New Item</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newItem.name}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleNewItemChange}
            />
            <button className="add-button" onClick={() => addNewItem('yetToComeStock')}>
              Add
            </button>
          </div>
        </div>
        
        <div className="stock-category">
          <h3>Current Stock</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentStock.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>Qty: {currentTotal.totalQuantity}</td>
                <td>₹{currentTotal.totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="add-item">
            <h3>Add New Item</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newItem.name}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleNewItemChange}
            />
            <button className="add-button" onClick={() => addNewItem('currentStock')}>
              Add
            </button>
          </div>
        </div>
        
        <div className="stock-category">
          <h3>Sold Out Stock</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {soldOutStock.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>Qty: {soldOutTotal.totalQuantity}</td>
                <td>₹{soldOutTotal.totalCost.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="add-item">
            <h3>Add New Item</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newItem.name}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newItem.price}
              onChange={handleNewItemChange}
            />
            <button className="add-button" onClick={() => addNewItem('soldOutStock')}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Track;
