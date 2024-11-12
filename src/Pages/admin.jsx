import React, { useState, useEffect } from 'react';

const CrudApp = () => {
    const [items, setItems] = useState(() => {
        const saveditem = localStorage.getItem("items")
        return saveditem ? JSON.parse(saveditem) : [];
    })

    const [newItem, setNewItems] = useState('')
    const [edit, seteditIndex] = useState(null)

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items])

    const handelChange = ((e) => setNewItems(e.target.value))

    // function for add new items 
    const additems = () => {
        if (!newItem) {
            return;
        }
        setItems([...items, newItem])
        setNewItems("")

    }
    // .filter creates a new array in which the selected index item is not added 
    const deleteItem = (index) => {
        setItems(items.filter((_, i) =>
            i !== index
        ))
    }

    const Edititem = (index) => {
        seteditIndex(index)
        setNewItems(items[index])
    }


    const Update = () => {
        const updatedItems = items.map((item, index) =>
            index === edit ? newItem : item)

        setItems(updatedItems);
        seteditIndex(null)
        setNewItems('')

    }

    return (
        <>
            <h1>Crud Opreation </h1>
            <input
                type="text"
                value={newItem}
                placeholder="Write here"
                onChange={handelChange}
            />
            <button onClick={edit !== null ? Update : additems}>{edit !== null ? "Update" : "Add"}</button>


            <div>
                {items.map((items, i) => (
                    <li li key={i} >
                        {items}
                        <button onClick={() => { deleteItem(i) }}>delete</button>
                        |
                        <button onClick={() => { Edititem(i) }}>Edit</button>
                    </li>
                ))}
            </div>
        </>

    );
};

export default CrudApp;
