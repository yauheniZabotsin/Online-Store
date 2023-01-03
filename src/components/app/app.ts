import prodData from '../data/data';
import { DataViewer } from './dataviewer';

import MainPages from '../../pages/main/main';
import Page from '../../core/templates/page';
import CartPage from '../../pages/cart/cart';
import ErrorPage from '../../pages/error/errors';
import ProductPage from '../../pages/product/product';

export const enum PageIds {
    MainPages = 'main',
    CartPages = 'cart',

}

export const isCart = {
  isInCart: false,
  getIsInCart: (): boolean => isCart.isInCart,
  setIsInCart: (bool: boolean) => {
      isCart.isInCart = bool;
  },
};

class App {
    // view: DataViewer;

    isInCart = false;
    getIsInCart() {
        return this.isInCart;
    }

    setIsInCart(bool: boolean) {
        this.isInCart = bool;
    }

    private static container: HTMLElement = document.querySelector("main") as HTMLElement;
    private initialPage: MainPages;

    static renderNewPage(idPage: string){
        App.container.innerHTML = '';
        let page: Page | null = null;
    
        if(idPage === PageIds.MainPages){
          page = new MainPages(idPage);
        } else if(idPage === PageIds.CartPages){
          page = new CartPage(idPage);
        } else if(window.location.hash.includes("#product-details")){
          let productID = +window.location.hash.split("/")[1];
          if(1 <= productID && productID <= 100){
            page = new ProductPage(idPage);
          }
        } 
        
        if(page === null) {
          page = new ErrorPage(idPage, '404');
        }
    
        if(page){
          const pageHTML = page.render();
          App.container.append(pageHTML);
          if(page instanceof MainPages) {
            page.addEventsSlider();
            page.addEventsModal();
            page.addEventBtn();
          }
          if(page instanceof ProductPage) {
            page.addEventImg();
          }
        }
    }

    private enableRouteChange(){
        window.addEventListener('hashchange', () => {
          const hash = window.location.hash.slice(1);
          App.renderNewPage(hash);
        })
    }

    constructor() {
        // this.view = new DataViewer();
        this.initialPage = new MainPages("main");
    }

    run() {
        // this.view.viewProducts(prodData);
        App.renderNewPage('main');
        this.enableRouteChange();
    }
}

export default App;
