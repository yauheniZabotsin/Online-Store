import Page from "../../core/templates/page";
import { DataViewer } from "../../components/app/dataviewer";
import { filtersProd } from "../../components/interfaces/main-item";

class MainPages extends Page {
  static TextObject = {
    MainTitle: "Main Pages",
  };

  constructor(id: string) {
    super(id);
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