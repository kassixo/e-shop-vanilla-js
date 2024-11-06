import { updateCartDisplay } from "./cart.js";

export function loadCartView() {
  updateCartDisplay();

  document.getElementById("product-list-container").style.display = "none";
  document.getElementById("product-page").style.display = "none";
  document.getElementById("cart-container").style.display = "block";
}
