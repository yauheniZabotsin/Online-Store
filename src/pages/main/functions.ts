import { DataViewer } from "../../components/app/dataviewer";
import prodData from "../../components/data/products";
import { Data, Product } from "../../components/interfaces/interfaces";


let result: Array<Product> = [];

export function reloadProducts(data: Data['products']): void {
    const fragment = document.createDocumentFragment();
    const products = <HTMLElement>document.querySelector('.products-items');
    const itemTemplate = <HTMLTemplateElement>document.querySelector('.item-template');
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const categoriesDivs: Array<HTMLDivElement> = Array.from(document.querySelectorAll('.categories div'));
    const brandsDivs: Array<HTMLDivElement> = Array.from(document.querySelectorAll('.brands div'));
    const categoriesInputs: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.category-input'));
    const brandsInputs: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.brand-input'));
    checkCbs(categoriesInputs, categoriesDivs);
    checkCbs(brandsInputs, brandsDivs);

    if (products.childNodes.length) {
        products.innerHTML = '';
    }

    data.forEach((item: Product) => {
        const itemClone = <HTMLElement>itemTemplate.content.cloneNode(true);
        const itemDiv = <HTMLElement>itemClone.querySelector('.item');
        const itemCont = <HTMLElement>itemClone.querySelector('.product-item');
        const itemText = <HTMLElement>itemClone.querySelector('.item-text');
        const itemTitle = <HTMLElement>itemClone.querySelector('.item-title');
        const itemInfo = <HTMLElement>itemClone.querySelector('.item-info');
        const infoContent = <HTMLElement>itemClone.querySelector('.item-info-item');
        const itemButtons = <HTMLElement>itemClone.querySelector('.item-buttons');
        const itemCat = <HTMLElement>itemClone.querySelector('.item-category');
        const itemBrand = <HTMLElement>itemClone.querySelector('.item-brand');
        const itemPrice = <HTMLElement>itemClone.querySelector('.item-price');
        const itemDiscount = <HTMLElement>itemClone.querySelector('.item-discount');
        const itemRating = <HTMLElement>itemClone.querySelector('.item-rating');
        const itemStock = <HTMLElement>itemClone.querySelector('.item-stock');

        itemDiv.setAttribute('style', 'display:block');
        itemCont.setAttribute('id', item.id.toString());
        itemCont.style.background = `url(${item.thumbnail}) 0% 0% / cover`;
        itemCont.style.backgroundPosition = 'top left';
        itemCont.style.backgroundRepeat = 'cover';
        itemTitle.innerText = item.title;
        itemCat.insertAdjacentText('beforeend', item.category);
        itemBrand.insertAdjacentText('beforeend', item.brand);
        itemPrice.insertAdjacentText('beforeend', item.price.toString());
        itemDiscount.insertAdjacentText('beforeend', item.discountPercentage.toString());
        itemRating.insertAdjacentText('beforeend', item.rating.toString());
        itemStock.insertAdjacentText('beforeend', item.stock.toString());

        fragment.append(itemClone);
    });

    products.appendChild(fragment);
    sortProducts();
    getItemsAmount();
    let productsCheck = Array.from(document.querySelectorAll('.item'));
    
    if (!productsCheck.length) {
        products.style.display = 'none';
        notFound.style.display = 'block';
    } else {
        notFound.style.display = 'none';
        products.style.display = 'flex';
    }

}

export function convertArrayToNode(arr: Array<Element>) {
    const fragment = document.createDocumentFragment();
    arr.forEach((item: Element) => {
        fragment.appendChild(item.cloneNode(true));
    });
    return fragment.childNodes;
}

export function getIdOfCheckedCheckboxes(checkboxes: NodeListOf<HTMLInputElement>) {
    let classes: Array<string> = [];

    if (checkboxes && checkboxes.length > 0) {
        for (let i = 0; i < checkboxes.length; i++) {
            let cb = checkboxes[i];
            if (cb.checked) {
                classes.push(cb.getAttribute("id")!);
            }
        }
    }
    return classes;
}

export function checkCbs(inputs: Array<HTMLInputElement>, divs: Array<HTMLDivElement>) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            divs[i].classList.remove('item-not-active');
            divs[i].classList.add('item-active');
        } else {
            divs[i].classList.remove('item-active');
            divs[i].classList.add('item-not-active');
        } 
    }
    if (inputs.every(input => !input.checked)) divs.forEach((div) => {
        div.classList.remove('item-not-active');
        div.classList.add('item-active');
    })
}

