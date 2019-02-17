export class Item {
    public name: string;
    public sellIn: number;
    public quality: number;

    public constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    private items: Array<Item>;
    private readonly MIN_SELLIN: number = 0;
    private readonly MIN_QUALITY: number = 0;
    private readonly MAX_QUALITY: number = 50;

    public constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /**
     * Update sellIn and quality values.
     *
     * There are some custom behavior based on item.
     * - Once the sell by date has passed, Quality degrades twice as fast
     * - The Quality of an item is never negative
     * - "Aged Brie" actually increases in Quality the older it gets
     * - The Quality of an item is never more than 50
     * - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
     * - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
     *   Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
     *   Quality drops to 0 after the concert
     * - "Conjured" items degrade in Quality twice as fast as normal items
     */
    public updateQuality(): Array<Item> {
        for (let i = 0; i < this.items.length; i++) {
            if (!this.isAgedBrie(this.items[i]) && !this.isBackstagePasses(this.items[i])) {
                if (this.items[i].quality > this.MIN_QUALITY && !this.isSulfuras(this.items[i])) {
                    const decrease: number = (this.isConjured(this.items[i])) ? 2 : 1;
                    this.decreaseQuality(this.items[i], decrease);
                }
            } else {
                if (this.items[i].quality < this.MAX_QUALITY) {
                    this.increaseQuality(this.items[i]);
                    if (this.isBackstagePasses(this.items[i])) {
                        if (this.items[i].sellIn < 11 && this.items[i].quality < this.MAX_QUALITY) {
                            this.increaseQuality(this.items[i]);
                        }
                        if (this.items[i].sellIn < 6 && this.items[i].quality < this.MAX_QUALITY) {
                            this.increaseQuality(this.items[i]);
                        }
                    }
                }
            }

            if (!this.isSulfuras(this.items[i])) {
                this.decreaseSellIn(this.items[i]);
            }

            if (this.items[i].sellIn < 0) {
                if (!this.isAgedBrie(this.items[i])) {
                    if (!this.isBackstagePasses(this.items[i]) &&
                        this.items[i].quality > this.MIN_QUALITY &&
                        !this.isSulfuras(this.items[i])
                    ) {
                        this.decreaseQuality(this.items[i]);
                    } else {
                        this.decreaseQuality(this.items[i], this.items[i].quality);
                    }
                } else {
                    if (this.items[i].quality < this.MAX_QUALITY) {
                        this.increaseQuality(this.items[i]);
                    }
                }
            }
        }

        return this.items;
    }

    /**
     * Decrease sell in.
     *
     * In case the sell in is lower than min, sell in will be set as min
     *
     * @param {object} item Item object.
     */
    private decreaseSellIn(item: Item): void {
        if (item.sellIn > this.MIN_SELLIN) {
            item.sellIn--;
        }
    }

    /**
     * Increase quality.
     *
     * In case the quality is greater than max, quality will be set as max
     *
     * @param {object} item Item object.
     * @param {number} value Number with value to increase quality.
     */
    private increaseQuality(item: Item, value: number = 1): void {
        item.quality += value;
        if (item.quality > this.MAX_QUALITY) {
            item.quality = this.MAX_QUALITY;
        }
    }

    /**
     * Decrease quality.
     *
     * In case the quality is lower than min, quality will be set as min
     *
     * @param {object} item Item object.
     * @param {number} value Number with value to decrease quality.
     */
    private decreaseQuality(item: Item, value: number = 1): void {
        item.quality -= value;
        if (item.quality < this.MIN_QUALITY) {
            item.quality = this.MIN_QUALITY;
        }
    }

    /**
     * Check if name is Aged Brie.
     *
     * @param {object} item Item object.
     *
     * @return {boolean}
     */
    private isAgedBrie(item: Item): boolean {
        return item.name === 'Aged Brie';
    }

    /**
     * Check if name is Backstage passes to a TAFKAL80ETC concert.
     *
     * @param {object} item Item object.
     *
     * @return {boolean}
     */
    private isBackstagePasses(item: Item): boolean {
        return item.name === 'Backstage passes to a TAFKAL80ETC concert';
    }

    /**
     * Check if name is Sulfuras, Hand of Ragnaros.
     *
     * @param {object} item Item object.
     *
     * @return {boolean}
     */
    private isSulfuras(item: Item): boolean {
        return item.name === 'Sulfuras, Hand of Ragnaros';
    }

    /**
     * Check if name is Conjured Mana Cake.
     *
     * @param {object} item Item object.
     *
     * @return {boolean}
     */
    private isConjured(item: Item): boolean {
        return item.name === 'Conjured Mana Cake';
    }
}
