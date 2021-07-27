// import { logDOM } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import './Todo.css';

const getLocalData = () => {
    const lists = localStorage.getItem("todoList");

    if(lists){
        return  JSON.parse(lists)
    }
    else{
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [editedItemId, setEditedItemId] = useState("");
    const [toggleButton, setToggleButton] = useState(false)

    const addItems = () => {
        if (!inputData) {
            alert("Please Fill Input Items")
        }
        else if (inputData && toggleButton){
              setItems(
                items.map((currItems) => {
                    if(currItems.id === editedItemId){
                        return { ...currItems, name:inputData };
                    }
                    else{
                        return currItems;
                    }
                })
              );
              setInputData("");
              setToggleButton(false);
              setEditedItemId("")
        }
        else {
            const addNewItem = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, addNewItem])
            setInputData("")
        }
    };

    const editItems = (editId)=> {
        const itemToEdited = items.find((allItems) => {
            return allItems.id === editId;
        });
        setInputData(itemToEdited.name);
        setToggleButton(true);
        setEditedItemId(editId)

    }

    const deleteItem = (currItemId) => {
        const updateItems = items.filter((currItem) => {
            return currItem.id !== currItemId;
        });

        setItems(updateItems);
    }

    // console.log(items);

    useEffect(() => {

        localStorage.setItem("todoList", JSON.stringify(items))

    }, [items])

    return (
        <div className="todo-container">
            <h2>Add Your List Here</h2>
            <div className="todo-input">
                <input
                    type="text"
                    placeholder="Add Items"
                    className="input-box"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                />
                {
                    toggleButton ?  <i class="fas fa-edit" onClick={addItems} ></i> :  <i class="fas fa-plus" onClick={addItems}></i>
                }    
            </div>
            <div className="added-items">
                {
                    items.map((item) => (
                        <div key={item.id} className="each-items">
                            <span>{item.name}</span>
                            <i class="fas fa-edit" onClick={() => editItems(item.id)} ></i>
                            <i class="fas fa-trash-alt" onClick={() => deleteItem(item.id)} ></i>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Todo
