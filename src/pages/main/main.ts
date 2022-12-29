import Page from "../../core/templates/page";
import "../main/main.css";
import prodData from "../../components/data/data";
import { DataViewer } from "../../components/app/dataviewer";
import { filtersProd } from "../../components/interfaces/main-item";
import { controlFromInput, controlFromSlider, controlToInput, controlToSlider, fillSlider, setToggleAccessible } from "./functions";

class MainPages extends Page {
  static TextObject = {
    MainTitle: "Main Pages",
  };

  constructor(id: string) {
    super(id);
  }

  addEventBtn(){
    const btnAdd = document.querySelectorAll(".btn-add");

    const countCart = document.querySelector(".total_content") as HTMLElement;
    let count = Number (countCart.textContent);

    btnAdd.forEach((item) => {
      item.addEventListener("click", (e: Event) => {
        const CartTotal = document.querySelector(".total-price span")  as HTMLElement;
        let CartPrice = CartTotal.innerHTML.slice(1); 

        const id = +((e.target as Element).closest('.product-item') as HTMLElement).id - 1;
        if(((e.target as Element).closest('.product-item') as HTMLElement).classList.contains('in-cart')){
          ((e.target as Element).closest('.product-item') as HTMLElement).classList.remove('in-cart');
          item.textContent = "ADD TO CART";
          countCart.textContent = `${--count}`;
          CartTotal.textContent = `€${+CartPrice - prodData.products[id].price}.00`;
        }else{
          ((e.target as Element).closest('.product-item') as HTMLElement).classList.add('in-cart');
          item.textContent = "DROP FROM CART";
          countCart.textContent = `${++count}`;
          CartTotal.textContent = `€${+CartPrice + prodData.products[id].price}.00`;
        }
      })
    })
  }

  addEventsModal () {
    const productItem = document.querySelectorAll('.product-item');

    productItem.forEach((item) => {
      item.addEventListener("click", (e: Event) => {
        if(!(e.target as Element).classList.contains('btn-add')){
          const id = ((e.target as Element).closest('.product-item') as HTMLElement).id
          window.location.hash = `#product-details/${id}`;
        }
      })
    })
  }

  static getId(){
    return window.location.hash.slice(1);
  }

  addEventsSlider () {
    const fromSlider = document.querySelector<HTMLInputElement>('#fromSlider');
    const toSlider = document.querySelector<HTMLInputElement>('#toSlider');
    const fromInput = document.querySelector<HTMLInputElement>('#fromInput');
    const toInput = document.querySelector<HTMLInputElement>('#toInput');

    const fromSlider1 = document.querySelector<HTMLInputElement>('#fromSlider1');
    const toSlider1 = document.querySelector<HTMLInputElement>('#toSlider1');
    const fromInput1 = document.querySelector<HTMLInputElement>('#fromInput1');
    const toInput1 = document.querySelector<HTMLInputElement>('#toInput1');

    if(fromSlider && toSlider && fromInput && toInput) {
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
      setToggleAccessible(toSlider);
      fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
      toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
      fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
      toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    }

    if(fromSlider1 && toSlider1 && fromInput1 && toInput1) {
      fillSlider(fromSlider1, toSlider1, '#C6C6C6', '#25daa5', toSlider1);
      setToggleAccessible(toSlider1);
      fromSlider1.oninput = () => controlFromSlider(fromSlider1, toSlider1, fromInput1);
      toSlider1.oninput = () => controlToSlider(fromSlider1, toSlider1, toInput1);
      fromInput1.oninput = () => controlFromInput(fromSlider1, fromInput1, toInput1, toSlider1);
      toInput1.oninput = () => controlToInput(toSlider1, fromInput1, toInput1, toSlider1);
    }
  }

  render () {
    // const title = this.createHeaderTitle(MainPages.TextObject.MainTitle);
    // this.container.append(title);
    const filter = document.createElement("div");
    filter.className = "app-storage-page";
    const filterMarkup = filtersProd.filtersProd;
    filter.innerHTML = filterMarkup;
    this.container.append(filter);
    return this.container;
  }
}

export default MainPages;