export function filterCheckboxResults(filters: { categories: Array<string>, brands: Array<string>}) {
    const products: Array<Product> = prodData.products;
    const resultCat: Array<Product> = [];
    const resultBrand: Array<Product> = [];
    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    const priceInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range input'));
    const stockInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range2 input'));
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);
    let minStockVal = parseInt(stockInput[0].value);
    let maxStockVal = parseInt(stockInput[1].value);

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let category = product.category;
        let brand = product.brand;

        if (filters.categories.length > 0) {

            for (let j = 0; j < filters.categories.length; j++) {
                let filter = filters.categories[j];

                if (filter === category) {
                    resultCat.push(product);
                }
            }
        }

        if (filters.brands.length > 0) {

            for (let j = 0; j < filters.brands.length; j++) {
                let filter = filters.brands[j];

                if (filter === brand) {
                    resultBrand.push(product);
                }
            }
        }
  
        if (filters.brands.length > 0 && filters.categories.length > 0) {
            result = resultCat.filter(item => resultBrand.includes(item));
        } else if (filters.categories.length > 0 && filters.brands.length === 0) {
            result = resultCat;
        } else if ( filters.brands.length > 0 && filters.categories.length === 0) {
            result = resultBrand;
        } else if (filters.categories.length === 0 && filters.brands.length === 0) {
            result = prodData.products;
        }
    }

    if (minVal > 10 || maxVal < 1749) {
        if (minVal <= maxVal) {
            result = result.filter((item) => item.price >= minVal && item.price <= maxVal);
        } else {
            result = result.filter((item) => item.price <= minVal && item.price >= maxVal);
        }
    }
    
    if (minStockVal > 2 || maxStockVal < 150) {
        if (minStockVal <= maxStockVal) {
            result = result.filter((item) => item.stock >= minStockVal && item.stock <= maxStockVal);
        } else {
            result = result.filter((item) => item.stock <= minStockVal && item.stock >= maxStockVal);
        }
    }

    reloadProducts(result);
    if (searchInput.value) searchProducts();
}

export function filterProducts() {
    const catCheckboxes = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    const brandCheckboxes = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;

    const filters: { categories: Array<string>, brands: Array<string> } = {
        categories: getIdOfCheckedCheckboxes(catCheckboxes),
        brands: getIdOfCheckedCheckboxes(brandCheckboxes)
    }
    

    filterCheckboxResults(filters);
}

export function sortProducts() {
    const optionSelector = document.querySelector('#option-selector') as HTMLSelectElement;
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items');
    let result = [];
    
    if (optionSelector.value === 'price-down') {
        result = products.sort((a, b) => {
            let aPrice = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(6));
            let bPrice = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(6));
            if (aPrice < bPrice) return 1;
            if (aPrice > bPrice) return -1;
            return 0;
        });
        
        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }

    if (optionSelector.value === 'price-up') {
        result = products.sort((a, b) => {
            let aPrice = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(6));
            let bPrice = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(6));
            if (aPrice > bPrice) return 1;
            if (aPrice < bPrice) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }


    if (optionSelector.value === 'rating-down') {
        result = products.sort((a, b) => {
            let aRating = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(7));
            let bRating = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(7));
            if (aRating < bRating) return 1;
            if (aRating > bRating) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }
    

    if (optionSelector.value === 'rating-up') {
        result = products.sort((a, b) => {
            let aRating = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(7));
            let bRating = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(7));
            if (aRating > bRating) return 1;
            if (aRating < bRating) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }
}

export function searchProducts() {
    let products: Array<Product> = result.length ? result.slice(0) : prodData.products;
    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    let value: string = searchInput.value;
    const fromValue  = document.querySelector('.from-data') as HTMLElement;
    const toValue = document.querySelector('.to-data') as HTMLElement;
    const priceInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range input'));
    const stockInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range2 input'));
    let minVal = parseInt(priceInput[0].value);
    let maxVal = parseInt(priceInput[1].value);
    let minStockVal = parseInt(stockInput[0].value);
    let maxStockVal = parseInt(stockInput[1].value);

    if (minVal > 10 || maxVal < 1749) {
        if (minVal <= maxVal) {
            products = products.filter((item) => item.price >= minVal && item.price <= maxVal);
        } else {
            products = products.filter((item) => item.price <= minVal && item.price >= maxVal);
        }
    }

    if (minStockVal > 2 || maxStockVal < 150) {
        if (minStockVal <= maxStockVal) {
            products = products.filter((item) => item.stock >= minStockVal && item.stock <= maxStockVal);
        } else {
            products = products.filter((item) => item.stock <= minStockVal && item.stock >= maxStockVal);
        }
    }

    products = products.filter((product) => Object.values(product).some((item) => {
        return item.toString().toLowerCase().includes(value);
    }));
    
    reloadProducts(products);
}

export function filterPrice() {
    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    const rangeInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range input'));
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const fromValue  = document.querySelector('.from-data') as HTMLElement;
    const toValue = document.querySelector('.to-data') as HTMLElement;
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    fromValue.textContent = `€${minVal}`;
    toValue.textContent = `€${maxVal}`;

    filterProducts();
    if (searchInput.value) searchProducts();
    reloadProducts(result);
}

export function filterStock() {
    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    const rangeInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range2 input'));
    const products: Array<Product> = prodData.products;
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const fromValue  = document.querySelector('.from-data2') as HTMLElement;
    const toValue = document.querySelector('.to-data2') as HTMLElement;
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    const stocksItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-stock'));
    fromValue.textContent = `${minVal}`;
    toValue.textContent = `${maxVal}`;

    filterProducts();
    if (searchInput.value) searchProducts();
    reloadProducts(result); 
}

export function getItemsAmount() {
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const stat = document.querySelector('.stat') as HTMLElement;
    
    stat.textContent = `Found: ${products.length.toString()}`;
}