import Page from '../../core/templates/page';
import '../main/main.css';
import prodData from '../../components/data/products';
import { filterPrice, filterStock, searchProducts, sortProducts } from './functions';

import { isCart } from '../../components/app/app';
import CartPage from '../cart/cart';

class MainPages extends Page {
  static TextObject = {
    MainTitle: 'Main Pages',
  };

  constructor(id: string) {
    super(id);
  }

  addLocalStorage() {
    const Price = document.querySelector('.total-price span') as HTMLElement;
    const totalCount = document.querySelector('.total_content') as HTMLElement;

    let localPrice = localStorage.getItem('price');

    let localCount = localStorage.getItem('count') || '';

    // if (localPrice) {
    //   Price.textContent = JSON.parse(localPrice);
    //   totalCount.textContent = JSON.parse(localCount);
    // }
  }

  linkToCart() {
    const cart = document.querySelector('.cart') as HTMLElement;

    cart.addEventListener('click', (e: Event) => {
      window.location.hash = 'cart';
    });
  }

  addClassInCart() {
    const item = document.querySelectorAll('.item');
    const btnAdd = document.querySelectorAll('.add-to-cart');

    CartPage.Products.forEach((id: number) => {
      item[id - 1].classList.add('in-cart');
      btnAdd[id - 1].textContent = 'DROP FROM CART';
    });
  }

