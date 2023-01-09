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

export function filterCheckboxResults(filters: { categories: Array<string>, brands: Array<string>}) {
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    let hiddenProducts: Array<HTMLElement> = [];
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const categoriesItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-category'));
    const brandsItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-brand'));

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let category = categoriesItems[i].textContent?.slice(10);
        let brand = brandsItems[i].textContent?.slice(7);

        if (filters.categories.length > 0) {
            let isHidden = true;
            
            for (let j = 0; j < filters.categories.length; j++) {
                let filter = filters.categories[j];
                
                if (filter === category) {
                    console.log(product);
                    isHidden = false;
                    break;
                }
            }

            if (isHidden) {
                hiddenProducts.push(product);
            }
        }

        if (filters.brands.length > 0) {
            let isHidden = true;

            for (let j = 0; j < filters.brands.length; j++) {
                let filter = filters.brands[j];

                if (filter === brand) {
                    isHidden = false;
                    break;
                }
            }
            
            if (isHidden) {
                hiddenProducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
    }

    if (hiddenProducts.length <= 0) {
        return;
    }

    for (let i = 0; i < hiddenProducts.length; i++) {
        hiddenProducts[i].style.display = 'none';
    }

    let check = products.filter((item) => {
        if (item.style.display === 'block') return item;
    })

    if (check.length <= 0) {
        prodCont.style.display = 'none';
        notFound.style.display = 'block';
    } else {
        prodCont.style.display = 'flex';
        notFound.style.display = 'none';
    }
}

export function filterProducts() {
    const catCheckboxes = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    const brandCheckboxes = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;

    const filters: { categories: Array<string>, brands: Array<string> } = {
        categories: getIdOfCheckedCheckboxes(catCheckboxes),
        brands: getIdOfCheckedCheckboxes(brandCheckboxes)
    }

    filterCheckboxResults(filters);
    getItemsAmount();
}

export function sortProducts() {
    const optionSelector = document.querySelector('#option-selector') as HTMLSelectElement;
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items');
    let result = [];
    
    if (optionSelector.value === 'price-down') {
        result = products.sort((a, b) => {
            let aPrice = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(7));
            let bPrice = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(7));
            if (aPrice < bPrice) return 1;
            if (aPrice > bPrice) return -1;
            return 0;
        });
        
        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }

    if (optionSelector.value === 'price-up') {
        result = products.sort((a, b) => {
            let aPrice = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(7));
            let bPrice = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].textContent?.slice(7));
            if (aPrice > bPrice) return 1;
            if (aPrice < bPrice) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }


    if (optionSelector.value === 'rating-down') {
        result = products.sort((a, b) => {
            let aRating = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(8));
            let bRating = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(8));
            if (aRating < bRating) return 1;
            if (aRating > bRating) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }
    

    if (optionSelector.value === 'rating-up') {
        result = products.sort((a, b) => {
            let aRating = Number(a.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(8));
            let bRating = Number(b.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[4].textContent?.slice(8));
            if (aRating > bRating) return 1;
            if (aRating < bRating) return -1;
            return 0;
        });

        products.forEach(node => node.parentNode?.removeChild(node));
        result.forEach(product => prodCont!.append(product));
    }
}

