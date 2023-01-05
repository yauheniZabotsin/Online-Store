import { Data, Filter, Product } from '../interfaces/interfaces';

export class Products {
    loadProducts(data: Data['products']): void {
        const fragment = document.createDocumentFragment();
        const prodCont = <HTMLElement>document.querySelector('.products-items');
        const itemTemplate = <HTMLTemplateElement>document.querySelector('.item-template');

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

            itemCont.setAttribute('id', item.id.toString());
            itemCont.style.backgroundImage = `url(${item.thumbnail})`;
            itemCont.style.backgroundPosition = 'top left';
            itemCont.style.backgroundRepeat = 'cover';
            itemTitle.textContent = item.title;
            itemCat.insertAdjacentText('beforeend', item.category);
            itemBrand.insertAdjacentText('beforeend', item.brand);
            itemPrice.insertAdjacentText('beforeend', item.price.toString());
            itemDiscount.insertAdjacentText('beforeend', item.discountPercentage.toString());
            itemRating.insertAdjacentText('beforeend', item.rating.toString());
            itemStock.insertAdjacentText('beforeend', item.stock.toString());

            fragment.append(itemClone);
        });

        prodCont.appendChild(fragment);
    }
}

export class Categories {
    loadCategories(data: Array<Filter>): void {
        const fragment = document.createDocumentFragment();
        const catList = <HTMLElement>document.querySelector('.categories');
        const itemTemplate = <HTMLTemplateElement>document.querySelector('.filter-template');

        data.forEach((item: Filter) => {
            const itemClone = <HTMLElement>itemTemplate.content.cloneNode(true);
            const itemDiv = <HTMLElement>itemClone.querySelector('.checkbox-line item-active');
            const itemInput  = <HTMLElement>itemClone.querySelector('.filter-input');
            const itemLabel = <HTMLElement>itemClone.querySelector('.filter-label');
            const itemSpan = <HTMLElement>itemClone.querySelector('.filter-span');

            itemInput.setAttribute('id', item.category);
            itemLabel.setAttribute('for', item.category);
            itemLabel.insertAdjacentText('beforeend', item.category);
            itemSpan.insertAdjacentText('beforeend', item.amount);

            fragment.append(itemClone);
        });

        catList.appendChild(fragment);
    }
}

export class Brands {
    loadBrands(data: Array<Filter>): void {
        const fragment = document.createDocumentFragment();
        const brandList = <HTMLElement>document.querySelector('.brands');
        const itemTemplate = <HTMLTemplateElement>document.querySelector('.filter-template');

        data.forEach((item: Filter) => {
            const itemClone = <HTMLElement>itemTemplate.content.cloneNode(true);
            const itemDiv = <HTMLElement>itemClone.querySelector('.checkbox-line item-active');
            const itemInput  = <HTMLElement>itemClone.querySelector('.filter-input');
            const itemLabel = <HTMLElement>itemClone.querySelector('.filter-label');
            const itemSpan = <HTMLElement>itemClone.querySelector('.filter-span');

            itemInput.setAttribute('id', item.category);
            itemLabel.setAttribute('for', item.category);
            itemLabel.insertAdjacentText('beforeend', item.category);
            itemSpan.insertAdjacentText('beforeend', item.amount);

            fragment.append(itemClone);
        });

        brandList.appendChild(fragment);
    }
}
