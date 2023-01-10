import Page from '../../core/templates/page';
import '../cart/cart.css';
import prodData from '../../components/data/products';
import { isCart } from '../../components/app/app';

import { setIsInCart } from '../../components/app/app';
import { getIsInCart } from '../../components/app/app';

class CartPage extends Page {
  static TextObject = {
    MainTitle: 'Cart is Empty',
  };

  public static local: string = JSON.parse(localStorage.getItem('CartPage.Products') || '[]');

  public static Products: any = CartPage.local ? CartPage.local : [];

  constructor(id: string) {
    super(id);
  }

  addEventPromoCode() {
    let count = 0;
    let codePrice;

    const form = <HTMLFormElement>document.querySelector('form');
    const search = <HTMLInputElement>document.querySelector('.promo-code input');

    const promoCode = document.querySelector('.promo-code');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const newPrice = document.querySelectorAll('.newTotalPrice span');
      const priceTotal = document.querySelector('.price-total') as HTMLElement;
      const PriceText = priceTotal.querySelector('span');
      let PriceNumber = Number(PriceText?.textContent?.slice(1));

      if (search.value.toLocaleUpperCase() === 'RS' || search.value.toLocaleUpperCase() === 'EPM') {
        const res = document.createElement('div');
        res.className = 'res-promo';
        res.textContent =
          search.value.toLocaleUpperCase() === 'RS' ? 'Rolling Scopes School - 10% ' : 'EPAM Systems - 10% - ';
        const spanAdd = document.createElement('span');
        spanAdd.textContent = 'ADD';
        res.append(spanAdd);
        promoCode?.after(res);

        spanAdd.addEventListener('click', (e) => {
          if (count < 9) {
            count++;
            (e.target as Element).closest('.res-promo')?.remove();
            priceTotal.classList.add('old-price');

            const totalPrice = document.createElement('div');
            totalPrice.className = 'newTotalPrice';
            totalPrice.id = 'newTotalPrice';
            totalPrice.textContent = 'Total: ';
            const totalPriceSpan = document.createElement('span');
            totalPriceSpan.id = 'newPriceSpan';
            codePrice = (10 - count) / 10;
            totalPriceSpan.textContent = `€${Math.round(PriceNumber * codePrice)}.00`;
            totalPrice.append(totalPriceSpan);
            priceTotal.after(totalPrice);

            if (count > 1) {
              totalPrice.style.display = 'none';
              for (let i = 0; i < newPrice.length; i++) {
                newPrice[i].innerHTML = `€${Math.round(PriceNumber * codePrice)}.00`;
              }
            }

            const appleCodes = document.createElement('div');
            appleCodes.className = 'appl-codes';
            const h3 = document.createElement('h3');
            h3.textContent = 'Applied codes';
            appleCodes.append(h3);

            const appliedPromo = document.createElement('div');
            appliedPromo.className = 'applied-promo';
            appliedPromo.textContent =
              search.value.toLocaleUpperCase() === 'RS' ? 'Rolling Scopes School - 10% ' : 'EPAM Systems - 10% - ';
            const span = document.createElement('span');
            span.textContent = 'DROP';
            appliedPromo.append(span);
            appleCodes.append(appliedPromo);

            promoCode?.before(appleCodes);

            span.addEventListener('click', (e) => {
              count--;

              const newPrice = document.querySelectorAll('.newTotalPrice span');
              codePrice = (10 - count) / 10;
              for (let i = 0; i < newPrice.length; i++) {
                newPrice[i].innerHTML = `€${Math.round(PriceNumber * codePrice)}.00`;
              }
              if (count < 1) {
                priceTotal.classList.remove('old-price');
                totalPrice.remove();
                if (count === 0) {
                  const newPrice = document.querySelectorAll('.newTotalPrice');
                  for (let i = 0; i < newPrice.length; i++) {
                    newPrice[i].remove();
                  }
                }
              }

              (e.target as Element).closest('.appl-codes')?.remove();
            });
          }
        });
      }
    });
  }

  render() {
    // const { getIsInCart, setIsInCart } = isCart;

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
      totalCount.className = 'count-total';
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
      const form = document.createElement('form');
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = 'Enter promo code';
      form.append(input);
      promoCode.append(form);
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
        itemIndex.textContent = `${i + 1}`;
        cartItem.append(itemIndex);

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        itemInfo.addEventListener('click', () => {
          let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
          window.location.hash = `#product-details/${CartPage.Products[idIndex]}`;
        });

        const itemImg = document.createElement('img');
        itemImg.src = prodData.products[CartPage.Products[i] - 1].thumbnail;
        itemInfo.append(itemImg);
        const itemDetailP = document.createElement('div');
        itemDetailP.className = 'item-detail-p';
        itemInfo.append(itemDetailP);

        const productTitle = document.createElement('div');
        productTitle.className = 'product-title';
        const h3 = document.createElement('h3');
        h3.textContent = prodData.products[CartPage.Products[i] - 1].title;
        productTitle.append(h3);
        itemDetailP.append(productTitle);

        const productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.textContent = ` ${prodData.products[CartPage.Products[i] - 1].description} `;
        itemDetailP.append(productDescription);

        const productOther = document.createElement('div');
        productOther.className = 'product-other';
        const div1 = document.createElement('div');
        div1.textContent = `Rating: ${prodData.products[CartPage.Products[i] - 1].rating} `;
        productOther.append(div1);
        const div2 = document.createElement('div');
        div2.textContent = `Discount: ${prodData.products[CartPage.Products[i] - 1].discountPercentage}%`;
        productOther.append(div2);

        itemDetailP.append(productOther);
        cartItem.append(itemInfo);

        const numberControl = document.createElement('div');
        numberControl.className = 'number-control';

        const stockControl = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.textContent = `Stock: ${prodData.products[CartPage.Products[i] - 1].stock} `;
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

            const countCart = document.querySelector('.total_content') as HTMLElement;
            const CartTotal = document.querySelector('.total-price span') as HTMLElement;
            let count = Number(countCart.textContent);
            countCart.textContent = `${++count}`;
            totalCountSpan.textContent = countCart.textContent;
            localStorage.setItem('count', JSON.stringify(countCart.textContent));
            localStorage.setItem('price', JSON.stringify(totalCountSpan.textContent));

            let CartPrice = CartTotal.innerHTML.slice(1);

            CartTotal.textContent = `€${+CartPrice + prodData.products[CartPage.Products[idIndex] - 1].price}.00`;
            totalPriceSpan.textContent = CartTotal.textContent;

            localStorage.setItem('count', JSON.stringify(countCart.textContent));
            localStorage.setItem('price', JSON.stringify(CartTotal.textContent));

            const newPrice = document.querySelectorAll('.newTotalPrice span');
            let codePrice = (10 - newPrice.length) / 10;
            for (let i = 0; i < newPrice.length; i++) {
              newPrice[i].innerHTML = `€${Math.round(+totalPriceSpan.textContent.slice(1) * codePrice)}.00`;
            }

            isCart[CartPage.Products[idIndex]].sumPrice += prodData.products[CartPage.Products[idIndex] - 1].price;
          }
          localStorage.setItem('isCart', JSON.stringify(isCart));
        });

        const spanPrice = document.createElement('span');
        spanPrice.textContent = ` ${isCart[CartPage.Products[i]]?.count} `;
        incDecControl.append(spanPrice);

        const btn2 = document.createElement('button');
        btn2.textContent = '-';
        incDecControl.append(btn2);
        btn2.addEventListener('click', (e: Event) => {
          let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
          if (isCart[CartPage.Products[idIndex]]?.count !== undefined) {
            isCart[CartPage.Products[idIndex]].count -= 1;

            const countCart = document.querySelector('.total_content') as HTMLElement;
            const CartTotal = document.querySelector('.total-price span') as HTMLElement;
            let count = Number(countCart.textContent);
            countCart.textContent = `${--count}`;
            totalCountSpan.textContent = countCart.textContent;

            let CartPrice = CartTotal.innerHTML.slice(1);
            CartTotal.textContent = `€${+CartPrice - prodData.products[CartPage.Products[idIndex] - 1].price}.00`;
            totalPriceSpan.textContent = CartTotal.textContent;

            localStorage.setItem('count', JSON.stringify(countCart.textContent));
            localStorage.setItem('price', JSON.stringify(CartTotal.textContent));

            const newPrice = document.querySelectorAll('.newTotalPrice span');
            let codePrice = (10 - newPrice.length) / 10;
            for (let i = 0; i < newPrice.length; i++) {
              newPrice[i].innerHTML = `€${Math.round(+totalPriceSpan.textContent.slice(1) * codePrice)}.00`;
            }

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
            localStorage.setItem('CartPage.Products', JSON.stringify(CartPage.Products));

            ((e.target as Element).closest('.cart-item') as HTMLElement).remove();
            if (document.querySelector('.cart-item') === null) {
              document.querySelector('.products-in-cart')?.classList.remove('products-in-cart');
              (document.querySelector('.total-cart') as HTMLElement).remove();
              const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
              title.className = 'cart-title';
              this.container.append(title);
            }
          }
          spanPrice.textContent = ` ${isCart[CartPage.Products[idIndex]]?.count} `;
          localStorage.setItem('isCart', JSON.stringify(isCart));
        });

        numberControl.append(incDecControl);

        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.textContent = `€${prodData.products[CartPage.Products[i] - 1].price}`;
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
