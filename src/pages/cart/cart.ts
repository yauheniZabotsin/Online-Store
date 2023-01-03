import Page from "../../core/templates/page";
import "../cart/cart.css";
import prodData from "../../components/data/data";

class CartPage extends Page {
  static TextObject = {
    MainTitle: "Cart is Empty"
  };

  public static Products: number[] = [];

  constructor(id: string) {
    super(id);
  }

  render() {
    console.log("id",CartPage.Products[0])
    console.log("products[0]",prodData.products[0].id)
    if(CartPage.Products.length > 0){
      const cartWrapper = document.createElement("div");
      cartWrapper.className = "cart-wrapper";
      this.container.append(cartWrapper);

      const productsInCart = document.createElement("div");
      productsInCart.className = "products-in-cart";
      cartWrapper.append(productsInCart);

      const prodItems = document.createElement("div");
      prodItems.className = "prod-items";
      productsInCart.append(prodItems);

      for(let i = 0; i < CartPage.Products.length; i++){
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        prodItems.append(cartItem);

        const itemIndex = document.createElement("div");
        itemIndex.className = "item-i";
        itemIndex.textContent = `${i+1}`; // индекс выборного продукта массива
        cartItem.append(itemIndex);

        const itemInfo = document.createElement("div");
        itemInfo.className = "item-info";
        const itemImg = document.createElement("img");
        itemImg.src = "https://i.dummyjson.com/data/products/1/thumbnail.jpg"; // надо вставить 
        itemInfo.append(itemImg);
        const itemDetailP = document.createElement("div");
        itemDetailP.className = "item-detail-p"
        itemInfo.append(itemDetailP);

        const productTitle = document.createElement("div");
        productTitle.className = "product-title";
        const h3 = document.createElement("h3");
        h3.textContent = `iPhone 9`; //надо вставить 
        productTitle.append(h3)
        itemDetailP.append(productTitle);

        const productDescription = document.createElement("div");
        productDescription.className = "product-description"
        productDescription.textContent = ` An apple mobile which is nothing like apple `
        itemDetailP.append(productDescription);

        const productOther = document.createElement("div");
        productOther.className = "product-other"
        const div1 = document.createElement("div");
        div1.textContent = `Rating: 4.69` //надо вставить 
        productOther.append(div1);
        const div2 = document.createElement("div");
        div2.textContent = `Discount: 12.96%` //надо вставить 
        productOther.append(div2);

        itemDetailP.append(productOther);
        cartItem.append(itemInfo);

        const numberControl = document.createElement("div");
        numberControl.className = "number-control";

        const stockControl = document.createElement("div");
        stockControl.className = "stock-control";
        stockControl.textContent = ` Stock: 94 ` //надо вставить 
        numberControl.append(stockControl);

        const incDecControl = document.createElement("div");
        incDecControl.className = "incDec-control";
        const btn1 = document.createElement("button");
        btn1.textContent = "+";
        incDecControl.append(btn1);

        const spanPrice = document.createElement("span");
        spanPrice.textContent = ` 1 `; //TODO
        incDecControl.append(spanPrice)

        const btn2 = document.createElement("button");
        btn2.textContent = "-";
        incDecControl.append(btn2);

        numberControl.append(incDecControl);

        const amountControl = document.createElement("div");
        amountControl.className = "amount-control";
        amountControl.textContent = ` €549.00 `//надо вставить 
        numberControl.append(amountControl);

        cartItem.append(numberControl);
      }

    }else{
      const title = this.createHeaderTitle(CartPage.TextObject.MainTitle);
      title.className = "cart-title";
      this.container.append(title);
    } 

    return this.container;
  }
}

export default CartPage;