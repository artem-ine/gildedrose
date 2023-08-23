const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", function () {
  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach((item) =>
        console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
      );
      gildedRose.updateQuality();
    }
  });

  // Test if Aged Brie quality increases by 1 when sellIn--
  it("Aged Brie quality increases with age", () => {
    const items = [new Item("Aged Brie", 6, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  // Test if Backstage pass quality increases by 3 when sellIn < 5
  it("Backstage passes quality increases with age", () => {
    const items = [new Item("Backstage passes", 3, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  // Test if Backstage pass quality increases by 2 when 5 < sellIn < 10
  it("Backstage passes quality increases with age", () => {
    const items = [new Item("Backstage passes", 6, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  // Test if Backstage pass quality increases by 1 when sellIn--
  it("Backstage passes quality increases with age", () => {
    const items = [new Item("Backstage passes", 24, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  //Test if default items decreases by 1 when sellIn--
  it("Default item decreases with age", () => {
    const items = [new Item("Cabbage", 3, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(9);
  });

  //Test if default items decreases by 2 when sellIn < 0
  it("Default item decreases with age", () => {
    const items = [new Item("Cabbage", -2, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  //Test if items whose quality go up cap at 50
  it("Quality never goes past 50", () => {
    const items = [new Item("Aged Brie", 3, 50)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  //Test if items whose quality are never negative
  it("Quality never goes past 50", () => {
    const items = [new Item("Celery", 2, 0)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  //Test if Sulfuras quality is always 80
  it("Quality never goes past 50, sellIn is null", () => {
    const items = [new Item("Sulfuras", 10, 80)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(null);
  });

  //Test if Conjured item loses quality twice as fast
  it("Quality of Conjured item decreases .2x", () => {
    const items = [new Item("Conjured Cabbage", 10, 30)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(28);
  });

  //Test if Conjured item loses quality x2 twice as fast when sellIn < 0
  it("Quality of Conjured item decreases .2x", () => {
    const items = [new Item("Conjured Cabbage", -2, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
});
