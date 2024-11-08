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

    const additems = () => {
        if (!newItem) {
            return;
        }
        setItems([...items, newItem])
        setNewItems("")

    }

    const deleteItem = (index) => {
        setItems(items.filter((_, i) =>
            i !== index
        ))
    }

    const Editing = (index) => {
        seteditIndex(index);
        setNewItems(items[index])
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
            <button onClick={additems} >Enter</button>
            <div>
                {items.map((items, i) => (
                    <li li key={i} >
                        {items}
                        <button onClick={() => { deleteItem(i) }}>delete</button>
                        |
                        <button onClick={() => { Editing(i) }}>Edit</button>
                    </li>
                ))}
            </div>
        </>

    );
};

export default CrudApp;
