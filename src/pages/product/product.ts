import Page from "../../core/templates/page";
import "../product/product.css";
import prodData from '../../components/data/data';

class ProductPage extends Page {
  static TextObject = {
    ProductTitle: "product-details"
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const productWrap = document.createElement("div");
    this.container.append(productWrap);

    const linkNavigation = document.createElement("div");
    linkNavigation.className = "link-navigation";
    for(let i=0; i<4; i++){
      const link = document.createElement("a");
      linkNavigation.appendChild(link);
    }
    this.container.append(linkNavigation);

    const productDetail = document.createElement("div");
    productDetail.className = "product-detail";
    const productTitle = document.createElement("h2");
    productTitle.className = "product-title";
    productTitle.textContent = prodData.products[0].title;
    productDetail.appendChild(productTitle);
    this.container.append(productDetail);

    const productData = document.createElement("div");
    productData.className = "product-data";
    const productPhotos = document.createElement("div");
    productPhotos.className = "product-photos";
    const slides = document.createElement("div");
    slides.className = "slides";
    for(let i = 1; i < 4; i++){
      const img = document.createElement("img");
      img.alt = "slide";
      img.src = prodData.products[0].images[i];
      slides.append(img);
    }
    productPhotos.append(slides);
    productData.append(productPhotos);
    this.container.append(productData);

    return this.container;
  }

}

export default ProductPage;