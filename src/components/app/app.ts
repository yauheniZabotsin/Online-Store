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

class App {
    // view: DataViewer;

    private static container: HTMLElement = document.querySelector("main") as HTMLElement;
    private initialPage: MainPages;

    static renderNewPage(idPage: string){
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
    
        if(page){
          const pageHTML = page.render();
          App.container.append(pageHTML);
          if(page instanceof MainPages) {
            page.addEventsSlider();
            page.addEventsModal();
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
