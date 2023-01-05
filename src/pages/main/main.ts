import Page from "../../core/templates/page";
import { DataViewer } from "../../components/app/dataviewer";
import { controlFromInput, controlFromSlider, controlToInput, controlToSlider, fillSlider, setToggleAccessible } from "./functions";
import prodData from "../../components/data/products";

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
              console.log("clickID: "+id);
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

        if (fromSlider && toSlider && fromInput && toInput) {
            fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
            setToggleAccessible(toSlider);
            fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
            toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
            fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
            toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
        }

        if (fromSlider1 && toSlider1 && fromInput1 && toInput1) {
            fillSlider(fromSlider1, toSlider1, '#C6C6C6', '#25daa5', toSlider1);
            setToggleAccessible(toSlider1);
            fromSlider1.oninput = () => controlFromSlider(fromSlider1, toSlider1, fromInput1);
            toSlider1.oninput = () => controlToSlider(fromSlider1, toSlider1, toInput1);
            fromInput1.oninput = () => controlFromInput(fromSlider1, fromInput1, toInput1, toSlider1);
            toInput1.oninput = () => controlToInput(toSlider1, fromInput1, toInput1, toSlider1);
        }
  }

    render(): HTMLElement {
        const mainPage: HTMLElement = document.createElement('div');
        const filters: HTMLElement = document.createElement('div');
        const products: HTMLElement = document.createElement('div');
        const resetDiv: HTMLElement = document.createElement('div');
        const resetBtn: HTMLElement = document.createElement('button');
        const copyBtn: HTMLElement = document.createElement('button');
        const category: HTMLElement = document.createElement('div');
        const catTitle: HTMLElement = document.createElement('h3');
        const catList: HTMLElement = document.createElement('div');
        const brand: HTMLElement = document.createElement('div');
        const brandTitle: HTMLElement = document.createElement('h3');
        const brandList: HTMLElement = document.createElement('div');
        const price: HTMLElement = document.createElement('div');
        const priceTitle: HTMLElement = document.createElement('h3'); 
        const priceCont: HTMLElement = document.createElement('div');
        const slidersControl: HTMLElement = document.createElement('div');
        const fromSlider: HTMLElement = document.createElement('input');
        const toSlider: HTMLElement = document.createElement('input');
        const formControl: HTMLElement = document.createElement('div');
        const formControlCont1: HTMLElement = document.createElement('div');
        const formControlCont2: HTMLElement = document.createElement('div');
        const formControlTime1: HTMLElement = document.createElement('div');
        const formControlTime2: HTMLElement = document.createElement('div');
        const timeInput1: HTMLElement = document.createElement('input');
        const timeInput2: HTMLElement = document.createElement('input');
        const stock: HTMLElement = document.createElement('div');
        const stockTitle: HTMLElement = document.createElement('h3');
        const stockCont: HTMLElement = document.createElement('div');
        const slidersControl1: HTMLElement = document.createElement('div');
        const timeInput3: HTMLElement = document.createElement('input');
        const timeInput4: HTMLElement = document.createElement('input');
        const fromSlider1: HTMLElement = document.createElement('input');
        const toSlider1: HTMLElement = document.createElement('input');

        const sortProducts: HTMLElement = document.createElement('div');
        const sortBar: HTMLElement = document.createElement('div');
        const sortSelect: HTMLElement = document.createElement('select');
        const option1: HTMLElement = document.createElement('option');
        const option2: HTMLElement = document.createElement('option');
        const option3: HTMLElement = document.createElement('option');
        const option4: HTMLElement = document.createElement('option');
        const option5: HTMLElement = document.createElement('option');
        const stat: HTMLElement = document.createElement('div');
        const searchBar: HTMLElement = document.createElement('div');
        const searchInput: HTMLElement = document.createElement('input');
        const viewMode: HTMLElement = document.createElement('div');
        const smallVM: HTMLElement = document.createElement('div');
        const bigVM: HTMLElement = document.createElement('div');
        const productsItems: HTMLElement = document.createElement('div');
        const notFound: HTMLElement = document.createElement('div');

        resetDiv.className = 'reset-total';
        resetBtn.innerText = 'Reset Filters';
        copyBtn.innerText = 'Copy Link';
        resetBtn.className = 'btn';
        copyBtn.className = 'btn';
        resetDiv.append(resetBtn);
        resetDiv.append(copyBtn);

        category.className = 'category';
        catTitle.className = 'category-title';
        catList.className = 'filter-list';
        catList.classList.add('categories');
        category.append(catTitle);
        category.append(catList);

        brand.className = 'brand';
        brandTitle.className = 'brand-title';
        brandList.className = 'filter-list';
        brandList.classList.add('brands');
        brand.append(brandTitle);
        brand.append(brandList);

        price.className = 'category';
        priceTitle.className = 'filter-title';
        priceTitle.innerText = 'Price';
        priceCont.className = 'range_container';
        slidersControl.className = 'sliders_control';
        fromSlider.setAttribute('id', 'fromSlider');
        fromSlider.setAttribute('type', 'range');
        fromSlider.setAttribute('value', '0');
        fromSlider.setAttribute('min', '0');
        fromSlider.setAttribute('max', '100');
        toSlider.setAttribute('id', 'toSlider');
        toSlider.setAttribute('type', 'range');
        toSlider.setAttribute('value', '100');
        toSlider.setAttribute('min', '0');
        toSlider.setAttribute('max', '100');
        formControl.className = 'form_control';
        formControlCont1.className = 'form_control_container';
        formControlCont2.className = 'form_control_container';
        formControlTime1.className = 'form_control_container__time';
        formControlTime2.className = 'form_control_container__time';
        formControlTime1.innerText = '€';
        formControlTime2.innerText = '€';
        timeInput1.className = 'form_control_container__time__input';
        timeInput1.setAttribute('type', 'number');
        timeInput1.setAttribute('id', 'fromInput');
        timeInput1.setAttribute('value', '0');
        timeInput1.setAttribute('min', '0');
        timeInput1.setAttribute('max', '100');
        timeInput2.className = 'form_control_container__time__input';
        timeInput2.setAttribute('type', 'number');
        timeInput2.setAttribute('id', 'toInput');
        timeInput2.setAttribute('value', '100');
        timeInput2.setAttribute('min', '0');
        timeInput2.setAttribute('max', '100');
        formControlTime1.append(timeInput1);
        formControlTime2.append(timeInput2);
        formControlCont1.append(formControlTime1);
        formControlCont2.append(formControlTime2);
        formControl.append(formControlCont1);
        formControl.append(formControlCont2);
        slidersControl.append(fromSlider);
        slidersControl.append(toSlider);
        priceCont.append(slidersControl);
        price.append(priceTitle);
        price.append(priceCont);
        price.append(formControl);

        stock.className = 'category';
        stockTitle.className = 'filter-title'
        stockTitle.innerText = 'Stock';
        stockCont.className = 'out-data';
        slidersControl1.className = 'sliders_control';
        timeInput3.className = 'form_control_container__time__input';
        timeInput3.setAttribute('type', 'number');
        timeInput3.setAttribute('id', 'fromInput1');
        timeInput3.setAttribute('value', '0');
        timeInput3.setAttribute('min', '0');
        timeInput3.setAttribute('max', '100');
        timeInput4.className = 'form_control_container__time__input';
        timeInput4.setAttribute('type', 'number');
        timeInput4.setAttribute('id', 'toInput1');
        timeInput4.setAttribute('value', '100');
        timeInput4.setAttribute('min', '0');
        timeInput4.setAttribute('max', '100');
        fromSlider1.setAttribute('id', 'fromSlider1');
        fromSlider1.setAttribute('type', 'range');
        fromSlider1.setAttribute('value', '0');
        fromSlider1.setAttribute('min', '0');
        fromSlider1.setAttribute('max', '100');
        toSlider1.setAttribute('id', 'toSlider1');
        toSlider1.setAttribute('type', 'range');
        toSlider1.setAttribute('value', '100');
        toSlider1.setAttribute('min', '0');
        toSlider1.setAttribute('max', '100');
        slidersControl1.append(fromSlider1);
        slidersControl1.append(toSlider1);
        stockCont.append(timeInput3);
        stockCont.append('⟷');
        stockCont.append(timeInput4);
        stock.append(stockTitle);
        stock.append(stockCont);
        stock.append(slidersControl1);

        sortProducts.className = 'sort-products';
        sortBar.className = 'sort-bar';
        option1.innerText = 'Sort options:';
        option1.className = 'sort-name';
        option1.setAttribute('value', 'sort-title');
        option1.setAttribute('disabled', '');
        option1.setAttribute('selected', 'selected');
        option2.innerText = 'Price (High to Low)';
        option2.setAttribute('value', 'price-down');
        option3.innerText = 'Price (Low to High)';
        option3.setAttribute('value', 'price-up');
        option4.innerText = 'Rating (High to Low)';
        option4.setAttribute('value', 'rating-down');
        option5.innerText = 'Rating (Low to High)';
        option5.setAttribute('value', 'rating-up');
        stat.innerText = 'Found: 100';
        stat.className = 'stat';
        searchBar.className = 'search-bar';
        searchInput.setAttribute('type', 'search');
        searchInput.setAttribute('placeholder', 'Search product');
        viewMode.className = 'view-mode';
        smallVM.className = 'smaill-vm';
        bigVM.className = 'big-vm';
        bigVM.classList.add('active-mode');
        productsItems.className = 'products-items';
        notFound.className = 'not-found';
        sortSelect.append(option1);
        sortSelect.append(option2);
        sortSelect.append(option3);
        sortSelect.append(option4);
        sortSelect.append(option5);
        sortBar.append(sortSelect);
        searchBar.append(searchInput);
        viewMode.append(smallVM);
        viewMode.append(bigVM);
        sortProducts.append(sortBar);
        sortProducts.append(stat);
        sortProducts.append(searchBar);
        sortProducts.append(viewMode);

        mainPage.className = 'app-storage-page';
        filters.className = 'filters';
        products.className = 'products';
        filters.append(resetDiv);
        filters.append(category);
        filters.append(brand);
        filters.append(price);
        filters.append(stock);
        products.append(sortProducts);
        products.append(productsItems);
        products.append(notFound);

        mainPage.append(filters);
        mainPage.append(products);
        this.container.append(mainPage);
        return this.container;
    }
}

export default MainPages;