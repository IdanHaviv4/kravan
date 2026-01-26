import { CustomEmbed } from "../utils/embed.js";

export enum ItemId {
  ALARM = 1,
  BOUQUET,
}

export class Store {
  static ITEMS = new Map<
    number,
    {
      name: string;
      description: string;
      amount: number;
    }
  >()
    .set(ItemId.ALARM, {
      name: "🚨 Alarm",
      description:
        "Get an alarm the next time someone tries to steal from you (works for only 1 steal opportunity)",
      amount: 100,
    })
    .set(ItemId.BOUQUET, {
      name: "💐 Bouquet",
      description:
        "Buy a bouquet of flowers (u can also give it to a special someone 🤗)",
      amount: 100,
    });

  static getStoreEmbed() {
    return new CustomEmbed()
      .setDescription("Buy cool stuff here lol")
      .setColor(0x8f34eb)
      .setFields(
        Array.from(this.ITEMS.values()).map((item) => ({
          name: `${item.name} (🪙 ${item.amount.toLocaleString()})`,
          value: `${item.description}`,
          inline: true,
        })),
      );
  }
}
