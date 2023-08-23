class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.itemRules = {
      Sulfuras: (item) => {
        item.quality = 80;
      },
      "Aged Brie": (item) => {
        if (item.quality < 50) {
          item.quality++;
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        item.sellIn--;
      },
      "Backstage passes": (item) => {
        if (item.sellIn <= 5 && item.quality < 50) {
          item.quality += 3;
        } else if (item.sellIn <= 10 && item.quality < 50) {
          item.quality += 2;
        } else if (item.quality < 50) {
          item.quality++;
        }
        if (item.quality > 50) {
          item.quality = 50;
        }
        item.sellIn--;
      },
    };
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const rule =
        this.itemRules[item.name] ||
        ((item) => {
          if (item.quality < 0) {
            item.quality = 0;
          } else if (item.quality > 50) {
            item.quality = 50;
          }
          if (item.sellIn < 0) {
            item.quality -= 2;
          } else if (item.sellIn > 0) {
            item.quality--;
          }
          item.sellIn--;
        });
      rule(item);
    }
  }
}

module.exports = {
  Item,
  Shop,
};