export function searchProducts() {
    const searchInput = document.querySelector('#search-input') as HTMLInputElement;
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    let value: string = searchInput.value;
    let hiddenProducts: Array<HTMLElement> = [];
    const titles: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-title'));
    const categoriesItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-category'));
    const brandsItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-brand'));
    const pricesItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-price'));
    const ratingsItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-rating'));
    const discountsItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-discount'));
    const stocksItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-stock'));

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let title = titles[i].textContent?.toLowerCase()
        let category = categoriesItems[i].textContent?.slice(10);
        let brand = brandsItems[i].textContent?.toLowerCase().slice(7);
        let price = pricesItems[i].textContent?.slice(7).toString();
        let rating = ratingsItems[i].textContent?.slice(8).toString();
        let discount = discountsItems[i].textContent?.slice(10).toString();
        let stock = stocksItems[i].textContent?.slice(7).toString();

        if (value && value.trim().length > 0) {
            let isHidden = true;
            
            if (title!.includes(value) ||
                brand!.includes(value) ||
                discount!.includes(value) ||
                rating!.includes(value) ||
                stock!.includes(value) ||
                category!.includes(value) ||
                price!.includes(value)) {
                isHidden = false;
                continue;
            }

            if (isHidden) {
                hiddenProducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
        getItemsAmount();
    }

    if (hiddenProducts.length <= 0) {
        return;
    }

    for (let i = 0; i < hiddenProducts.length; i++) {
        hiddenProducts[i].style.display = 'none';
        getItemsAmount();
    }

    let check = products.filter((item) => {
        if (item.style.display === 'block') return item;
    })

    if (check.length <= 0) {
        prodCont.style.display = 'none';
        notFound.style.display = 'block';
    } else {
        prodCont.style.display = 'flex';
        notFound.style.display = 'none';
    }
}

export function filterPrice() {
    const rangeInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range input'));
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const fromValue  = document.querySelector('.from-data') as HTMLElement;
    const toValue = document.querySelector('.to-data') as HTMLElement;
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    let hiddenProducts: Array<HTMLElement> = [];
    const pricesItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-price'));

    fromValue.textContent = `€${minVal}`;
    toValue.textContent = `€${maxVal}`;

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let price = pricesItems[i].textContent?.slice(7);

        if (minVal <= maxVal) {
            let isHidden = true;

            if (Number(price) >= minVal && Number(price) <= maxVal) {
              isHidden = false;
              continue;
            }
            
            if (isHidden) {
                hiddenProducts.push(product);
            }
          
        } else {
            let isHidden = true;
            
            if (Number(price) <= minVal && Number(price) >= maxVal) {
              isHidden = false;
              continue;
            }
            
            if (isHidden) {
                hiddenProducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
        getItemsAmount();
    }

    if (hiddenProducts.length <= 0) {
        return;
    }

    for (let i = 0; i < hiddenProducts.length; i++) {
        hiddenProducts[i].style.display = 'none';
        getItemsAmount();
    }

    let check = products.filter((item) => {
        if (item.style.display === 'block') return item;
    })

    if (check.length <= 0) {
        prodCont.style.display = 'none';
        notFound.style.display = 'block';
    } else {
        prodCont.style.display = 'flex';
        notFound.style.display = 'none';
    }
}

export function filterStock() {
    const rangeInput: Array<HTMLInputElement> = Array.from(document.querySelectorAll('.multi-range2 input'));
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const prodCont = document.querySelector('.products-items') as HTMLElement;
    const notFound = document.querySelector('.not-found') as HTMLElement;
    const fromValue  = document.querySelector('.from-data2') as HTMLElement;
    const toValue = document.querySelector('.to-data2') as HTMLElement;
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    let hiddenProducts: Array<HTMLElement> = [];
    const stocksItems: Array<HTMLElement> = Array.from(document.querySelectorAll('.item-stock'));

    fromValue.textContent = `${minVal}`;
    toValue.textContent = `${maxVal}`;

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let stock = stocksItems[i].textContent?.slice(7);

        if (minVal <= maxVal) {
            let isHidden = true;

            if (Number(stock) >= minVal && Number(stock) <= maxVal) {
                isHidden = false;
                continue;
            }
          
            if (isHidden) {
                hiddenProducts.push(product);
            }
        
        } else {
            let isHidden = true;
          
            if (Number(stock) <= minVal && Number(stock) >= maxVal) {
                isHidden = false;
                continue;
            }
          
            if (isHidden) {
                hiddenProducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
        getItemsAmount();
    }

    if (hiddenProducts.length <= 0) {
        return;
    }

    for (let i = 0; i < hiddenProducts.length; i++) {
        hiddenProducts[i].style.display = 'none';
        getItemsAmount();
    }

    let check = products.filter((item) => {
        if (item.style.display === 'block') return item;
    })

    if (check.length <= 0) {
        prodCont.style.display = 'none';
        notFound.style.display = 'block';
    } else {
        prodCont.style.display = 'flex';
        notFound.style.display = 'none';
    }
}

export function getItemsAmount() {
    const products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    const stat = document.querySelector('.stat') as HTMLElement;

    let amount: number = products.filter((product) => product.style.display === 'block').length;
    
    stat.textContent = `Found: ${amount.toString()}`;
}
