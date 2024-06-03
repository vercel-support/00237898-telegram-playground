// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
console.log("Token: " + token);
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    console.log("message");
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message: ' + msg.text);
});

module.exports = bot;
