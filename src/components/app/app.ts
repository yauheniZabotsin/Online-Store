import prodData from '../data/data';
import { DataViewer } from './dataviewer';

import MainPages from '../../pages/main/main';
import Page from '../../core/templates/page';
import CartPage from '../../pages/cart/cart';
import ErrorPage from '../../pages/error/errors';

export const enum PageIds {
    MainPages = 'main-page',
    CartPages = 'cart-page',
}

class App {
    view: DataViewer;

    private static container: HTMLElement = document.querySelector("main") as HTMLElement;
    private initialPage: MainPages;

    static renderNewPage(idPage: string){
        App.container.innerHTML = '';
        let page: Page | null = null;
    
        if(idPage === PageIds.MainPages){
          page = new MainPages(idPage);
        } else if(idPage === PageIds.CartPages){
          page = new CartPage(idPage);
        } else {
          page = new ErrorPage(idPage, '404');
        }
    
        if(page){
          const pageHTML = page.render();
          App.container.append(pageHTML);
        }
    }

    private enableRouteChange(){
        window.addEventListener('hashchange', () => {
          const hash = window.location.hash.slice(1);
          App.renderNewPage(hash);
        })
    }

    constructor() {
        this.view = new DataViewer();
        this.initialPage = new MainPages("main-page");
    }

    run() {
        // this.view.viewProducts(prodData);
        // App.renderNewPage('main-page');
        this.enableRouteChange();
    }
}

export default App;
