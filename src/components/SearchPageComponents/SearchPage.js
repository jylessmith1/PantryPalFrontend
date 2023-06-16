import SearchBox from "./SearchBox";
import SearchItem from "./SearchItem";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SearchPage.css";

let SearchPage = () => {

    let APIKEY = process.env.REACT_APP_APIKEY

    const [itemSearch, setItemSearch] = useState({ searchString: "" })

    const [searchItemData, setSearchItemData] = useState();

    const [searchProductData, setSearchProductData] = useState();

    let getSearchItems = async (itemSearch) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/ingredients/search?query=${itemSearch}`,
                {
                    headers: {
                        "x-api-key": `${APIKEY}`
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Error fetching items");
            };
            let data = await response.json();
            setSearchItemData(await data)
            console.log("searchItemData set to: ", searchItemData)
        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }

    let getSearchProducts = async (itemSearch) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/products/search?query=${itemSearch}`,
                {
                    headers: {
                        "x-api-key": `${APIKEY}`
                    }
                }
            )
            if (!response.ok) {
                throw new Error("Error fetching items");
            };
            let data = await response.json();
            console.log("Product Data: ", data)
            setSearchProductData(data)
        } catch (error) {
            console.error("An error ocurred: ", error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setItemSearch({ searchString: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchItemData()
        setSearchProductData()
        let searchValue = itemSearch.searchString.toLowerCase();
        await getSearchItems(searchValue);
        await getSearchProducts(searchValue)
        setItemSearch({ searchString: "" })
    }


    return (
        <main className="searchPage">
            <section className="searchBoxWrapper">
                <header className={"searchBoxHeader"}>
                    Search items to add to your Inventory, or Shopping List
                </header>
                <form className="searchForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="itemSearch"
                            placeholder="Item Search"
                            value={itemSearch.searchString}
                            onChange={handleChange}
                        />
                    <button>Search</button>
                </form>
                <NavLink to={"/barcodescan"}>
                    <button>Scan Barcode</button>
                </NavLink>
            </section>
            <section className="searchResults">
                {searchItemData ? searchItemData.results.map((itemData, index) => <SearchItem key={index + "i"} data={itemData} />) : ""}
                {searchProductData ? searchProductData.products.map((productData, index) => <SearchItem key={index + "p"} data={productData} />) : ""}
            </section>
        </main>
    )


}

export default SearchPage;

