import { Data, Product } from '../interfaces/interfaces';

class Products {
    loadData(data: Data['products']): void {
        const fragment = document.createDocumentFragment();
        const prodCont = <HTMLElement>document.querySelector('.products-items');
        const itemTemplate = <HTMLTemplateElement>document.querySelector('.item-template');

        data.forEach((item: Product) => {
            const itemClone = <HTMLElement>itemTemplate.content.cloneNode(true);
            const itemDiv = <HTMLElement>itemClone.querySelector('.item');
            const itemCont = <HTMLElement>itemClone.querySelector('.item-container');
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

export default Products;
