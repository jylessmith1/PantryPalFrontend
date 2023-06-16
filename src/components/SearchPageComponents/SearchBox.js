import { useState } from "react";
import "./SearchPage.css"

let SearchBox = () => {

    let APIKEY = process.env.REACT_APP_APIKEY

    const [itemSearch, setItemSearch] = useState({ searchString: "" })

    const [searchData, setSearchData] = useState([]);

    let getSearchItems = async (itemSearch) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/food/products/?apiKey=${APIKEY}`
            )
            if (!response.ok) {
                throw new Error("Error fetching items");
        };
        const data = await response.json();
        data = data.forEach(result => result.imgURL = `https://spoonacular.com/cdn/ingredients_100x100/${result.image}`);
        setSearchData(data)
    } catch (error) {
        console.error("An error occurred: ", error);
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        setItemSearch({searchString: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let searchValue = itemSearch.searchString.toLowerCase();
        getSearchItems(searchValue);
        setItemSearch({ searchString: "" })
    }

    return (
        <article>
            <header className="searchHeader">
                <h3>Search items to add to your inventory</h3>
            </header>
            <form className="searchForm" onSubmit={handleSubmit}>
                <div>
                    <input 
                    type="text"
                    name="itemSearch"
                    placeholder="Item Search"
                    value={itemSearch.searchString}
                    onChange={handleChange}
                    />
                </div>
                <button>Search</button>
            </form>
        </article>
    )
}

export default SearchBox;