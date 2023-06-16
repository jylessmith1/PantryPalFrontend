import { useContext, useEffect, useState } from "react"
import ShoppingListContext from "./ShoppingListContext"
import ShoppingListItem from "./ShoppingListItem"
import "../components/css/ShoppingList.css"


const ShoppingListContainer = () => {

    const { shoppingList, setShoppingList, fetchShoppingList } = useContext(ShoppingListContext)
    

    useEffect(() => {
        fetchShoppingList()
    }, [])

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
            const response = await fetch('https://pantry-pal-backend-r9v7.onrender.com/shoppinglist', reqOptions)
            if(!response.ok) {
                throw new Error("Error deleting item from shopping list")
            }
            const responseBody = await response.json()
            console.log("Delete request sent to shoppinglist: ", responseBody)
        } catch (error) {
            console.log(error);
        }
        await fetchShoppingList();
    }

    console.log("Shopping list container context data ",shoppingList)

    return (
        <section className="shoppingListItemContainer">
        {shoppingList ? shoppingList.map((itemData, index) => {
          // Create a new function that captures the current value of `id`
          const deleteItem = () => handleRemove(itemData.id)
  
          return <ShoppingListItem key={index} delete={deleteItem} data={itemData} />
        }) : "Shopping list empty"}
      </section>
    )

}

export default ShoppingListContainer