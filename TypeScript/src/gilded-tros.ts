import {Item} from './item';
import {ItemType} from "./models/enums/ItemType";

export class GildedTros {

    constructor(public items: Array<Item>) {

    }

    public updateQuality(): void {
        for (const currentItem of this.items) {
            if (currentItem.name != ItemType.GOOD_WINE && currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR
                && currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) {
                if (currentItem.quality > 0) {
                    if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                        currentItem.quality = currentItem.quality - 1;
                    }
                }
            } else {
                if (currentItem.quality < 50) {
                    currentItem.quality = currentItem.quality + 1;

                    if (currentItem.name == ItemType.BACKSTAGE_PASSES_REFACTOR) {
                        if (currentItem.sellIn < 11) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }

                        if (currentItem.sellIn < 6) {
                            if (currentItem.quality < 50) {
                                currentItem.quality = currentItem.quality + 1;
                            }
                        }
                    }
                }
            }

            if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                currentItem.sellIn = currentItem.sellIn - 1;
            }

            if (currentItem.sellIn < 0) {
                if (currentItem.name != ItemType.GOOD_WINE) {
                    // @ts-ignore
                    if (currentItem.name != ItemType.BACKSTAGE_PASSES_REFACTOR || currentItem.name != ItemType.BACKSTAGE_PASSES_HAXX) {
                        if (currentItem.quality > 0) {
                            if (currentItem.name != ItemType.B_DAWG_KEYCHAIN) {
                                currentItem.quality = currentItem.quality - 1;
                            }
                        }
                    } else {
                        currentItem.quality = currentItem.quality - currentItem.quality;
                    }
                } else {
                    if (currentItem.quality < 50) {
                        currentItem.quality = currentItem.quality + 1;
                    }
                }
            }
        }
    }

}

