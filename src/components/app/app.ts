import prodData from '../data/productsData';
import { DataViewer } from './dataviewer';
import MainPages from '../../pages/main/main';
import Page from '../../core/templates/page';
import CartPage from '../../pages/cart/cart';
import ErrorPage from '../../pages/error/errors';
import ProductPage from '../../pages/product/product';
import { brandData, categoryData } from '../data/filtersData';
import { Filters } from '../../pages/main/filters';
import { Product } from '../interfaces/interfaces';

export const enum PageIds {
    MainPages = 'main',
    CartPages = 'cart',
}

export function getIsInCart(id: string): boolean {
    return isCart[id]?.isInCart;
}

export function setIsInCart(id: string, bool: boolean) {
    return (isCart[id] = { isInCart: bool, count: 1, sumPrice: 0 });
}

let localIsCart: string = JSON.parse(localStorage.getItem('isCart') || '0');

export const isCart: any = localIsCart ? localIsCart : {};

class App {
    private static container: HTMLElement = document.querySelector('main') as HTMLElement;
    public initialPage: MainPages;
    public view: DataViewer;
    public filters: Filters;

    constructor() {
        this.view = new DataViewer();
        this.filters = new Filters();
        this.initialPage = new MainPages('main');
    }

    public renderNewPage(idPage: string) {
        App.container.innerHTML = '';
        let page: Page | null = null;

        if (idPage === PageIds.MainPages) {
            page = new MainPages(idPage);
        } else if (idPage === PageIds.CartPages) {
            page = new CartPage(idPage);
        } else if (window.location.hash.includes('#product-details')) {
            let productID = +window.location.hash.split('/')[1];
            if (1 <= productID && productID <= 100) {
                page = new ProductPage(idPage);
            }
        }

        if (page === null) {
            page = new ErrorPage(idPage, '404');
        }

        if (page) {
            const pageHTML = page.render();
            App.container.append(pageHTML);
            if (page instanceof MainPages) {
                this.view.viewProducts(prodData);
                this.view.viewCategories(categoryData);
                this.view.viewBrands(brandData);
                page.addLocalStorage();
                page.addEventsModal();
                page.addEventBtn();
                page.linkToCart();
                page.addClassInCart();
                page.switchToSmall();
                page.switchToBig();
                const categoryFilter = Array.from(document.querySelectorAll('.category-input')) as Array<HTMLInputElement>;
                const brandFilter = Array.from(document.querySelectorAll('.brand-input')) as Array<HTMLInputElement>;
                categoryFilter.forEach((filter) => filter.addEventListener('change', () => this.filters.filterProducts()));
                brandFilter.forEach((filter) => filter.addEventListener('change', () => this.filters.filterProducts()));
                const priceUpFilter = document.querySelector('.from-price') as HTMLInputElement;
                priceUpFilter.addEventListener('change', () => this.filters.filterPrice());
                const priceDownFilter = document.querySelector('.to-price') as HTMLInputElement;
                priceDownFilter.addEventListener('change', () => this.filters.filterPrice())
                const stockUpFilter = document.querySelector('.from-stock') as HTMLInputElement;
                stockUpFilter.addEventListener('change', () => this.filters.filterStock());
                const stockDownFilter = document.querySelector('.to-stock') as HTMLInputElement;
                stockDownFilter.addEventListener('change', () => this.filters.filterStock());
                const searchFilter = document.querySelector('#search-input') as HTMLInputElement;
                searchFilter.addEventListener('input', () => this.filters.searchProducts());
                const sortFilter = document.querySelector('#option-selector') as HTMLSelectElement;
                sortFilter.addEventListener('change', () => this.filters.sortProducts());
            }

            if (page instanceof ProductPage) {
                page.addEventImg();
            }

            if (page instanceof CartPage) {
                page.addEventPromoCode();
            }
        }
    }

    public enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            this.renderNewPage(hash);
        });
    }

    run() {
        this.renderNewPage('main');
        this.enableRouteChange();
    }
}

export default App;
