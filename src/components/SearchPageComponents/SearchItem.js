import { useState } from "react";
import "./SearchItem.css"

let SearchItem = (props) => {

    const [itemData, setItemData] = useState(props.data);
    const [isChecked, setIsChecked] = useState(false)

    let imageURL = itemData.image.length > 25 ? itemData.image : `https://spoonacular.com/cdn/ingredients_100x100/${itemData.image}`;

    let abrevTitle = (rawTitle) => {
        if (rawTitle.length > 25) {
            let titleArr = rawTitle.split("");
            while (titleArr.length > 25) {
                titleArr.pop();
            }
            return `${titleArr.join('')}...`
        }
        else {
            return rawTitle
        }
    }

    const handleInventory = async (e) => {
        e.preventDefault();
        const postOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem(token)}`,
            },
            body: JSON.stringify({ item: (itemData.name || itemData.title), image: imageURL, is_perishable: isChecked, item_date: 12345 })
        }
        try {
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/inventory', postOptions)
            if(!response.ok) {
                throw new Error("Error updating the Inventory")
            }
            const responseBody = await response.json()
            console.log("Post request sent to inventory: ", responseBody)
        } catch (error) {
            console.log(error);
        }
    }

    const handleShoppingList = async (e) => {
        e.preventDefault();
        const postOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem(token)}`,
            },
            body: JSON.stringify({ item: (itemData.name || itemData.title), image: imageURL, is_perishable: isChecked })
        }
        try {
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/shoppinglist', postOptions)
            if(!response.ok) {
                throw new Error("Error updating the shopping list")
            }
            const responseBody = await response.json()
            console.log("Post request sent: ", responseBody)
        } catch (error) {
            console.log(error);
        }
    }

return (
    <article className="searchedItem">
        <header className="searchItemHeader">
            <p className="itemName">
                {abrevTitle(itemData.name || itemData.title)}
            </p>
            <div className="perishContainer">
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((value) => !value)} />Perishable?
            </div>
        </header>
        <section className="itemDesc">
            <div className="imageWrapper">
                <img className="itemImage" src={`${imageURL}`} alt="" />
            </div>
            <div className="searchItemBtns">
                <button className="optionBtn" onClick={handleInventory}>
                    add to inventory
                </button>
                <button className="optionBtn" onClick={handleShoppingList}>
                    Add to shopping list
                </button>
            </div>
        </section>
    </article>
    )
}

export default SearchItem;