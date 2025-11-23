const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

// кнопка Mini App
bot.start((ctx) => {
    ctx.reply("Добро пожаловать в StarBurger!", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🍔 Открыть меню",
                        web_app: { url: process.env.WEBAPP_URL }
                    }
                ]
            ]
        }
    });
});

// сервер присылает сюда заказ
bot.on("text", (ctx) => {});

bot.launch();

console.log("Bot started");
