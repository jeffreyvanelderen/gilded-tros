import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';
import {ItemType} from "../src/models/enums/ItemType";


describe('GildedTrosTest', () => {
    const MAX_QUALITY: number = 50;

    describe('General', () => {
        it('never sets quality of an item to negative value', () => {
            const app = new GildedTros([
                new Item(ItemType.GOOD_WINE, 0, 0),
            ], MAX_QUALITY);

            app.updateQuality();
            app.updateQuality();
            app.updateQuality();

            expect(app.items[0].quality).toBe(0);
        })

        it('never sets quality of an item higher than given max quality value', () => {
            const app = new GildedTros([
                new Item(ItemType.GOOD_WINE, 0, MAX_QUALITY),
            ], MAX_QUALITY);

            app.updateQuality();
            app.updateQuality();
            app.updateQuality();

            expect(app.items[0].quality).toBe(MAX_QUALITY);
        })

        // TODO?
        it('degrades quality twice as fast once the sell by date has passed, ', () => {
            const initialQuality = 10;
            const app = new GildedTros([
                new Item('Some random item', 0, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();
            expect(app.items[0].quality).toBe(initialQuality - 2);

            app.updateQuality();
            expect(app.items[0].quality).toBe(initialQuality - 4);

            app.updateQuality();
            expect(app.items[0].quality).toBe(initialQuality - 6);
        })
    })

    describe('Backstage passes', () => {
        it('sets quality to 0 when sellIn is less than zero', () => {
            const app = new GildedTros([
                new Item(ItemType.BACKSTAGE_PASSES_REFACTOR, 0, 20),
            ], MAX_QUALITY);

            expect(app.items[0].quality).not.toBe(0);

            app.updateQuality();

            expect(app.items[0].quality).toBe(0);
        })

        it('increases quality by 2 when there are 10 days or less', () => {
            const initialQuality = 20;
            const app = new GildedTros([
                new Item(ItemType.BACKSTAGE_PASSES_REFACTOR, 10, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].quality).toBe(initialQuality + 2);
        })

        it('increases quality by 3 when there are 5 days or less', () => {
            const initialQuality = 20;
            const app = new GildedTros([
                new Item(ItemType.BACKSTAGE_PASSES_HAXX, 5, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].quality).toBe(initialQuality + 3);
        })

        it('never sets a quality above the given max quality value', () => {
            const initialQuality = 49;
            const app = new GildedTros([
                new Item(ItemType.BACKSTAGE_PASSES_HAXX, 5, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].quality).toBe(MAX_QUALITY);
        })
    })

    describe(ItemType.GOOD_WINE, () => {
        it('increases quality when sellIn decreases', () => {
            const initialQuality = 0;
            const app = new GildedTros([
                new Item(ItemType.GOOD_WINE, 2, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].quality).toBe(initialQuality + 1);
        })

        it('never sets quality higher than the given max quality', () => {
            const app = new GildedTros([
                new Item(ItemType.GOOD_WINE, 2, MAX_QUALITY),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].quality).toBe(MAX_QUALITY);
        })
    })

    describe(ItemType.B_DAWG_KEYCHAIN, () => {
        it('never decreases sellIn', () => {
            const initialSellIn = 5;
            const app = new GildedTros([
                new Item(ItemType.B_DAWG_KEYCHAIN, initialSellIn, 80),
            ], MAX_QUALITY);

            app.updateQuality();

            expect(app.items[0].sellIn).toBe(initialSellIn);
        })

        it('never changes quality', () => {
            const initialQuality = 80;
            const app = new GildedTros([
                new Item(ItemType.B_DAWG_KEYCHAIN, 1, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();
            app.updateQuality();
            app.updateQuality();

            expect(app.items[0].quality).toBe(initialQuality);
        })
    })

    describe('Smelly items', () => {
        it('degrades quality twice as fast as normal items', () => {
            const initialQuality = 30;
            const app = new GildedTros([
                new Item(ItemType.LONG_METHODS, 10, initialQuality),
                new Item(ItemType.UGLY_VARIABLE_NAMES, 10, initialQuality),
                new Item(ItemType.DUPLICATE_CODE, 10, initialQuality),
            ], MAX_QUALITY);

            app.updateQuality();

            app.items.forEach(item => {
                expect(item.quality).toBe(initialQuality - 2);
            })
        })
    })

});
