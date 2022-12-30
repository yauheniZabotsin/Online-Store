import Page from "../../core/templates/page";
import "../cart/cart.css";

class CartPage extends Page {
  static TextObject = {
    MainTitle: "Cart is Empty"
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    // const 


    const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
    title.className = "cart-title"
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;