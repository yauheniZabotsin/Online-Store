import Page from '../../core/templates/page';
import '../cart/cart.css';
import prodData from '../../components/data/data';
import { isCart } from '../../components/app/app';

class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart is Empty',
  };

  public static Products: number[] = [];

  constructor(id: string) {
    super(id);
  }

  addEventPromoCode() {}

  render() {
    const { getIsInCart, setIsInCart } = isCart;

    const countCart = document.querySelector('.total_content') as HTMLElement;
    const CartTotal = document.querySelector('.total-price span') as HTMLElement;

    if (CartPage.Products.length > 0) {
      const cartWrapper = document.createElement('div');
      cartWrapper.className = 'cart-wrapper';
      this.container.append(cartWrapper);

      const productsInCart = document.createElement('div');
      productsInCart.className = 'products-in-cart';
      cartWrapper.append(productsInCart);

      const prodItems = document.createElement('div');
      prodItems.className = 'prod-items';
      productsInCart.append(prodItems);

      const totalCart = document.createElement('div');
      totalCart.className = 'total-cart';
      cartWrapper.append(totalCart);

      const h2 = document.createElement('h2');
      h2.textContent = 'Summary';
      totalCart.append(h2);

      const totalCount = document.createElement('div');
      totalCount.className = 'price-total';
      totalCount.textContent = 'Products: ';
      const totalCountSpan = document.createElement('span');
      totalCountSpan.textContent = countCart.textContent;
      totalCount.append(totalCountSpan);
      totalCart.append(totalCount);

      const totalPrice = document.createElement('div');
      totalPrice.className = 'price-total';
      totalPrice.textContent = 'Total: ';
      const totalPriceSpan = document.createElement('span');
      totalPriceSpan.textContent = CartTotal.textContent;
      totalPrice.append(totalPriceSpan);
      totalCart.append(totalPrice);

      const promoCode = document.createElement('div');
      promoCode.className = 'promo-code';
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = 'Enter promo code';
      promoCode.append(input);
      totalCart.append(promoCode);

      const promoSpan = document.createElement('span');
      promoSpan.className = 'promo-ex';
      promoSpan.textContent = "Promo for test: 'RS', 'EPM'";
      totalCart.append(promoSpan);

      const btnBuy = document.createElement('button');
      btnBuy.textContent = 'BUY NOW';
      totalCart.append(btnBuy);

      for (let i = 0; i < CartPage.Products.length; i++) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        prodItems.append(cartItem);

        const itemIndex = document.createElement('div');
        itemIndex.className = 'item-i';
        itemIndex.textContent = `${i + 1}`; // индекс выборного продукта массива
        cartItem.append(itemIndex);

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        itemInfo.addEventListener('click', () => {
          let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
          window.location.hash = `#product-details/${CartPage.Products[idIndex]}`;
        });

        const itemImg = document.createElement('img');
        itemImg.src = prodData.products[CartPage.Products[i] - 1].thumbnail; // надо вставить
        itemInfo.append(itemImg);
        const itemDetailP = document.createElement('div');
        itemDetailP.className = 'item-detail-p';
        itemInfo.append(itemDetailP);

        const productTitle = document.createElement('div');
        productTitle.className = 'product-title';
        const h3 = document.createElement('h3');
        h3.textContent = prodData.products[CartPage.Products[i] - 1].title; //надо вставить
        productTitle.append(h3);
        itemDetailP.append(productTitle);

        const productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.textContent = ` ${prodData.products[CartPage.Products[i] - 1].description} `; //надо всавить
        itemDetailP.append(productDescription);

        const productOther = document.createElement('div');
        productOther.className = 'product-other';
        const div1 = document.createElement('div');
        div1.textContent = `Rating: ${prodData.products[CartPage.Products[i] - 1].rating} `; //надо вставить
        productOther.append(div1);
        const div2 = document.createElement('div');
        div2.textContent = `Discount: ${prodData.products[CartPage.Products[i] - 1].discountPercentage}%`; //надо вставить
        productOther.append(div2);

        itemDetailP.append(productOther);
        cartItem.append(itemInfo);

        const numberControl = document.createElement('div');
        numberControl.className = 'number-control';

        const stockControl = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.textContent = `Stock: ${prodData.products[CartPage.Products[i] - 1].stock} `; //надо вставить
        numberControl.append(stockControl);

        const incDecControl = document.createElement('div');
        incDecControl.className = 'incDec-control';
        const btn1 = document.createElement('button');
        btn1.textContent = '+';
        incDecControl.append(btn1);

        btn1.addEventListener('click', () => {
          let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
          if (
            isCart[CartPage.Products[idIndex]]?.count !== undefined &&
            isCart[CartPage.Products[idIndex]]?.count < prodData.products[CartPage.Products[idIndex] - 1].stock
          ) {
            isCart[CartPage.Products[idIndex]].count += 1;
            spanPrice.textContent = ` ${isCart[CartPage.Products[idIndex]]?.count} `;

            let count = Number(countCart.textContent);
            countCart.textContent = `${++count}`;
            totalCountSpan.textContent = countCart.textContent;

            let CartPrice = CartTotal.innerHTML.slice(1);

            CartTotal.textContent = `€${+CartPrice + prodData.products[CartPage.Products[idIndex] - 1].price}.00`;
            totalPriceSpan.textContent = CartTotal.textContent;
            isCart[CartPage.Products[idIndex]].sumPrice += prodData.products[CartPage.Products[idIndex] - 1].price;
          }
        });

        const spanPrice = document.createElement('span');
        spanPrice.textContent = ` ${isCart[CartPage.Products[i]]?.count} `; //TODO
        incDecControl.append(spanPrice);

        const btn2 = document.createElement('button');
        btn2.textContent = '-';
        incDecControl.append(btn2);
        btn2.addEventListener('click', (e: Event) => {
          let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
          if (isCart[CartPage.Products[idIndex]]?.count !== undefined) {
            isCart[CartPage.Products[idIndex]].count -= 1;

            let count = Number(countCart.textContent);
            countCart.textContent = `${--count}`;
            totalCountSpan.textContent = countCart.textContent;

            let CartPrice = CartTotal.innerHTML.slice(1);
            CartTotal.textContent = `€${+CartPrice - prodData.products[CartPage.Products[idIndex] - 1].price}.00`;
            totalPriceSpan.textContent = CartTotal.textContent;
            isCart[CartPage.Products[idIndex]].sumPrice -= prodData.products[CartPage.Products[idIndex] - 1].price;
          }

          if (
            isCart[CartPage.Products[idIndex]]?.count <= 0 ||
            isCart[CartPage.Products[idIndex]]?.count === undefined
          ) {
            // delete isCart[CartPage.Products[i]];
            isCart[CartPage.Products[idIndex]].count = 1;
            setIsInCart(String(CartPage.Products[idIndex]), false);
            CartPage.Products = Object?.entries(isCart)
              .filter((item: any) => item[1].isInCart === true)
              .map((item) => +item[0]);

            ((e.target as Element).closest('.cart-item') as HTMLElement).remove();
            if (document.querySelector('.cart-item') === null) {
              document.querySelector('.products-in-cart')?.classList.remove('products-in-cart');
              const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
              title.className = 'cart-title';
              this.container.append(title);
            }
          }
          spanPrice.textContent = ` ${isCart[CartPage.Products[idIndex]]?.count} `;
        });

        numberControl.append(incDecControl);

        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.textContent = `€${prodData.products[CartPage.Products[i] - 1].price}`; //надо вставить
        numberControl.append(amountControl);

        cartItem.append(numberControl);
      }
    } else {
      const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
      title.className = 'cart-title';
      this.container.append(title);
    }

    return this.container;
  }
}

export default CartPage;
