import {Item} from './item';
import {ItemType} from "./models/enums/ItemType";

export class GildedTros {

    constructor(public items: Array<Item>, public maxQuality: number) {

    }

    public updateQuality(): void {
        for (const currentItem of this.items) {
            if (currentItem.name != ItemType.GOOD_WINE && currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR
                && currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) { // For all non wine and non backstage passes
                // and if they still have a quality value
                if (currentItem.quality > 0) {
                    // and if the item is not of legendary keychain type
                    if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                        // then decrease quality by 1
                        currentItem.quality = currentItem.quality - 1;
                    }
                }
            } else { // For wine and backstage passes
                // If quality is smaller than maxQuality, increase by 1
                if (currentItem.quality < this.maxQuality) {
                    currentItem.quality = currentItem.quality + 1;

                    // and if type is backstage refactor
                    if (currentItem.name == ItemType.BACKSTAGE_PASSES_REFACTOR) {
                        // and if sellIn value is in less than 11 days
                        if (currentItem.sellIn < 11) {
                            // and if quality of less than maxQuality
                            if (currentItem.quality < this.maxQuality) {
                                // then increase quality by 1
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }

                        // and if sellIn value is in less than 6 days
                        if (currentItem.sellIn < 6) {
                            // and if quality is less than maxQuality
                            if (currentItem.quality < this.maxQuality) {
                                // then increase quality by 1
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }
                    }
                }
            }

            // If type is not legendary keychain type (legendary keychain doesn't have to be sold)
            if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                // decrease sellIn value by 1
                currentItem.sellIn = currentItem.sellIn - 1;
            }

            // If sellIn value is less than 0
            if (currentItem.sellIn < 0) {
                // and if type is not wine
                if (currentItem.name != ItemType.GOOD_WINE) {
                    // and if type is not backstage passes
                    // @ts-ignore
                    if (currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR || currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) {
                        // and if quality is larger than 0
                        if (currentItem.quality > 0) {
                            // and if type is not legendary keychain
                            if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                                // then decrease quality by 1
                                currentItem.quality = currentItem.quality - 1;
                            }
                        }
                    } else {
                        // For backstage passes, set quality to 0
                        currentItem.quality = currentItem.quality - currentItem.quality;
                    }
                } else { // For wine items
                    // if quality is less than this.maxQuality
                    if (currentItem.quality < this.maxQuality) {
                        // increase quality by 1
                        currentItem.quality = currentItem.quality + 1;
                    }
                }
            }
        }
    }

}

