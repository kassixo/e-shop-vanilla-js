import { getProductById } from "./api.js";

export async function loadProductView(id) {
  const product = await getProductById(id); // fetch toode by ID

  const productPage = document.getElementById("product-page");

  productPage.innerHTML = `
            <div class="product-container">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${product.price}€</p>
            <button id="add-to-cart-${product.id}" class="primary-btn">Lisa ostukorvi</button>
            </div>
        `;

  // sündmus lisa ostukorvi (veel ei tööta)
  document.getElementById(`add-to-cart-${product.id}`).onclick = () => addToCart(product);

  document.getElementById("product-list-container").style.display = "none";
  document.getElementById("product-page").style.display = "block";
  document.getElementById("cart-container").style.display = "none";

  console.log("Tootele vajutamine töötab?");
  console.log(product);
}
