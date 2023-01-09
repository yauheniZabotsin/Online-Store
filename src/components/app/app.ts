import prodData from '../data/products';
import { DataViewer } from './dataviewer';
import MainPages from '../../pages/main/main';
import Page from '../../core/templates/page';
import CartPage from '../../pages/cart/cart';
import ErrorPage from '../../pages/error/errors';
import ProductPage from '../../pages/product/product';
import { brandData, categoryData } from '../data/filters';

export const enum PageIds {
  MainPages = 'main',
  CartPages = 'cart',
}

export const isCart: any = {
  getIsInCart: (id: string): boolean => isCart[id]?.isInCart,
  setIsInCart: (id: string, bool: boolean) => {
    isCart[id] = { isInCart: bool, count: 1, sumPrice: 0 };
  },
};

class App {
  isInCart = false;

  getIsInCart() {
    return this.isInCart;
  }

  setIsInCart(bool: boolean) {
    this.isInCart = bool;
  }

  private static container: HTMLElement = document.querySelector('main') as HTMLElement;
  private initialPage: MainPages;
  public view: DataViewer;

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

  constructor() {
    this.view = new DataViewer();
    this.initialPage = new MainPages('main');
  }

  run() {
    this.renderNewPage('main');
    this.enableRouteChange();
  }
}

export default App;
