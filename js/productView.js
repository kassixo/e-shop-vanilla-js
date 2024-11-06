import { getProductById } from "./api.js";
import { addToCart } from "./cart.js";

export async function loadProductView(id) {
  const product = await getProductById(id); // fetch toode by ID

  const productPage = document.getElementById("product-page");

  productPage.innerHTML = `
            <div class="product-page-card">
            <div class="product-page-image"><img src="${product.image}" alt="${product.title}"></div>
            <div class="product-page-details">
            <div class="product-title"><h3>${product.title}</h3></div>
            <div class="product-desc">${product.description}</div>
            <div class="product-price">${product.price}€</div>
            <button id="add-to-cart-${product.id}" class="primary-btn">Add to cart</button>
            </div>
            </div>
        `;

  document.getElementById(`add-to-cart-${product.id}`).onclick = () => {
    addToCart(product);
  };

  document.getElementById("product-list-container").style.display = "none";
  document.getElementById("product-page").style.display = "block";
  document.getElementById("cart-container").style.display = "none";

  console.log("Tootele vajutamine töötab?");
}
