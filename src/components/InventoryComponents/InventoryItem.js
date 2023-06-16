import '../css/InventoryItem.css';
import { useState, useEffect } from "react";

let InventoryItem = (props) => {

    const [itemData, setItemData] = useState(props.itemData);
    
    useEffect(() => {
        setItemData(props.itemData);
      }, [props.itemData]);

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

    let dateCheck = (itemDate) => {
        let diff = Date.now() - itemDate
        diff = diff / (3600 * 1000 * 24)
        return Math.round(diff)
    }

    let shadowStyle = {
        boxShadow: dateCheck(itemData.item_date) >= 7 ? "4px 4px goldenrod" : "4px 4px green"
    }

    return (
        <article style={shadowStyle} className="box2">
            <header className='inventoryItemHeader'>
                <span className='inventoryItemName'>
                    {abrevTitle(itemData.item)}
                </span>
                <p className='itemAge'> 
                    Days old: {dateCheck(itemData.item_date)}
                </p> 
            </header>
            <div className='itemDescWrapper'>
                <div className='invImageWrapper'>
                    <img className='invItemImage' src={`${imageURL}`} alt="" />
                </div>
                <div className='invBtnWrapper'>
                    {/* <p>
                        {itemData.quantity ? `Quantity: ${itemData.quantity}` : null}
                    </p> */}
                    <button className='removeInvBtn' onClick={() => props.delete(itemData.id)}>
                        Remove
                    </button>
                    <button className='refreshInvBtn' onClick={() => props.refresh(itemData.id)}>
                        Refresh
                    </button>
                </div>
            </div>
        </article>
    )
}

export default InventoryItem;
