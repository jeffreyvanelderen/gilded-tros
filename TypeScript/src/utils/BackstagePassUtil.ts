import {Item} from "../item";

/**
 * Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
 * Quality drops to 0 after the conference
 * @param item
 * @param maxQuality
 * @private
 */
export const calculateBackstagePassQuality = (item: Item, maxQuality: number): number => {
    if (item.sellIn < 0) {
        return 0;
    }

    let newQuality = item.quality + 1;

    if (item.sellIn <= 5) {
        newQuality = item.quality + 3;
    } else if (item.sellIn <= 10) {
        newQuality = item.quality + 2;
    }

    return newQuality >= maxQuality ? maxQuality : newQuality;
}
