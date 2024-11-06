import { inventory } from "./index.js";

let items = [];

export function getCart() {
  return items;
}

// ostukorvi numbri ikoon
const updateCartCount = () => {
  const count = getCartItemCount();
  const cartCountElement = document.getElementById("cart-count");
  if (count > 0) {
    cartCountElement.style.display = "inline";
    cartCountElement.textContent = count;
  } else {
    cartCountElement.style.display = "none";
  }
};

// numbri ikoon on alguses 0
export function getCartItemCount() {
  return items.reduce((total, item) => total + item.count, 0);
}

// lisa ostukorvi
export function addToCart(product) {
  if (inventory.checkStock(product.id)) {
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.count += 1;
    } else {
      items.push({ ...product, count: 1 });
    }
    inventory.reduceStock(product.id);
  } else {
    alert("Product is not in stock!");
  }

  // uuenda ostukorvis olevate toodete kogust kohe peale toote ostukorvi lisamist
  updateCartCount();
}

function getTotal() {
  let total = 0;
  items.forEach((item) => {
    const price = item.price;
    const count = item.count ?? 1;

    if (!isNaN(price) && !isNaN(count)) {
      total += price * count;
    } else {
      console.error(`Invalid price or count for item: ${item.title}`, { price, count });
    }
  });
  return total;
}

export function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  // kontrolli kas ostukorv on tühi
  if (items.length === 0) {
    cartItems.innerHTML = "<p>No items in cart</p>";
    return; // lõpeta edasine kood kui ostukorv on tühi
  }

  items.forEach((item, index) => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart-item");

    // toote detailid
    const cartItemDetailsDiv = document.createElement("div");
    cartItemDetailsDiv.classList.add("cart-item-details");
    cartItemDetailsDiv.innerHTML = `
      <div class="cart-item-product-title"><p>${item.title}</p></div>
      <div class="cart-item-product-price"><p>${item.price.toFixed(2)}€</p></div>`;

    // input
    const countInput = document.createElement("input");
    countInput.type = "number";
    countInput.id = `cart-item-quantity-${index}`;
    countInput.value = item.count >= 1 ? item.count : 1; // fallback
    countInput.min = 1;
    countInput.max = item.count || 1;
    countInput.onchange = (event) => updateCartQuantity(item.id, event.target.value);

    cartItemDetailsDiv.appendChild(countInput);

    // kustuta toode nupp
    const cartItemRemoveDiv = document.createElement("div");
    cartItemRemoveDiv.classList.add("cart-item-remove");
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-btn");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = () => removeFromCart(item);

    // appends
    cartItemRemoveDiv.appendChild(removeButton);
    cartItemDiv.appendChild(cartItemDetailsDiv);
    cartItemDiv.appendChild(cartItemRemoveDiv);

    cartItems.appendChild(cartItemDiv);
  });

  // total price div
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");

  // totali arvutamine
  const total = getTotal();
  if (isNaN(total)) {
    totalDiv.innerHTML = `<div class="product-price">Total price: 0.00€</div>`;
    console.error("Invalid total amount:", total);
  } else {
    totalDiv.innerHTML = `<div class="product-price">Total price: ${total.toFixed(2)}€</div>`;
  }

  cartItems.appendChild(totalDiv);
}

// uuenda toote kogust ostukorvis
export function updateCartQuantity(productId, newCount) {
  newCount = parseInt(newCount);

  // uuenda ainult siis kui newCount on number suurem kui 0
  if (isNaN(newCount) || newCount < 1) return;

  // uuenda toote kogust ostukorvis
  items.forEach((item) => {
    if (item.id === productId) {
      item.count = newCount;
    }
  });

  updateCartDisplay(); //uus laoseis
  updateCartCount(); // uus cart count number
}

//eemalda üksik toode ostukorvist
export function removeFromCart(product) {
  items = items.filter((item) => item.id !== product.id);
  inventory.restoreStock(product.id, product.count); // taasta laoseis
  updateCartCount();
  updateCartDisplay(); // uus cart count number
}

// tühjenda ostukorv
document.getElementById("empty-cart").onclick = () => {
  items.forEach((item) => {
    // taasta laoseis
    inventory.restoreStock(item.id, item.count);
  });
  items = [];
  updateCartDisplay();
  updateCartCount(); // uus cart count number
};
