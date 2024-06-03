require('dotenv').config();

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
    const body = await readStream(req.body);
    const parsedBody = JSON.parse(body);
    console.log("Readable Stream");

    console.log("Incoming Message: ", parsedBody);

    // Process the update with node-telegram-bot-api
    bot.processUpdate(parsedBody);

     // Send a response back to acknowledge receipt of the update
    return NextResponse.json({ message: "Received POST", data: parsedBody });
}


export async function GET(req) {
    return NextResponse.json({ message: "GET request received, but this endpoint is for POST requests." });
}