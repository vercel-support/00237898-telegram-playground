require('dotenv').config();

console.log(`Token: ${process.env.TELEGRAM_BOT_TOKEN}`);
console.log(`webhookUrl: https://${process.env.VERCEL_URL}/api/telegram`);

import { NextResponse } from 'next/server';
const bot = require('../../lib/telegram-bot.js');
const { IncomingMessage } = require('http');

const readStream = async (stream) => {
  const chunks = [];
  for await (const chunk of stream) {
      chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString();
};

function isReadableStream(obj) {
  return obj instanceof IncomingMessage && typeof obj.read === 'function';
}


export async function POST(req, res) {
    // Process incoming updates from Telegram
    let parsedBody = '';
    
    if (isReadableStream(req.body)) {
      const body = await readStream(req.body);
      parsedBody = JSON.parse(body);
    } else {
      parsedBody = req.body; // assuming body-parser has already parsed the body
    }
    console.log("Incoming Message:", parsedBody);

    // Process the update with node-telegram-bot-api
    bot.processUpdate(parsedBody);

     // Send a response back to acknowledge receipt of the update
    return NextResponse.json({ message: "Received POST", data: parsedBody });
}


export async function GET(req) {
    return NextResponse.json({ message: "GET request received, but this endpoint is for POST requests." });
}