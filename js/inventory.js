import { Product } from "./product.js"; // impordin product klassi

export class Inventory {
  constructor(products = []) {
    this.products = products;
    this.originalStock = {}; // jälgib alg laoseisu hiljem resettimiseks

    // esialgne laoseis
    this.products.forEach((product) => {
      this.originalStock[product.title] = product.count;
    });
  }

  // kõik tooted
  getProducts() {
    return this.products;
  }

  // kontrollin laoseisu
  checkStock(productTitle, count) {
    const product = this.products.find((p) => p.title === productTitle);
    return product && product.count >= count;
  }

  // vähendan laoseisu, kui toode lisatakse ostukorvi
  reduceStock(productTitle, count) {
    const product = this.products.find((p) => p.title === productTitle);
    if (product && product.count >= count) {
      product.count -= count;
    }
  }

  // kindla toote laoseis
  getStock(productTitle) {
    const product = this.products.find((p) => p.title === productTitle);
    return product ? product.count : 0;
  }

  // toote laoseisu taastamine, kui toode eemaldatakse ostukorvist
  restoreStock(productTitle, count) {
    const product = this.products.find((p) => p.title === productTitle);
    if (product) {
      product.count += count;
    }
  }

  // taasta kõik algsesse seisu
  resetStock() {
    this.products.forEach((product) => {
      product.count = this.originalStock[product.title];
    });
  }
}
