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

  addEvents () {
    const fromSlider = document.querySelector<HTMLInputElement>('#fromSlider');
    const toSlider = document.querySelector<HTMLInputElement>('#toSlider');
    const fromInput = document.querySelector<HTMLInputElement>('#fromInput');
    const toInput = document.querySelector<HTMLInputElement>('#toInput');

    if(fromSlider && toSlider && fromInput && toInput) {
      fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
      setToggleAccessible(toSlider);
      fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
      toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
      fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
      toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
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