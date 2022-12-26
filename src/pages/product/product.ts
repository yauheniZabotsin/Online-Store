import Page from "../../core/templates/page";
import "../product/product.css";

class ProductPage extends Page {
  static TextObject = {
    ProductTitle: "product-details"
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const productDetails = document.createElement("div");
    productDetails.className = "productt-wrap"
    const title = this.createHeaderTitle(ProductPage.TextObject.ProductTitle);
    this.container.append(title);
    return this.container;
  }

}

export default ProductPage;