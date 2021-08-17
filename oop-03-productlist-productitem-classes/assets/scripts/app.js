class Product {
  // title = 'DEFAULT';
  // imageUrl;
  // description;
  // price;

  constructor(title, image, price, desc) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  //to guagantee the attr structure
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component { //base component
  //use for replacing the line const xx = document.createElement('xx'); after render()
  constructor(renderHookId, shouldRender = true) { //The id of this instance is set to the first argument, and if nothing or true is passed as a second argument, the render method is called.
    this.hookId = renderHookId;
    if(shouldRender) {
      this.render();
    }
  }

  render() {}

  createRootElement(tag, cssClasses, attributes) {
    //add this to the hood ID
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  //inherit from class Component
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`; //trigger getter
  }

  get totalAmount() {
    //use getter to modify data before saving it
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) { //call the constructor from parent class
    super(renderHookId, false); //not render yet
    this.orderProducts = () => {
      console.log('Ordering...');
      console.log(this.items);
    };
    this.render(); //render after orderProducts is called
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems; //trigger the setter
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click', this.orderProducts);
    this.totalOutput = cartEl.querySelector('h2');  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];

  constructor(renderHookId) {
    super(renderHookId); //call parent constructor
    this.fetchProducts(); //create html & display data 
  }

  fetchProducts() {
    this.products = [
      new Product(
        "Pawsome Desk Calendar",
        "https://images.summitmedia-digital.com/cosmo/images/2021/01/15/2021-desk-calendars-1610691684.jpg",
        19.99,
        "This desk calendar is a must for any workspace. It’s compact design helps you keep track of dates without taking up too much desk space. It includes spreads from January to December."
      ),
      new Product(
        "Cute Loose-leaf Notebook",
        "https://cdn.shopify.com/s/files/1/0255/4757/1246/products/19663025647_158012568_1800x1800.jpg?v=1600415576",
        20.99,
        "Special and novelty designs with Cute Korean Kawaii Japanese Accent. Its all about pink and kawaii."
      ),
      new Product(
        "Small Daisy Pencil Case",
        "https://cdn.shopify.com/s/files/1/0255/4757/1246/products/17029228394_825501147.640x640_640x640.jpg?v=1599275230",
        9.99,
        "This Simple Frosted TPU Pencil Case is designed by Kawaii Stationery Shop."
      )
    ];
    this.renderProducts(); //create html & display data
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list'); //create html for each data
    }
  }

  render() {
    //every time go to app, create ul then create a product list and add products
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list")
    ]);

    if (this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() { 
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
