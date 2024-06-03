require('dotenv').config();

console.log(`Token: ${process.env.TELEGRAM_BOT_TOKEN}`);
console.log(`webhookUrl: https://${process.env.VERCEL_URL}/api/telegram`);

import { NextResponse } from 'next/server';
const bot = require('../../lib/telegram-bot.js');

const readStream = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
      chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
};


export async function POST(req, res) {
    // Process incoming updates from Telegram
  //   const { body } = req;
  //   console.log("Incoming Message:", body);

  //    // Process the update with node-telegram-bot-api
  //  await bot.processUpdate(body);

    const body = await readStream(req.body);
    const parsedBody = JSON.parse(body);
    console.log("Incoming Message:", parsedBody);

    // Process the update with node-telegram-bot-api
    bot.processUpdate(parsedBody);

     // Send a response back to acknowledge receipt of the update
    return NextResponse.json({ message: "Received POST", data: parsedBody });
}


export async function GET(req) {
    return NextResponse.json({ message: "GET request received, but this endpoint is for POST requests." });
}