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

  render() {
    const { getIsInCart, setIsInCart } = isCart;
    console.log('CartPage.Products', CartPage.Products);

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

        const countCart = document.querySelector('.total_content') as HTMLElement;

        btn1.addEventListener('click', () => {
          isCart[CartPage.Products[i]].count += 1;
          spanPrice.textContent = ` ${isCart[CartPage.Products[i]]?.count} `;

          let count = Number(countCart.textContent);
          countCart.textContent = `${++count}`;
        });

        const spanPrice = document.createElement('span');
        spanPrice.textContent = ` ${isCart[CartPage.Products[i]]?.count} `; //TODO
        incDecControl.append(spanPrice);

        const btn2 = document.createElement('button');
        btn2.textContent = '-';
        incDecControl.append(btn2);
        btn2.addEventListener('click', (e: Event) => {
          let count = Number(countCart.textContent);
          countCart.textContent = `${--count}`;

          if (isCart[CartPage.Products[i]]?.count !== undefined) isCart[CartPage.Products[i]].count -= 1;
          if (isCart[CartPage.Products[i]]?.count <= 0 || isCart[CartPage.Products[i]]?.count === undefined) {
            // delete isCart[CartPage.Products[i]];
            console.log('id', CartPage.Products[i]);
            console.log('index', i);
            console.log('CartPage.Products До', CartPage.Products);
            let idIndex = CartPage.Products[i] ? i : CartPage.Products.length - 1;
            setIsInCart(String(CartPage.Products[idIndex]), false);
            CartPage.Products = Object?.entries(isCart)
              .filter((item: any) => item[1].isInCart === true)
              .map((item) => +item[0]);
            console.log('CartPage.Products После', CartPage.Products);
            ((e.target as Element).closest('.cart-item') as HTMLElement).remove();
            if (document.querySelector('.cart-item') === null) {
              console.log();
              document.querySelector('.products-in-cart')?.classList.remove('products-in-cart');
              const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
              title.className = 'cart-title';
              this.container.append(title);
            }
          }

          if (isCart[CartPage.Products[i]]?.count !== undefined) {
            spanPrice.textContent = ` ${isCart[CartPage.Products[i]].count} `;
          }
        });

        numberControl.append(incDecControl);

        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.textContent = ` €${prodData.products[CartPage.Products[i] - 1].price} `; //надо вставить
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
