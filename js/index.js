import { displayProducts } from "./allProductsView.js";
import { navigate } from "./router.js";

const initApp = async () => {
  console.log("init test");

  // lae algne vaade
  displayProducts();

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  document.getElementById("logo").addEventListener("click", () => navigate("category"));
};

document.addEventListener("DOMContentLoaded", initApp);
