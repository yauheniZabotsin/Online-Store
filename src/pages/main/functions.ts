import { Product } from "../../components/interfaces/interfaces";

export function controlFromInput(fromSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput:HTMLInputElement, controlSlider: HTMLInputElement) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (+from > +to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}

export function controlToInput(toSlider: HTMLInputElement, fromInput: HTMLInputElement, toInput: HTMLInputElement, controlSlider: HTMLInputElement) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (+from <= +to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

export function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (+from > +to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromInput.value = from;
    }
}

export function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    setToggleAccessible(toSlider);
    if (+from <= +to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
        toSlider.value = from;
    }
}

export function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [String(from), String(to)];
}

export function fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLInputElement) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

export function setToggleAccessible(currentTarget: HTMLInputElement) {
    const toSlider = document.querySelector<HTMLInputElement>('#toSlider');
    if (Number(currentTarget.value) <= 0) {
        if(toSlider) {
          toSlider.style.zIndex = '2';
        }
    } else {
      if(toSlider) toSlider.style.zIndex='0';
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

export function filterCheckboxResults(filters: { categories: Array<string>, brands: Array<string>}) {
    let products: Array<HTMLElement> = Array.from(document.querySelectorAll('.item'));
    let hiddenPoducts: Array<HTMLElement> = [];
    
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let category = product.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[1].textContent?.slice(10);
        let brand = product.childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[3].textContent?.slice(7);
        
        if (filters.categories.length > 0) {
            let isHidden = true;
            
            for (let j = 0; j < filters.categories.length; j++) {
                
                let filter = filters.categories[j];
                
                if (filter === category) {
                    isHidden = false;
                    break;
                }
            }

            if (isHidden) {
                hiddenPoducts.push(product);
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
                hiddenPoducts.push(product);
            }
        }
    }

    for (let i = 0; i < products.length; i++) {
        products[i].style.display = 'block';
    }

    if (hiddenPoducts.length <= 0) {
        return;
    }

    for (let i = 0; i < hiddenPoducts.length; i++) {
        hiddenPoducts[i].style.display = 'none';
    }
}

export function filterProducts() {
    const catCheckboxes = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    const brandCheckboxes = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;

    const filters: { categories: Array<string>, brands: Array<string> } = {
        categories: getIdOfCheckedCheckboxes(catCheckboxes),
        brands: getIdOfCheckedCheckboxes(brandCheckboxes)
    }
    
    const filterResult = filterCheckboxResults(filters);
}