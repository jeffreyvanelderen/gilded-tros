import {Item} from "../item";

/**
 * Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
 * Quality drops to 0 after the conference
 * @param item
 * @private
 */
export const calculateBackstagePassQuality = (item: Item): number => {
    if (item.sellIn < 0) {
        return 0;
    }
    if (item.sellIn <= 5) {
        return item.quality + 3;
    }
    if (item.sellIn <= 10) {
        return item.quality + 2;
    }

    return item.quality;
}
