import Page from "../../core/templates/page";
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

  addEventsModal () {
    const productItem = document.querySelectorAll('.product-item');

    productItem.forEach((item) => {
      item.addEventListener("click", (e: Event) => {
        const id = ((e.target as Element).closest('.product-item') as HTMLElement).id
        window.location.hash = `#product-details/${id}`;
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