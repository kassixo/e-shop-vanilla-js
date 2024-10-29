import { Product } from "./product.js"; // impordin product klassi

export class Inventory {
  constructor(products = []) {
    this.products = products;
    this.originalStock = {}; // jälgib alg laoseisu hiljem resettimiseks

    // esialgne laoseis
    this.products.forEach((product) => {
      this.originalStock[product.id] = product.count;
    });
  }

  // kõik tooted
  getProducts() {
    return this.products;
  }

  // kontrollin laoseisu
  checkStock(productId, count) {
    const product = this.products.find((p) => p.id === productId);
    return product && product.count >= count;
  }

  // vähendan laoseisu, kui toode lisatakse ostukorvi
  reduceStock(productId, count) {
    const product = this.products.find((p) => p.id === productId);
    if (product && product.count >= count) {
      product.count -= count;
    }
  }

  // kindla toote laoseis
  getStock(productId) {
    const product = this.products.find((p) => p.id === productId);
    return product ? product.count : 0;
  }

  // toote laoseisu taastamine, kui toode eemaldatakse ostukorvist
  restoreStock(productId, count) {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      //   product.count += count;
      product.count = Math.min(product.count + count, this.originalStock[product.id]);
    }
  }

  // taasta kõik algsesse seisu
  resetStock() {
    this.products.forEach((product) => {
      product.count = this.originalStock[product.id];
    });
  }
}
