import Page from '../../core/templates/page';
import '../product/product.css';
import prodData from '../../components/data/data';
import MainPages from '../main/main';

import CartPage from '../cart/cart';
import { isCart } from '../../components/app/app';

class ProductPage extends Page {
  static TextObject = {
    ProductTitle: 'product-details',
  };

  constructor(id: string) {
    super(id);
  }

  renderProductDetailItem(productDetailItem: HTMLElement, title: string, text: string) {
    const h3 = document.createElement('h3');
    h3.textContent = title;
    productDetailItem.append(h3);
    const p = document.createElement('p');
    p.textContent = text;
    productDetailItem.append(p);
  }

  addEventImg() {
    const imgs = document.querySelectorAll('.slides img');
    const grandPhoto = <HTMLImageElement>document.querySelector('.grand-photo-img');

    imgs.forEach((img: Element) => {
      img.addEventListener('click', (e: Event) => {
        grandPhoto.src = (e.target as HTMLImageElement).src;
      });
    });
  }

  render(): HTMLElement {
    const hash = window.location.hash;
    const id = +window.location.hash.substring(+hash.indexOf('/') + 1, +hash.length) - 1;
    const productId = id + 1;

    const productWrap = document.createElement('div');
    this.container.append(productWrap);

    const linkNavigation = document.createElement('div');
    linkNavigation.className = 'link-navigation';
    for (let i = 0; i < 4; i++) {
      const link = document.createElement('a');

      if (i === 0) {
        link.innerHTML = 'STORE';
        link.href = '#main';
      } else if (i === 1) {
        link.innerHTML = prodData.products[id].category;
        linkNavigation.append((document.createElement('span').textContent = '>>'));
      } else if (i === 2) {
        link.innerHTML = prodData.products[id].brand;
        linkNavigation.append((document.createElement('span').textContent = '>>'));
      } else {
        link.innerHTML = prodData.products[id].title;
        linkNavigation.append((document.createElement('span').textContent = '>>'));
      }

      linkNavigation.appendChild(link);
    }
    this.container.append(linkNavigation);

    const productDetail = document.createElement('div');
    productDetail.className = 'product-detail';
    const productTitle = document.createElement('h2');
    productTitle.className = 'product-title';
    productTitle.textContent = prodData.products[id].title;
    productDetail.append(productTitle);
    this.container.append(productDetail);

    const productData = document.createElement('div');
    productData.className = 'product-data';
    const productPhotos = document.createElement('div');
    productPhotos.className = 'product-photos';
    const slides = document.createElement('div');
    slides.className = 'slides';
    for (let i = 0; i < prodData.products[id].images.length; i++) {
      const img = document.createElement('img');
      img.alt = 'slide';
      img.src = prodData.products[id].images[i];
      slides.append(img);
    }
    productData.append(productPhotos);
    productPhotos.append(slides);
    productTitle.before(productData);

    const grandPhoto = document.createElement('div');
    grandPhoto.className = 'grand-photo';
    const grandPhotoImg = document.createElement('img');
    grandPhotoImg.className = 'grand-photo-img';
    grandPhotoImg.src = prodData.products[id].images[0];
    grandPhoto.append(grandPhotoImg);
    productPhotos.append(grandPhoto);
    this.container.append(productData);

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';

    const productDetailItem = document.createElement('div');
    productDetailItem.className = 'product-detail-item';
    this.renderProductDetailItem(productDetailItem, 'Description:', prodData.products[id].description);
    this.renderProductDetailItem(
      productDetailItem,
      'Discount Percentage:',
      `${prodData.products[id].discountPercentage}`
    );
    this.renderProductDetailItem(productDetailItem, 'Rating:', `${prodData.products[id].rating}`);
    this.renderProductDetailItem(productDetailItem, 'Stock:', `${prodData.products[id].stock}`);
    this.renderProductDetailItem(productDetailItem, 'Brand:', prodData.products[id].brand);
    this.renderProductDetailItem(productDetailItem, 'Category:', prodData.products[id].category);
    productInfo.append(productDetailItem);

    productDetail.append(productData);
    productData.append(productInfo);

    const addToCart = document.createElement('div');
    addToCart.className = 'add-to-cart';
    const cartButton = document.createElement('div');
    cartButton.className = 'cart-button';
    cartButton.textContent = `€${prodData.products[id].price}.00`;

    const btnCart = document.createElement('button');

    const { getIsInCart, setIsInCart } = isCart;

    let isInCart = getIsInCart(String(productId)); //cюда
    console.log(`isInCart: ${productId}`, isInCart);
    console.log('isCart', isCart);
    btnCart.textContent = !isInCart ? 'ADD TO CART' : 'DROP FROM CART';
    btnCart.addEventListener('click', () => {
      const CartTotal = document.querySelector('.total-price span') as HTMLElement;
      let CartPrice = CartTotal.innerHTML.slice(1);

      const countCart = document.querySelector('.total_content') as HTMLElement;
      let count = Number(countCart.textContent);

      if (btnCart.textContent === 'ADD TO CART') {
        btnCart.textContent = 'DROP FROM CART';
        countCart.textContent = `${++count}`;
        CartTotal.textContent = `€${+CartPrice + prodData.products[id].price}.00`;
        setIsInCart(String(productId), true);

        isCart[prodData.products[id].id].sumPrice += prodData.products[id].price;
      } else {
        btnCart.textContent = 'ADD TO CART';
        console.log(isCart[id]);
        console.log(isCart[CartPage.Products[id]]);
        countCart.textContent = `${count - isCart[prodData.products[id].id]?.count}`;
        CartTotal.textContent = `€${+CartPrice - isCart[prodData.products[id].id]?.sumPrice}.00`;
        setIsInCart(String(productId), false);
      }
      CartPage.Products = Object?.entries(isCart)
        .filter((item: any) => item[1].isInCart === true)
        .map((item) => +item[0]);
    });

    const btnBuy = document.createElement('button');
    btnBuy.textContent = 'BUY NOW';
    cartButton.append(btnCart);
    cartButton.append(btnBuy);
    productData.append(addToCart);
    addToCart.append(cartButton);

    return this.container;
  }
}

export default ProductPage;
