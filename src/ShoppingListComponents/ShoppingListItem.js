import { useContext, useState, useEffect } from "react";
import ShoppingListContext from "./ShoppingListContext"
import "../components/css/ShoppingListItem.css"

let ShoppingListItem = (props) => {

    const [itemData, setItemData] = useState(props.data);

    useEffect(() => {
        setItemData(props.data);
      }, [props.data]);

    let imageURL = itemData.image.length > 20 ? itemData.image : `https://spoonacular.com/cdn/ingredients_100x100/${itemData.image}`;

    let abrevTitle = (rawTitle) => {
        if (rawTitle.length > 15) {
            let titleArr = rawTitle.split("");
            while (titleArr.length > 15) {
                titleArr.pop();
            }
            return `${titleArr.join('')}...`
        }
        else {
            return rawTitle
        }
    }

    const handleAddInventory = async (e) => {
        e.preventDefault();
        const reqOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem(token)}`,
            },
            body: JSON.stringify({ item: itemData.item, quantity: itemData.quantity, is_perishable: itemData.is_perishable, image: itemData.image })
        }
        try {
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/inventory', reqOptions)
            if(!response.ok) {
                throw new Error("Error adding item to inventory")
            }
            const responseBody = await response.json()
            console.log("Post request sent to add this item to inventory: ", responseBody)
        } catch (error) {
            console.log(error);
        }
    }

    return( 
        <article className="shoppingListItem">
            <header>
                <span className="shoppingItemName">
                    {abrevTitle(itemData.item)}
                </span>
            </header>
            <section className="shoppingListItemDesc">
                <div className="imageWrapper"> 
                    <img className="itemImage" src={`${imageURL}`} alt="" />
                </div>
            </section>
                <div className="shoppingListItemBtns">
                    <button className="optionBtn" onClick={handleAddInventory}>
                        Inventory
                    </button>
                    <button className="removeBtn" onClick={() => props.delete(itemData.id)}>
                        Remove
                    </button>
                </div>
        </article>
    )
}

export default ShoppingListItem;
