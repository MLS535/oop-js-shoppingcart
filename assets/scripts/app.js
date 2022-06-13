// const ;

class Product{
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;

    constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
    }

}
class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}


class Component {

    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender ){
            this.render();
        }
        // this.render();
    }
    render() {

    }

    createRootElement(tag, cssClasses, attributes){
        const rootElement = document.createElement(tag);
        if (cssClasses){
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0){
            for (const attr of attributes){
                rootElement.setAttribute(attr.name, attr.value)
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }

}


class ShoppingCart extends Component{
    items = [];


    set carItems(value) {
     this.items = value;
     this.totalOutput.innerHTML = `<h2>Total:${this.totalAmount.toFixed(2)}€ </h2>`;
    }


    get totalAmount(){
        const sum = this.items.reduce((prevValue, curItem) => {
            return prevValue + curItem.price
        }, 0);
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product){
       const updatedItems = [...this.items];
       updatedItems.push(product);
       this.carItems = updatedItems;
    }

    render() {
       const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
        <h2>Total:${0}€ </h2>
        <button>Order Now!</button>
        `
    ;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2');
        ;
    }
}


class ProductItem extends Component{
    constructor(product, renderHookId) {
        super(renderHookId, false);
    this.product = product;
    this.render();
    }

    addToCart(){
   App.addProductToCart(this.product);
    }

    render(){
      const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
            <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
            <h1>${this.product.title}</h1>
            <h3>${this.product.price}€</h3>
            <p>${this.product.description}</p>
            <button>Add to cart</button>
            </div>
            </div>
            `;
       const addCartButton = prodEl.querySelector('button');
       addCartButton.addEventListener('click', this.addToCart.bind(this));

    }
}

class ProductList extends  Component{
    products = [];
//     new Product(
//     'Table',
//     'https://www.ikea.com/es/en/images/products/mammut-childrens-table-in-outdoor-blue__0735844_pe740211_s5.jpg?f=s',
//     'blue table for children',
//     50.00
// ),
//     new Product(
//     'A carpet',
//     'https://static.turbosquid.com/Preview/2019/01/08__08_20_42/Carpetfreesignture.jpg90372B2C-418D-4252-8B64-911283D4C396Large.jpg',
//     'carpet from Aladdin',
//     99.99
// ),
    constructor(renderHookId) {
        super(renderHookId);
        this.fetchProducts();
    }

    fetchProducts() {
        this.products = [
            new Product(
                'Table',
                'https://www.ikea.com/es/en/images/products/mammut-childrens-table-in-outdoor-blue__0735844_pe740211_s5.jpg?f=s',
                'blue table for children',
                50.00
            ),
            new Product(
                'A carpet',
                'https://static.turbosquid.com/Preview/2019/01/08__08_20_42/Carpetfreesignture.jpg90372B2C-418D-4252-8B64-911283D4C396Large.jpg',
                'carpet from Aladdin',
                99.99
            ),
        ];
        this.renderProducts();
    }

    renderProducts(){
        for (const prod of this.products) {
            new ProductItem(prod, 'prod-list');
            // const prodEl = productItem.render();
        }
    }

    render(){
        this.createRootElement('ul',
            'product-list',
            [new ElementAttribute('id', 'prod-list')]);
        if (this.products && this.products.length > 0){
            this.renderProducts();
        }

    }
}

class Shop{

    constructor() {
       this.render()
    }

    render(){
        this.cart = new ShoppingCart('app');
        new ProductList('app');

    }
}


//static properties, share functionalities or data or comunication interface
class App {
    static cart;

    static init(){
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init()