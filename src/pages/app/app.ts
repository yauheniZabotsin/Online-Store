import MainPages from "../main/main";
import Page from "../../core/templates/page";
import CartPage from "../cart/cart";
import ErrorPage from "../error/errors";

export const enum PageIds {
  MainPages = 'main-page',
  CartPages = 'cart-page',
}

class App {
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
    this.initialPage = new MainPages("main-page");
  }

  run(){
    App.renderNewPage('main-page');
    this.enableRouteChange()
  }
}

export default App;