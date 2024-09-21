const { Telegraf } = require("telegraf");
const { TELEGRAM_BOT_API } = require("../../config/env");

const bot = new Telegraf(TELEGRAM_BOT_API);

const sendMessage = async (chatId, text) => {
  try {
    await bot.telegram.sendMessage(chatId, text);
  } catch (error) {
    console.error(`Failed to send message: ${error.message}`);
  }
};

module.exports = { bot, sendMessage };
