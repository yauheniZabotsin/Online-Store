import { modalHTML } from '../../pages/cart/modalHTML';

abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};
  public static isBtnBuy: boolean = false;

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerHTML = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}

export default Page;
