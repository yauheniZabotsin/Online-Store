import Page from "../../core/templates/page";
import { DataViewer } from "../../components/app/dataviewer";

class MainPages extends Page {
  static TextObject = {
    MainTitle: "Main Pages",
  };

  constructor(id: string) {
    super(id);
  }

  render () {
    const title = this.createHeaderTitle(MainPages.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPages;