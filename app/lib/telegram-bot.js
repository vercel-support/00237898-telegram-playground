// bot.js
const TelegramBot = require('node-telegram-bot-api');

// Replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
console.log("Token: " + token);
const bot = new TelegramBot(token, { polling: false });

// Function to check and set webhook
const checkAndSetWebhook = async () => {
    try {
        
        const webhookUrl = `https://${process.env.VERCEL_URL}/api/telegram`;
        console.log("webhookUrl: " + webhookUrl);
        console.log("Bot: " + bot);
        await bot.setWebHook(webhookUrl);
        // const webhookInfo = await bot.getWebhookInfo();

        // if (webhookInfo.url !== webhookUrl) {
        //     await bot.setWebHook(webhookUrl);
        //     console.log(`Webhook set to ${webhookUrl}`);
        // } else {
        //     console.log('Webhook is already correctly set.');
        // }
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
};

// Call the function to check and set the webhook
//checkAndSetWebhook();

// Set up your bot handlers
// bot.onText(/\/echo (.+)/, (msg, match) => {
//     console.log("OnTEXT");
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
//     bot.sendMessage(chatId, resp);
// });


bot.on('message', (msg) => {
    console.log("message");
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message: ' + msg.text);
});

module.exports = bot;
