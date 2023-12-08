const fs = require("fs");

function findProductNameByBarcode(filePath, barcode) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Access the products array
    let products = jsonData["envelope"]["produkter"]["lmprodukt"];

    try {
      for (let product of products) {
        // Check if 'artiklar' has 'lmartikel' and it is an array
        if (product["artiklar"] && Array.isArray(product["artiklar"]["lmartikel"])) {
          let articles = product["artiklar"]["lmartikel"];

          for (let article of articles) {
            if (article["streckkod"] === barcode) {
              console.log(article["artikel_benamning"]);
              return;
            }
            console.log(article["streckkod"]);

          }
        }
      }
    } catch (error) {
      console.error("Error iterating over products:", error);
    }

    console.log("Product not found");
  });
}

// Example usage
const filePath = "nameInfo.json"; // Replace with the path to your JSON file
const barcodeToSearch = 7046265537533; // Replace with the barcode you're looking for
findProductNameByBarcode(filePath, barcodeToSearch);
