import { getProducts, getCategories } from "./api.js";
import { navigate } from "./router.js";
import { addToCart } from "./cart.js";
import { Product } from "./product.js";

// KATEGOORIA NUPUD

async function displayCatBtns() {
  const categories = await getCategories();
  const categoryDiv = document.getElementById("categories");

  // lisab active staatuse nupule, kui vajutatud
  function setActiveButton(clickedButton) {
    const buttons = document.querySelectorAll(".cat-btn");
    buttons.forEach((button) => button.classList.remove("active")); // eemalda teistelt
    clickedButton.classList.add("active"); //lisa sellele, mida vajutati
  }

  // KÕIK nupp
  const allBtn = document.createElement("button");
  allBtn.classList.add("cat-btn");
  allBtn.textContent = "All";
  allBtn.onclick = () => {
    setActiveButton(allBtn); // "All" nupp active
    navigate("category"); // näita kõiki tooteid
  };
  setActiveButton(allBtn); // teeb all buttoni kohe lehe laadides aktiiveks
  categoryDiv.appendChild(allBtn);

  categories.forEach((category) => {
    // lisa kategooria nupud
    const catBtn = document.createElement("button");
    catBtn.classList.add("cat-btn");
    catBtn.textContent = category;
    catBtn.onclick = () => {
      setActiveButton(catBtn); // valitud kategooria nupp aktiivne
      navigate("category", category); // filtreeri kategooria kaupa
    };
    categoryDiv.appendChild(catBtn);
  });
}

displayCatBtns();

// KÕIKIDE TOODETE ALA
export async function displayProducts(category) {
  const products = await getProducts();

  // filtreeri kategooriale vastavalt
  const filteredProducts = category ? products.filter((product) => product.category === category) : products;

  // tühjendab olemasolevad tooted
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  // impordib producti konstruktori
  filteredProducts.forEach((productData) => {
    const product = new Product(productData.id, productData.title, productData.price, productData.description, productData.image);
    // tootekaardi container
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-card");
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
      console.log("Toode " + product.title + "on lisatud ostukorvi."); //confirm
      addToCart(product);
    };
    productContentDiv.appendChild(addToCartButton);

    // lisa containeri sisse
    productDiv.appendChild(productContentDiv);
    productList.appendChild(productDiv); // main
  });

  document.getElementById("product-list-container").style.display = "block";
  document.getElementById("product-page").style.display = "none";
  document.getElementById("cart-container").style.display = "none";
}
