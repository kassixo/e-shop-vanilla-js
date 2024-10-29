import { Inventory } from "./inventory.js";

const inventory = new Inventory();

export function addToCart(productTitle) {
  const product = inventory.getProducts().find((p) => p.title === productTitle);

  // kontrolli enne lisamist laoseisu
  if (inventory.checkStock(productTitle, 1)) {
    shoppingCart.addItem(product, 1);
    inventory.reduceStock(productTitle, 1);
    updateCartDisplay();
  } else {
    alert(`Product ${productTitle} is out of stock!`);
  }
}

// KUI VAJA, lisan selle ka window funktsioonile
window.addToCart = addToCart;

// ostukorvis olevad tooted
export function updateCartDisplay() {
  cartItems.innerHTML = shoppingCart.listItems().join("<br>");

  const total = shoppingCart.getTotal();

  if (isNaN(total)) {
    cartItems.innerHTML += `<br><h3>Total price: 0.00€</h3>`; // fall back???
    console.error("Invalid total amount:", total);
  } else {
    cartItems.innerHTML += `<br><h3>Total price: ${total.toFixed(2)}€</h3>`;
  }
}

// uuenda toote kogust ostukorvis
export function updateCartQuantity(encodedTitle, newCount) {
  const productTitle = decodeURIComponent(encodedTitle);
  // const product = inventory.getProducts().find((p) => p.title === productTitle);
  const availableStock = inventory.getStock(productTitle);

  newCount = parseInt(newCount);

  // kontrollib, kas sisestatud number ületab laojäägi vms
  if (newCount > availableStock) {
    alert(`Only ${availableStock} available in stock.`);
    return;
  }

  // uuenda toote kogust ostukorvis
  shoppingCart.items.forEach((item) => {
    if (item.product.title === productTitle) {
      item.count = newCount;
    }
  });

  updateCartDisplay(); //uus laoseis
}

//eemalda üksik toode ostukorvist
export function removeFromCart(encodedTitle) {
  const productTitle = decodeURIComponent(encodedTitle);
  shoppingCart.items = shoppingCart.items.filter((item) => item.product.title !== productTitle);
  inventory.resetStock(); // taasta laoseis
  updateCartDisplay();
}

// tühjenda ostukorv
document.getElementById("empty-cart").onclick = () => {
  shoppingCart.items.forEach((item) => {
    // taasta laoseis
    inventory.restoreStock(item.product.title, item.count);
  });
  shoppingCart.items = [];
  inventory.resetStock();
  updateCartDisplay();
};
