import '../css/Inventory.css'
import { useContext, useState, useEffect, useRef } from "react"
import InventoryContext from "./InventoryContext"
import InventoryItem from "./InventoryItem"
import InventoryItemNearExpiration from "./InventoryItemNearExpiration"

const InventoryContainer = () => {
    const { inventory, setInventory, fetchInventory } = useContext(InventoryContext)
    const [animateItems, setAnimateItems] = useState(false)
    const inventoryRef = useRef(null)

    useEffect(() => {
        fetchInventory();

        // const inventoryElement = inventoryRef.current
        // const handleScroll = () => {
        //     const elementTop = inventoryElement.offsetTop
        //     const elementHeight = inventoryElement.offsetHeight
        //     const windowHeight = window.innerHeight

        //     if (window.pageYOffset > elementTop - windowHeight + elementHeight / 2) {
        //         setAnimateItems(true)
        //     }
        // }

        // window.addEventListener("scroll", handleScroll)
        // handleScroll() // Check if items are already in view on component mount

        // return () => {
        //     window.removeEventListener("scroll", handleScroll)
        // }
    }, [])

    let dateCheck = (itemDate) => {
        let diff = Date.now() - itemDate
        diff = diff / (3600 * 1000 * 24)
        return diff
    }
    
    let sortedInventory = inventory.sort((a, b) => a.item_date - b.item_date)

    let itemsNearExpiration = inventory.filter(
        (item) => item.is_perishable && dateCheck(item.item_date) > 14
    )
    let freshItems =sortedInventory.filter(
        (item) => item.is_perishable && dateCheck(item.item_date) < 14
    )
    
    const handleRemove = async (id) => {
        const reqOptions = {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem(token)}`,
            },
            body: JSON.stringify({ id: id })
        }
        try {
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/inventory', reqOptions)
            if(!response.ok) {
                throw new Error("Error deleting item from inventory")
            }
            const responseBody = await response.json()
            console.log("Delete request sent to inventory: ", responseBody)
        } catch (error) {
            console.log(error);
        }
        await fetchInventory();
    }

    const handleRefresh = async (id) => {
        const reqOptions = {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem(token)}`,
            },
            body: JSON.stringify({ id: id })
        }
        try {
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/inventory', reqOptions)
            if(!response.ok) {
                throw new Error("Error updating inventory item")
            }
            const responseBody = await response.json()
            console.log("PUT request sent to inventory", responseBody)
        } catch (error) {
            console.log(error);
        }
        await fetchInventory()
    }

    return (
        <section className='inventoryPageWrapper'>
            {itemsNearExpiration.length > 0 ? (
                <div
                    className={`inventoryItemsNearExpiration ${animateItems ? "animate" : ""
                        }`}
                >
                    {itemsNearExpiration.map((item, index) => (
                        <InventoryItemNearExpiration
                            key={index}
                            itemData={item}
                            delete={handleRemove} 
                            refresh={handleRefresh}
                        />
                    ))}
                </div>
            ) : (
                <div className="emptyInventoryMessage">No items in danger of expiration</div>
            )}

            {inventory.length > 0 ? (
                <div
                    ref={inventoryRef}
                    className={`inventoryItems ${animateItems ? "animate" : ""
                        }`}
                >
                    {freshItems.map((item, index) => (
                        <InventoryItem key={index} delete={handleRemove} refresh={handleRefresh} itemData={item} />
                    ))}
                </div>
            ) : (
                <div className="emptyInventoryMessage">Inventory is empty</div>
            )}
        </section>
    )
}

export default InventoryContainer