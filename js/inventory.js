export class Inventory {
  // konstruktor peab olema puhas
  constructor() {
    this.products = {};
  }

  // kõik tooted
  getInventoryProducts() {
    return this.products;
  }

  // kontrollin laoseisu
  checkStock(productId, count = 1) {
    return (this.products[productId] || 0) >= count;
  }

  // vähendan laoseisu, kui toode lisatakse ostukorvi
  reduceStock(productId, count = 1) {
    if (this.checkStock(productId, count)) {
      this.products[productId] -= count;
    } else {
      throw new Error("Not enough stock.");
    }
  }

  // kindla toote laoseis
  getStock(productId) {
    return this.products[productId] || 0;
  }

  // toote laoseisu taastamine, kui toode eemaldatakse ostukorvist
  restoreStock(productId, count) {
    this.products[productId] = (this.products[productId] || 0) + count;
  }
}
