import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
import SearchItem from "./SearchItem";
import { useState, useEffect } from "react";

const SearchBarCodeScan = (props) => {

    let APIKEY = process.env.REACT_APP_APIKEY

    const [scannedItem, setScannedItem] = useState(null);
  
    const onNewScanResult = async (decodedText, decodedResult) => {
      console.log(decodedText, decodedResult);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/food/products/upc/${decodedText}`,
          {
            headers: {
              "x-api-key": APIKEY,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error finding scanned item");
        }
        let data = await response.json();
        setScannedItem(data);
        console.log(data);
      } catch (error) {
        console.error("An error occurred: ", error);
      }
    };
  
  
    return (
        <div>
            <section>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
            </section>
            <section>
                {scannedItem ? <SearchItem data={scannedItem} /> : "Waiting for scan"}
            </section>
        </div>
    );
};

export default SearchBarCodeScan



