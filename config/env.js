require("dotenv").config();

module.exports = {
  API_ID: process.env.API_ID,
  API_HASH: process.env.API_HASH,
  TELEGRAM_BOT_API: process.env.TELEGRAM_BOT_API,
  PHONE_NUMBER: process.env.PHONE_NUMBER,
  STORAGE_PATH: "../../data/mtproto_session.json"
};
