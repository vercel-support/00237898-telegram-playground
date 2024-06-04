require('dotenv').config();
import { NextResponse } from 'next/server';
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

// export const runtime = 'edge';

// Create a bot instance
console.log("Token: " + token);
const webhookURL = 'https://00237898-telegram-playground.preview.vercel-support.app/api/telegram';
// bot.setWebHook(webhookURL);

const apiURL = `https://api.telegram.org/bot${token}`;

const readStream = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString();
};

export async function POST(req, res) {
    // Process incoming updates from Telegram
    const body = await readStream(req.body);
    const parsedBody = JSON.parse(body);

    console.log("Incoming Message: ", parsedBody);

    return new Promise((resolve, reject) => {
        const bot = new TelegramBot(token);
        bot.on('message', async (msg) => {
            try {
                console.log("message: ", msg);
                const chatId = msg.chat.id;
                try {
                    const message = await bot.sendMessage(chatId, 'Received your message: ' + msg.text);
                    console.log("Msg sent successfully ", message);
                    resolve(NextResponse.json({ message: "Received POST", data: parsedBody }));
                } catch (error) {
                    console.error("Error sending message: ", error);
                    reject();
                }
            } catch (error) {
                console.log("Try Catch error - on-messge", error);
                reject();
            }
        });

        // Process the update with node-telegram-bot-api
        bot.processUpdate(parsedBody);
    });
}


export async function GET(req) {
    await fetch(apiURL + '/setWebhook', {
        method: 'POST',
        body: JSON.stringify({ url: webhookURL }),
    });
    return NextResponse.json({ message: "GET request received, but this endpoint is for POST requests." });
}