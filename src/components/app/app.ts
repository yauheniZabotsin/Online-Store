import prodData from "../data/data";
import { DataViewer } from "./dataviewer";

class App {
    view: DataViewer;

    constructor() {
        this.view = new DataViewer();
    }

    run() {
        this.view.viewProducts(prodData);
    }
}

export default App;