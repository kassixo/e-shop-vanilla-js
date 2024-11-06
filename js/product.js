// class

export class Product {
  // konstruktoris järjekord oluline
  constructor(id, title, price, description, image) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.count = 1;
    this.image = image;
    this.description = description;
  }

  getInfo() {
    return `Toode: ${this.title}, Hind: ${this.price}, Kogus: ${this.count}`;
  }
}
