class ProductManager {
    products;
    static id = 0
    constructor(title, description, price, thumbnail, code, stock,) {
        ProductManager.id += 1;
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    addProduct(product) {
        let existe = this.products.find((p) => p.code === product.code);
        if (existe) {
            return console.log("El CODIGO  " + product.code + " Ya existe");
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log("Falta llenar un campo")
        }

        else {
            this.products.push(product);
            ProductManager.id++;
        }
    }

    getProducts() {
        return this.products;

    }

    getProductsById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product)
        } else {
            console.log("error")
        }
        // no pude agregarle el ID. 
    }

}

const nuevosProductos = new ProductManager();

const product1 = {
    title: "Cheescake",
    description: "Torta Clasica",
    price: 2500,
    thumbnail: "ABCD",
    code: "120",
    stock: 10,

};

const product2 = {
    title: "Chocotorta",
    // description: "Torta Clasica",   //  *anulo para forzar error
    price: 2700,
    thumbnail: "ABCDE",
    code: "121",
    stock: 8,

};

const product3 = {
    title: "Marquise",
    description: "Torta Clasica",
    price: 3100,
    thumbnail: "ABCDEFG",
    code: "120", //repite code para forzar error
    stock: 15,
};

const product4 = {
    title: "Chocoreo",
    description: "Torta Clasica",
    price: 3300,
    thumbnail: "ABCDEFGH",
    code: "123",
    stock: 10,
};

nuevosProductos.addProduct(product1);
nuevosProductos.addProduct(product2);
nuevosProductos.addProduct(product3);
nuevosProductos.addProduct(product4);

console.log(nuevosProductos.getProducts())

console.log("hola mundo")
console.log(nuevosProductos.getProductsById(10))