import Page from "../../core/templates/page";

class CartPage extends Page {
  static TextObject = {
    MainTitle: "Cart-page"
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;