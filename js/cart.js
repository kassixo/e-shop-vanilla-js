import { Inventory } from "./inventory.js";

let items = [];
const inventory = new Inventory(items);
export default inventory;

export function getCart() {
  return items;
}

export function addToCart(product) {
  const existingItem = items.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.count += 1;
  } else {
    items.push({ product, count: 1 });
  }
}

function getTotal() {
  let total = 0;
  items.forEach((item) => {
    const price = item.product.price;
    const count = item.count;

    if (!isNaN(price) && !isNaN(count)) {
      total += price * count;
    } else {
      console.error(`Invalid price or count for item: ${item.product.title}`, { price, count });
    }
  });
  return total;
}

export function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; // Clear any existing items in the cart

  items.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");
    cartItemDiv.innerHTML = `<p>${item.product.title}</p>`;

    // Create cart count INPUT
    const countInput = document.createElement("input");
    countInput.type = "number";
    countInput.id = `cart-item-quantity-${index}`;
    countInput.value = item.count >= 1 ? item.count : 1; // Set initial count with a fallback
    countInput.min = 1;
    countInput.max = item.product.count || 1;
    countInput.onchange = (event) => updateCartQuantity(item.product.id, event.target.value);

    // Create cart delete item button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "X";
    removeButton.onclick = () => removeFromCart(item.product.title);

    // Append input and button to cart item div
    cartItemDiv.appendChild(countInput);
    cartItemDiv.appendChild(removeButton);

    // Append cartItemDiv to the cart container
    cartItems.appendChild(cartItemDiv);
  });

  // Create a new div for the total price and set its class
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");

  // Calculate total and display it in the totalDiv
  const total = getTotal();
  if (isNaN(total)) {
    totalDiv.innerHTML = `<h3>Total price: 0.00€</h3>`;
    console.error("Invalid total amount:", total);
  } else {
    totalDiv.innerHTML = `<h3>Total price: ${total.toFixed(2)}€</h3>`;
  }

  // Append the totalDiv to the cart container
  cartItems.appendChild(totalDiv);
}

// uuenda toote kogust ostukorvis
export function updateCartQuantity(productId, newCount) {
  // const product = inventory.getProducts().find((p) => p.title === productTitle);
  console.log("Product ID:", productId);
  // const availableStock = inventory.getStock(productId);
  // console.log("Available Stock:", availableStock);
  newCount = parseInt(newCount);

  // // kontrollib, kas sisestatud number ületab laojäägi vms
  // if (newCount > availableStock) {
  //   alert(`Only ${availableStock} available in stock.`);
  //   return;
  // }

  // uuenda toote kogust ostukorvis
  items.forEach((item) => {
    if (item.product.id === productId) {
      item.count = newCount;
    }
  });

  updateCartDisplay(); //uus laoseis
}

//eemalda üksik toode ostukorvist
export function removeFromCart(encodedTitle) {
  const productTitle = decodeURIComponent(encodedTitle);
  items = items.filter((item) => item.product.title !== productTitle);
  inventory.resetStock(); // taasta laoseis
  updateCartDisplay();
}

// tühjenda ostukorv
document.getElementById("empty-cart").onclick = () => {
  items.forEach((item) => {
    // taasta laoseis
    inventory.restoreStock(item.product.title, item.count);
  });
  items = [];
  inventory.resetStock();
  updateCartDisplay();
};
