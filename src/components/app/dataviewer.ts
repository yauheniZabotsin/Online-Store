import { categoryData } from '../data/filters';
import { Data, Filter, Product } from '../interfaces/interfaces';
import { Brands, Categories, Products } from './dataloader';

export class DataViewer {
    products: Products;
    brands: Brands;
    categories: Categories;

    constructor() {
        this.products = new Products();
        this.categories = new Categories();
        this.brands = new Brands();
    }

    viewProducts(data: Data): void {
        const prodItems: Array<Product> = data.products;
        this.products.loadProducts(prodItems);
    }

    viewCategories(data: Array<Filter>): void {
      const catItems: Array<Filter> = data;
      this.categories.loadCategories(catItems);
    }

    viewBrands(data: Array<Filter>): void {
      const brandItems: Array<Filter> = data;
      this.brands.loadBrands(brandItems);
    }
}


