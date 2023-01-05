export const enum filtersProd {
filtersProd = `<div class="filters">
  <div class="reset-total">
      <button class="btn">Reset Filters</button><button class="btn">Copy Link</button>
  </div>
  <app-filter-select-list filtername="category">
      <div class="category">
          <h3 class="filter-title">Category</h3>
          <div class="filter-list categories">

          </div>
      </div></app-filter-select-list
  >
  <app-filter-select-list filtername="brand">
      <div class="category">
          <h3 class="filter-title">Brand</h3>
          <div class="filter-list brands">
              
          </div>
      </div></app-filter-select-list
  >
  <div class="category">
      <h3 class="filter-title">Price</h3>
      <div class="range_container">
        <div class="sliders_control">
          <input id="fromSlider" type="range" value="0" min="0" max="100"/>
          <input id="toSlider" type="range" value="100" min="0" max="100"/>
        </div>
      <div class="form_control">
        <div class="form_control_container">
            <div class="form_control_container__time">€ <input class="form_control_container__time__input" type="number" id="fromInput" value="0" min="0" max="100"/></div>
            
        </div>
        <div class="form_control_container">
            <div class="form_control_container__time">€ <input class="form_control_container__time__input" type="number" id="toInput" value="100" min="0" max="100"/></div>
            
        </div>
      </div>
</div>
  </div>
  <div class="category">
      <h3 class="filter-title">Stock</h3>
      <div class="out-data">
      <input class="form_control_container__time__input" type="number" id="fromInput1" value="0" min="0" max="100"/>
          <!---->
          ⟷
          <input class="form_control_container__time__input" type="number" id="toInput1" value="100" min="0" max="100"/>
          <!---->
      </div>
      <div class="sliders_control">
          <input id="fromSlider1" type="range" value="0" min="0" max="100"/>
          <input id="toSlider1" type="range" value="100" min="0" max="100"/>
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
      <div class="stat">Found: 100</div>
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
          <div class="big-vm active-mode">
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
  <div class="products-items">

  </div>
  <div class="not-found"></div>
</div>
`,
}