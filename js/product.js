// class

export class Product {
  constructor(title, price, count, image, category, description) {
    this.title = title;
    this.price = price;
    this.count = count;
    this.image = image;
    this.category = category;
    this.description = description;
  }

  getInfo() {
    return `Toode: ${this.title}, Hind: ${this.price}, Kogus: ${this.count}`;
  }
}
