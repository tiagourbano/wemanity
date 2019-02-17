import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should decrease the value of sellIn', () => {
        const gildedRose = new GildedRose([ new Item('Decrease SellIn', 3, 4) ]);
        let items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(2);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
    });

    it('should decrease the value of quality', () => {
        const gildedRose = new GildedRose([new Item('Decrease Quality', 3, 4)]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(3);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should increase the value of quality for Aged Brie', () => {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 2, 0) ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(1);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });

    it('should increase the value of quality in 3 times for Backstage passes to a TAFKAL80ETC concert', () => {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 2, 0)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(3);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(6);
    });

    it('should increase the value of quality in 2 times for Backstage passes to a TAFKAL80ETC concert', () => {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(2);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
    });

    it('should increase the value of quality for Backstage passes to a TAFKAL80ETC concert', () => {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 0)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(1);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
    });

    it('should keep values for quality and sellin if the name of the item is "Sulfuras, Hand of Ragnaros"', () => {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', 0, 80)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(80);
    });

    it('should keep value for sellin, quality should be 0 if the name of the item is "Sulfuras, Hand of Ragnaros"', () => {
        const gildedRose = new GildedRose([
            new Item('Sulfuras, Hand of Ragnaros', -1, 80)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('should decrease quality twice as fast as normal if item name is Conjured Mana Cake', () => {
        const gildedRose = new GildedRose([
            new Item('Conjured Mana Cake', 3, 6)
        ]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(4);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);

        gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should keep quality for Aged Brie if sellIn is less than min sellIn', () => {
        const gildedRose = new GildedRose([new Item('Aged Brie', -10, 80)]);
        let items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(80);
    });
});
