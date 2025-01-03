import {Item} from '../src/item';
import {GildedTros} from '../src/gilded-tros';

describe('GildedTrosTest', () => {
    const items: Item[] = [new Item('foo', 0, 0)];
    const maxQuality: number = 50;
    const app: GildedTros = new GildedTros(items, maxQuality);
    app.updateQuality();
    expect(app.items[0].name).toEqual('fixme');
});
