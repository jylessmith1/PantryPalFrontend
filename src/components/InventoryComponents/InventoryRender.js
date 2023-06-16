import { useEffect, useState } from "react";
import InventorySearch from "./InventorySearch";
import InventoryContainer from "./Inventory";
import "../css/InventoryPage.css";
import SearchBarCodeScan from "../SearchPageComponents/SearchBarCodeScan";

let InventoryRender = () => {

    return (
        <section className="inventoryPage">
               
            <div>
                <InventorySearch />
            </div>
                <InventoryContainer />
        </section>
    )
}

export default InventoryRender;
           
           