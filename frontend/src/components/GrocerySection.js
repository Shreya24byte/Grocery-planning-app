import { AddGroceryItem } from './AddGroceryItem';
import { SubHeader } from './SubHeader';
import { useEffect, useState } from 'react';
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import classNamesModule from "classnames";

const API_BASE_URL ="http://localhost:8080";

export function GrocerySection() {
    const [groceryItems, updateGroceryitems] = useState([]);
    async function fetchgroceryItems(){
        const groceryData = await axios.get(`${API_BASE_URL}/grocery/getAll`);
        console.log(groceryData.data.results);
        const dataFromAPI = groceryData.data.results;
        updateGroceryitems(dataFromAPI);
    }
    useEffect(() => {
       fetchgroceryItems();
    }, []);
    async function handlePurchaseUpdate(item){
        const updateData = await axios.put(`${API_BASE_URL}/grocery/updatepurchaseStatus`, 
        {
            _id: item._id,
            isPurchased: true,
        });
        console.log(updateData);
        alert("Item purchase status updated successfully");
        fetchgroceryItems();
    }

    async function handleDeleteButton(item){
        const deleteResponse = await axios.delete(`${API_BASE_URL}/grocery/deleteGroceryItem`, {
            data: {
                _id: item._id,
            }
        });
        console.log(deleteResponse);
        alert("Are you sure you want to delete?");
        fetchgroceryItems();
    }

    function renderGroceryItems(){
        return groceryItems.map((item) => {
            return ( <h5 className={classNamesModule("grocery-item", {
                'purchased':item.isPurchased === true
            })}
            key={item.groceryItem}>
                {item.groceryItem} 
                {item.isPurchased === false ?(
                <button onClick={() => handlePurchaseUpdate(item)} className="btn btn-outline-success btn-sm purchase-btn">Purchased</button>
                ) : null }
                <span className="delete-btn"><FaTimes onClick={() =>handleDeleteButton(item)}/></span>
                </h5>)
        })
    }
    return (
        <div className="justify-content-center align-items-center flex-column d-flex">
            <SubHeader />
            <div className="container">
            <AddGroceryItem 
            baseUrl={API_BASE_URL}
            fetchgroceryItems={fetchgroceryItems}
            />
            {groceryItems.length > 0 ? (<div>{renderGroceryItems()}</div>) : ('No list to show')}
            </div>
        </div>
    )
}