  addEventBtn() {
    const { getIsInCart, setIsInCart } = isCart;

    const btnAdd = document.querySelectorAll('.add-to-cart');

    const countCart = document.querySelector('.total_content') as HTMLElement;
    let count = Number(countCart.textContent);

    btnAdd.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        const CartTotal = document.querySelector('.total-price span') as HTMLElement;
        let CartPrice = CartTotal.innerHTML.slice(1);

        const idIndex = +((e.target as Element).closest('.product-item') as HTMLElement).id - 1;
        const id = ((e.target as Element).closest('.product-item') as HTMLElement).id;
        if (((e.target as Element).closest('.item') as HTMLElement).classList.contains('in-cart')) {
          ((e.target as Element).closest('.item') as HTMLElement).classList.remove('in-cart');
          item.textContent = 'ADD TO CART';
          countCart.textContent = `${--count}`;
          CartTotal.textContent = `€${+CartPrice - prodData.products[idIndex].price}.00`;

          setIsInCart(String(id), false);
          isCart[id].sumPrice -= prodData.products[idIndex].price;

          localStorage.setItem('count', JSON.stringify(countCart.textContent));
          localStorage.setItem('price', JSON.stringify(CartTotal.textContent));
        } else {
          ((e.target as Element).closest('.item') as HTMLElement).classList.add('in-cart');
          item.textContent = 'DROP FROM CART';
          countCart.textContent = `${++count}`;
          CartTotal.textContent = `€${+CartPrice + prodData.products[idIndex].price}.00`;

          setIsInCart(String(id), true);
          isCart[id].sumPrice += prodData.products[idIndex].price;

          localStorage.setItem('count', JSON.stringify(countCart.textContent));
          localStorage.setItem('price', JSON.stringify(CartTotal.textContent));
        }

        CartPage.Products = Object?.entries(isCart)
          .filter((item: any) => item[1].isInCart === true)
          .map((item) => +item[0]);
        localStorage.setItem('CartPage.Products', JSON.stringify(CartPage.Products));
      });
    });
  }

  addEventsModal() {
    const productItem = document.querySelectorAll('.product-item');

    productItem.forEach((item) => {
      item.addEventListener('click', (e: Event) => {
        if (!(e.target as Element).classList.contains('add-to-cart')) {
          const id = ((e.target as Element).closest('.product-item') as HTMLElement).id;
          window.location.hash = `#product-details/${id}`;
        }
      });
    });
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
    const priceSlider: HTMLElement = document.createElement('div');
    const priceSliderTitle: HTMLElement = document.createElement('h3');
    const priceSliderData: HTMLElement = document.createElement('div');
    const priceSliderFromData: HTMLElement = document.createElement('div');
    const priceSliderToData: HTMLElement = document.createElement('div');
    const priceSliderRange: HTMLElement = document.createElement('div');
    const priceSliderFromInput: HTMLElement = document.createElement('input');
    const priceSliderToInput: HTMLElement = document.createElement('input');
    const stockSlider: HTMLElement = document.createElement('div');
    const stockSliderTitle: HTMLElement = document.createElement('h3');
    const stockSliderData: HTMLElement = document.createElement('div');
    const stockSliderFromData: HTMLElement = document.createElement('div');
    const stockSliderToData: HTMLElement = document.createElement('div');
    const stockSliderRange: HTMLElement = document.createElement('div');
    const stockSliderFromInput: HTMLElement = document.createElement('input');
    const stockSliderToInput: HTMLElement = document.createElement('input');

    const productSort: HTMLElement = document.createElement('div');
    const sortBar: HTMLElement = document.createElement('div');
    const sortSelect: HTMLSelectElement = document.createElement('select');
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

    priceSlider.className = 'category';
    priceSliderTitle.className = 'filter-title';
    priceSliderTitle.innerText = 'Price';
    priceSliderData.className = 'out-data';
    priceSliderFromData.className = 'from-data';
    priceSliderFromData.textContent = '€10';
    priceSliderToData.className = 'to-data';
    priceSliderToData.textContent = '€1749';
    priceSliderRange.className = 'multi-range';
    priceSliderFromInput.setAttribute('type', 'range');
    priceSliderFromInput.setAttribute('min', '10');
    priceSliderFromInput.setAttribute('max', '1749');
    priceSliderFromInput.setAttribute('value', '10');
    priceSliderFromInput.onchange = function () {
      filterPrice();
    };
    priceSliderToInput.setAttribute('type', 'range');
    priceSliderToInput.setAttribute('min', '10');
    priceSliderToInput.setAttribute('max', '1749');
    priceSliderToInput.setAttribute('value', '1749');
    priceSliderToInput.onchange = function () {
      filterPrice();
    };
    priceSliderRange.append(priceSliderFromInput);
    priceSliderRange.append(priceSliderToInput);
    priceSliderData.append(priceSliderFromData);
    priceSliderData.append(' ⟷ ');
    priceSliderData.append(priceSliderToData);
    priceSlider.append(priceSliderTitle);
    priceSlider.append(priceSliderData);
    priceSlider.append(priceSliderRange);

    stockSlider.className = 'category';
    stockSliderTitle.className = 'filter-title';
    stockSliderTitle.innerText = 'Stock';
    stockSliderData.className = 'out-data';
    stockSliderFromData.className = 'from-data2';
    stockSliderFromData.textContent = '2';
    stockSliderToData.className = 'to-data2';
    stockSliderToData.textContent = '150';
    stockSliderRange.className = 'multi-range2';
    stockSliderFromInput.setAttribute('type', 'range');
    stockSliderFromInput.setAttribute('min', '0');
    stockSliderFromInput.setAttribute('max', '75');
    stockSliderFromInput.setAttribute('value', '0');
    stockSliderFromInput.onchange = function () {
      filterStock();
    };
    stockSliderToInput.setAttribute('type', 'range');
    stockSliderToInput.setAttribute('min', '0');
    stockSliderToInput.setAttribute('max', '150');
    stockSliderToInput.setAttribute('value', '150');
    stockSliderToInput.onchange = function () {
      filterStock();
    };
    stockSliderRange.append(stockSliderFromInput);
    stockSliderRange.append(stockSliderToInput);
    stockSliderData.append(stockSliderFromData);
    stockSliderData.append(' ⟷ ');
    stockSliderData.append(stockSliderToData);
    stockSlider.append(stockSliderTitle);
    stockSlider.append(stockSliderData);
    stockSlider.append(stockSliderRange);

    sortSelect.setAttribute('id', 'option-selector');
    productSort.className = 'sort-products';
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
    stat.innerText = `Found: 100`;
    stat.className = 'stat';
    searchBar.className = 'search-bar';
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search product');
    searchInput.oninput = function () {
      searchProducts();
    };
    viewMode.className = 'view-mode';
    smallVM.className = 'smaill-vm';
    bigVM.className = 'big-vm';
    bigVM.classList.add('active-mode');
    productsItems.className = 'products-items';
    notFound.className = 'not-found';
    notFound.innerText = 'No products found 😏';
    sortSelect.append(option1);
    sortSelect.append(option2);
    sortSelect.append(option3);
    sortSelect.append(option4);
    sortSelect.append(option5);
    sortBar.append(sortSelect);
    searchBar.append(searchInput);
    viewMode.append(smallVM);
    viewMode.append(bigVM);
    productSort.append(sortBar);
    productSort.append(stat);
    productSort.append(searchBar);
    productSort.append(viewMode);
    sortSelect.onchange = function () {
      sortProducts();
    };

    mainPage.className = 'app-storage-page';
    filters.className = 'filters';
    products.className = 'products';
    filters.append(resetDiv);
    filters.append(category);
    filters.append(brand);
    filters.append(priceSlider);
    filters.append(stockSlider);
    products.append(productSort);
    products.append(productsItems);
    products.append(notFound);

    mainPage.append(filters);
    mainPage.append(products);
    this.container.append(mainPage);
    return this.container;
  }
}

export default MainPages;
