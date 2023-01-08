import prodData from '../data/products';
import { DataViewer } from './dataviewer';

import MainPages from '../../pages/main/main';
import Page from '../../core/templates/page';
import CartPage from '../../pages/cart/cart';
import ErrorPage from '../../pages/error/errors';
import ProductPage from '../../pages/product/product';
import { brandData, categoryData } from '../data/filters';
// import { filterProducts } from '../../pages/main/functions';

export const enum PageIds {
    MainPages = 'main',
    CartPages = 'cart',
}

class App {
    private static container: HTMLElement = document.querySelector("main") as HTMLElement;
    private initialPage: MainPages;
    public view: DataViewer;
    
    constructor() {
      this.view = new DataViewer();
      this.initialPage = new MainPages("main");
  }

    public renderNewPage(idPage: string) {
        App.container.innerHTML = '';

        let page: Page | null = null;
    
        if(idPage === PageIds.MainPages){
          page = new MainPages(idPage);
        } else if(idPage === PageIds.CartPages){
          page = new CartPage(idPage);
        } else if(idPage === MainPages.getId()){
          page = new ProductPage(idPage);          
        } else {
          page = new ErrorPage(idPage, '404');
        }
    
        if (page) {
          const pageHTML = page.render();
          App.container.append(pageHTML);
          
          if (page instanceof MainPages) {
            this.view.viewProducts(prodData);
            this.view.viewCategories(categoryData);
            this.view.viewBrands(brandData);
            page.addEventsSlider();
            page.addEventsModal();
            page.searchProducts();
          }
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
          const hash = window.location.hash.slice(1);
          this.renderNewPage(hash);
        })
    }

    run() {
        this.renderNewPage('main');
        this.enableRouteChange();
    }
}

export default App;
