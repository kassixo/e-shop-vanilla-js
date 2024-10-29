import { displayProducts } from "./allProductsView.js";
import { navigate } from "./router.js";
import { getProducts } from "./api.js";
import { Inventory } from "./inventory.js";

async function initializeInventory() {
  const products = await getProducts();
  const initializedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    count: 100, // määra ise count
  }));

  return new Inventory(initializedProducts);
}

const initApp = async () => {
  const inventory = await initializeInventory();
  //   console.log("Initialized Inventory:", inventory.getProducts()); // too välja konsoolis, et kontrollida

  // lae algne vaade
  displayProducts();

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  document.getElementById("logo").addEventListener("click", () => navigate("category"));
};

document.addEventListener("DOMContentLoaded", initApp);
