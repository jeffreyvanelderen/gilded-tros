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

            // OLD CODE FROM HERE
            // if (currentItem.name != ItemType.GOOD_WINE && currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR
            //     && currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) { // For all non wine and non backstage passes
            //     // and if they still have a quality value
            //     if (currentItem.quality > 0) {
            //         // and if the item is not of legendary keychain type
            //         if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
            //             // then decrease quality by 1
            //             currentItem.quality = currentItem.quality - 1;
            //         }
            //     }
            // } else { // For wine and backstage passes
            //     // If quality is smaller than maxQuality, increase by 1
            //     if (currentItem.quality < this.maxGeneralQuality) {
            //         currentItem.quality = currentItem.quality + 1;
            //
            //         // and if type is backstage refactor
            //         if (currentItem.name == ItemType.BACKSTAGE_PASSES_REFACTOR) {
            //             // and if sellIn value is in less than 11 days
            //             if (currentItem.sellIn < 11) {
            //                 // and if quality of less than maxQuality
            //                 if (currentItem.quality < this.maxGeneralQuality) {
            //                     // then increase quality by 1
            //                     currentItem.quality = currentItem.quality + 1;
            //                 }
            //             }
            //
            //             // and if sellIn value is in less than 6 days
            //             if (currentItem.sellIn < 6) {
            //                 // and if quality is less than maxQuality
            //                 if (currentItem.quality < this.maxGeneralQuality) {
            //                     // then increase quality by 1
            //                     currentItem.quality = currentItem.quality + 1;
            //                 }
            //             }
            //         }
            //     }
            // }
            //
            // // If type is not legendary keychain type (legendary keychain doesn't have to be sold)
            // if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
            //     // decrease sellIn value by 1
            //     currentItem.sellIn = currentItem.sellIn - 1;
            // }
            //
            // // If sellIn value is less than 0
            // if (currentItem.sellIn < 0) {
            //     // and if type is not wine
            //     if (currentItem.name != ItemType.GOOD_WINE) {
            //         // and if type is not backstage passes
            //         // @ts-ignore
            //         if (currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR || currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) {
            //             // and if quality is larger than 0
            //             if (currentItem.quality > 0) {
            //                 // and if type is not legendary keychain
            //                 if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
            //                     // then decrease quality by 1
            //                     currentItem.quality = currentItem.quality - 1;
            //                 }
            //             }
            //         } else {
            //             // For backstage passes, set quality to 0
            //             currentItem.quality = currentItem.quality - currentItem.quality;
            //         }
            //     } else { // For wine items
            //         // if quality is less than this.maxQuality
            //         if (currentItem.quality < this.maxGeneralQuality) {
            //             // increase quality by 1
            //             currentItem.quality = currentItem.quality + 1;
            //         }
            //     }
            // }
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

        const updatedBackstagePassQuality = calculateBackstagePassQuality(item);
        if (updatedBackstagePassQuality <= this.maxGeneralQuality) {
            item.quality = updatedBackstagePassQuality;
        }
    }

    private updateKeychainQuality(_item: Item): void {
        // "B-DAWG Keychain", being a legendary item, never has to be sold or decreases in Quality
        return;
    }

    private updateSmellyItem(item: Item): void {
        this.decreaseSellIn(item);
        this.decreaseQuality(item, 2);
    }

    private updateGeneralItem(item: Item): void {
        this.decreaseSellIn(item);
        this.decreaseQuality(item);
    }

}

