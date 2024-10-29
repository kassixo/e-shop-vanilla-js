// class

export class Product {
  constructor(id, title, price, count, image, category, description) {
    this.id = id;
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
