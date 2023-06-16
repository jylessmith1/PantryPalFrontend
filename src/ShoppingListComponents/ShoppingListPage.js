import { useContext, useEffect, useState } from "react";
import ShoppingListSearch from "./ShoppingListSearch";
import ShoppingListContainer from "./ShoppingList";
import ShoppingListContext from "./ShoppingListContext";
import "../components/css/ShoppingListPage.css";

let ShoppingListPage = () => {

    const { fetchShoppingList } = useContext(ShoppingListContext);

    useEffect(() => {
        fetchShoppingList()
        console.log("Shopping list fetched from page use context")
    }, [])
        
    return (
        <section className="shoppingListPageWrapper">
            <ShoppingListSearch />
            <ShoppingListContainer />
        </section>
    )
}

export default ShoppingListPage;