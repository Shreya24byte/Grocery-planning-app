import { useState } from 'react';
import axios from "axios";

export function AddGroceryItem({ baseUrl, fetchGroceryItems }) {
  const [groceryInputText, updateGroceryinputText] = useState('');
  async function handleAddingItems(){
    const createTask = await axios.post(`${baseUrl}/grocery/add`,{
      groceryItem:groceryInputText,
      isPurchased:false
    });
    console.log(createTask);
    updateGroceryinputText("");
    fetchGroceryItems();
  }
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Grocery Item"
        aria-label="Grocery Item "
        aria-describedby="basic-addon2"
        value={groceryInputText}
        onChange={(e) => updateGroceryinputText(e.target.value)}
      />
      <button 
      className="input-group-text btn btn-primary" 
      id="basic-addon2"
    onClick={() => handleAddingItems()}>
        Add Grocery Item
      </button>
    </div>
  );
}
