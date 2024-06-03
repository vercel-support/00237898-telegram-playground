// test-dotenv.js
require('dotenv').config();

console.log(`Token: ${process.env.TELEGRAM_BOT_TOKEN}`);
console.log(`webhookUrl: https://${process.env.VERCEL_URL}/api/telegram`);