import { CustomEmbed } from "../utils/embed.js"

export class Store {
    static ITEMS = [{
        name: "🚨 Alarm",
        description: "Get an alarm the next time someone tries to steal from you (works for only 1 steal opportunity)",
        amount: 15
    }]

    static getStoreEmbed() {
        return new CustomEmbed().setTitle("SHOP 🛍️").setColor(0x8f34eb).setDescription("Buy cool stuff here lol").setFields(this.ITEMS.map((item, idx) => ({
            name: `${idx + 1}) ${item.name} (🪙 ${item.amount})`,
            value: `- ${item.description}`,
            inline: true
        })))
    }
}