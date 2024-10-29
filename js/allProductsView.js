import { getProducts, getCategories } from "./api.js";
import { navigate } from "./router.js";
import { addToCart } from "./cart.js";

// KATEGOORIA NUPUD

async function displayCatBtns() {
  const categories = await getCategories();
  const categoryDiv = document.getElementById("categories");

  // Add an "All" button to show all products
  const allBtn = document.createElement("button");
  allBtn.classList.add("cat-btn");
  allBtn.textContent = "All";
  allBtn.onclick = () => displayProducts(); // kuva kõik (dpProducts parameeter eemaldatud!!)
  categoryDiv.appendChild(allBtn);

  categories.forEach((category) => {
    // lisa ostukorvi nupp
    const catBtn = document.createElement("button");
    catBtn.classList.add("cat-btn");
    catBtn.textContent = category;
    catBtn.onclick = () => displayProducts(category); // siia teha funktsioon kat view
    categoryDiv.appendChild(catBtn);
  });
}

displayCatBtns();

// KÕIKIDE TOODETE ALA
export async function displayProducts(category = null) {
  const products = await getProducts();

  // filtreeri kategooriale vastavalt
  const filteredProducts = category ? products.filter((product) => product.category === category) : products;

  // tühjendab olemasolevad tooted
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  filteredProducts.forEach((product) => {
    // tootekaardi container
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-container");
    productDiv.onclick = () => navigate("product", product.id);

    // toote pildid
    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add("product-image");
    productDiv.appendChild(productImage);

    // lisan veel ühe divi järgnevatele elementidele
    const productContentDiv = document.createElement("div");
    productContentDiv.classList.add("product-content-div");

    // toote nimi
    const productTitle = document.createElement("div");
    productTitle.textContent = `${product.title}`;
    productTitle.classList.add("product-title");
    productContentDiv.appendChild(productTitle);

    // toote hind
    const productPrice = document.createElement("div");
    productPrice.textContent = `${product.price.toFixed(2)} €`;
    productPrice.classList.add("product-price");
    productContentDiv.appendChild(productPrice);

    // lisa ostukorvi nupp
    const addToCartButton = document.createElement("button");
    addToCartButton.classList.add("primary-btn");
    addToCartButton.textContent = "Add to cart";
    addToCartButton.onclick = () => addToCart(product.title);
    addToCartButton.onclick = (e) => {
      e.stopPropagation(); // Vältida, et tootekaardile klikkimine navigeeriks tootevaatesse, kui vajutatakse "Lisa ostukorvi" nuppu
      addToCart(product);
    };
    productContentDiv.appendChild(addToCartButton);

    // lisa containeri sisse
    productDiv.appendChild(productContentDiv);
    productList.appendChild(productDiv); // main
  });
}
