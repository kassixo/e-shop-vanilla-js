import { displayProducts } from "./allProductsView.js";
import { navigate } from "./router.js";
import { getProducts } from "./api.js";
import { Inventory } from "./inventory.js";
import { Product } from "./product.js";

export const inventory = new Inventory();

async function initializeInventory() {
  const products = await getProducts();
  products.forEach((productData) => {
    const product = new Product(productData.id, productData.title, productData.price, productData.description, productData.image);
    inventory.restoreStock(product.id, 100); // toodete määratud kogus 100
  });
}

initializeInventory();

const initApp = async () => {
  // lae algne vaade
  displayProducts();

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => {
    navigate("cart");
  };

  document.getElementById("logo").addEventListener("click", () => navigate("category"));
};

document.addEventListener("DOMContentLoaded", initApp);
