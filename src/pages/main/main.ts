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
    // const title = this.createHeaderTitle(MainPages.TextObject.MainTitle);
    // this.container.append(title);
    const filter = document.createElement("div");
    const filterMarkup = `
    <div class="app-storage-page">
                <div class="filters">
                    <div class="reset-total">
                        <button class="btn">Reset Filters</button><button class="btn">Copy Link</button>
                    </div>
                    <div class="category">
                        <h3 class="filter-title">Category</h3>
                        <div class="filter-list">
                            <div class="checkbox-line item-active">
                                <input type="checkbox" id="smartphones" /><label for="smartphones">smartphones</label
                                ><span>(5/5)</span>
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <h3 class="filter-title">Brand</h3>
                        <div class="filter-list">
                            <div class="checkbox-line item-active">
                                <input type="checkbox" id="smartphones" /><label for="smartphones">Apple</label
                                ><span>(3/3)</span>
                            </div>
                        </div>
                    </div>
                    <div class="category">
                        <h3 class="filter-title">Price</h3>
                        <div class="out-data">
                            <div class="from-data">€10.00</div>
                            <!---->
                            ⟷
                            <div class="to-data">€1749.00</div>
                            <!---->
                        </div>
                        <div class="multi-range">
                            <input type="range" min="0" max="48" class="ng-untouched ng-pristine ng-valid" /><input
                                type="range"
                                min="0"
                                max="48"
                                class="ng-untouched ng-pristine ng-valid"
                            />
                        </div>
                    </div>
                    <div class="category">
                        <h3 class="filter-title">Stock</h3>
                        <div class="out-data">
                            <div class="from-data">2</div>
                            <!---->
                            ⟷
                            <div class="to-data">150</div>
                            <!---->
                        </div>
                        <div class="multi-range">
                            <input type="range" min="0" max="48" class="ng-untouched ng-pristine ng-valid" /><input
                                type="range"
                                min="0"
                                max="48"
                                class="ng-untouched ng-pristine ng-valid"
                            />
                        </div>
                    </div>
                </div>
                <div class="products">
                    <div class="sort-products">
                        <div class="sort-bar">
                            <select>
                                <option value="sort-title" disabled selected class="sort-name">Sort options:</option>
                                <option value="price-down">Price (High to Low)</option>
                                <option value="price-up">Price (Low to High)</option>
                                <option value="rating-down">Rating (High to Low)</option>
                                <option value="rating-up">Rating (Low to High)</option>
                            </select>
                        </div>
                        <div class="stat">Found: 0</div>
                        <div class="search-bar">
                            <input type="search" placeholder="Search product" />
                        </div>
                        <div class="view-mode">
                            <div class="smaill-vm">
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                            </div>
                            <div class="big-vm">
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                                <div>.</div>
                            </div>
                        </div>
                    </div>
                    <div class="products-items"></div>
                    <div class="not-found"></div>
                </div>
            </div>
    `
    filter.innerHTML = filterMarkup;
    this.container.append(filter);
    return this.container;
  }
}

export default MainPages;