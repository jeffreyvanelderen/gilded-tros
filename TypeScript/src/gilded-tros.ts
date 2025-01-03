import {Item} from './item';
import {ItemType} from "./models/enums/ItemType";
import {calculateBackstagePassQuality} from "./utils/BackstagePassUtil";

export class GildedTros {

    constructor(public items: Array<Item>, public maxGeneralQuality: number) {

    }

    public updateQuality(): void {
        for (const currentItem of this.items) {

            // I'd expect the updateQuality method to be present in the Item class itself, but since we cannot alter the class, we will calculate it here for each item
            switch (currentItem.name) {
                case ItemType.GOOD_WINE:
                    this.updateWineQuality(currentItem);
                    break;
                case ItemType.BACKSTAGE_PASSES_REFACTOR:
                case ItemType.BACKSTAGE_PASSES_HAXX:
                    this.updateBackstagePassQuality(currentItem);
                    break;
                case ItemType.LONG_METHODS:
                case ItemType.DUPLICATE_CODE:
                case ItemType.UGLY_VARIABLE_NAMES:
                    this.updateSmellyItem(currentItem);
                    break;
                case ItemType.B_DAWG_KEYCHAIN:
                    this.updateKeychainQuality(currentItem);
                    break;
                default:
                    // General item type, add default handler
                    this.updateGeneralItem(currentItem);
            }
        }
    }

    private decreaseSellIn(item: Item, amount: number = 1): void  {
        item.sellIn -= amount;
    }

    private decreaseQuality(item: Item, amount: number = 1) {
        if (item.quality > 0) {
            item.quality -= amount;
        }
    }

    private updateWineQuality(item: Item): void {
        this.decreaseSellIn(item);

        if (item.quality < this.maxGeneralQuality) {
            item.quality += 1;
        }
    }

    private updateBackstagePassQuality(item: Item): void {
        this.decreaseSellIn(item);
        item.quality = calculateBackstagePassQuality(item, this.maxGeneralQuality);
    }

    private updateKeychainQuality(_item: Item): void {
        // "B-DAWG Keychain", being a legendary item, never has to be sold or decreases in Quality
        return;
    }

    private updateSmellyItem(item: Item): void {
        this.decreaseSellIn(item);
        // Smelly items ("Duplicate Code", "Long Methods", "Ugly Variable Names") degrade in Quality twice as fast as normal items
        this.decreaseQuality(item, 2);
    }

    private updateGeneralItem(item: Item): void {
        this.decreaseSellIn(item);
        this.decreaseQuality(item);
    }

}

