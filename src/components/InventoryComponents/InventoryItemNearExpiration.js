import React, { useState } from 'react';
import '../css/InventoryItemNearExpiration.css';

const InventoryItemNearExpiration = (props) => {
    const [itemData, setItemData] = useState(props.itemData);
    const [showPopup, setShowPopup] = useState(false);
    const [quantity, setQuantity] = useState(0);

    let imageURL =
        itemData.image.length > 25
            ? itemData.image
            : `https://spoonacular.com/cdn/ingredients_100x100/${itemData.image}`;

    let abrevTitle = (rawTitle) => {
        if (rawTitle.length > 25) {
            let titleArr = rawTitle.split('');
            while (titleArr.length > 25) {
                titleArr.pop();
            }
            return `${titleArr.join('')}...`;
        } else {
            return rawTitle;
        }
    };

    let dateCheck = (itemDate) => {
        let diff = Date.now() - itemDate;
        diff = diff / (3600 * 1000 * 24);
        return Math.round(diff);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleResetQuantity = () => {
        setQuantity(0);
    };

    const handleRemoveItem = () => {
        // Implement the logic to remove the item here
    };

    const handleSubmit = () => {
        // Implement the logic to submit the quantity here
        setShowPopup(false); // Hide the popup after submission
    };

    return (
        <article className="box">
            <header className="itemHeader">
                <div>
                    {abrevTitle(itemData.item)}
                </div>
                <div className={`popup ${showPopup ? 'show' : ''}`} onClick={togglePopup}>
                    <span className="popuptext" onClick={(e) => e.stopPropagation()}>
                        {showPopup && (
                            <>
                                <div>
                                    <button onClick={handleDecreaseQuantity}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncreaseQuantity}>+</button>
                                </div>
                                <button onClick={handleResetQuantity}>Reset</button>
                                <button onClick={() => props.delete(itemData.id)}>Remove</button>
                                <button onClick={() => props.refresh(itemData.id)}>Refresh</button>
                            </>
                        )}
                    </span>
                    ...
                </div>
            </header>
            <section className="infoBox">
                <div className="imageWrapper">
                    <img className="itemImage" src={`${imageURL}`} alt={`Picture of ${itemData.item}`} />
                </div>
                <div className="itemInfo">
                    <p>Days old: {dateCheck(itemData.item_date)}</p>
                    <p>Quantity: {itemData.quantity}</p>
                </div>
            </section>
        </article>
    );
};

export default InventoryItemNearExpiration;
