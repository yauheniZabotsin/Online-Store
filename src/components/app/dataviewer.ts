import { Data, Product } from "../interfaces/interfaces";
import Products from "./dataloader";

export class DataViewer {
    products: Products;

    constructor() {
        this.products = new Products();
    }

    viewProducts(data: Data) {
        const items: Array<Product> = data.products;
        this.products.loadData(items);
    }
}
