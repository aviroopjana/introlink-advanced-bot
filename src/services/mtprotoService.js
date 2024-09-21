const MTProto = require("@mtproto/core");
const { resolve } = require("path");
const { API_ID, API_HASH, STORAGE_PATH } = require("../../config/env");

const mtproto = new MTProto({
  api_id: API_ID,
  api_hash: API_HASH,
  storageOptions: {
    path: resolve(__dirname, STORAGE_PATH),
  },
});

const mtprotoCall = async (method, params = {}, options = {}) => {
  try {
    const result = await mtproto.call(method, params, options);
    return result;
  } catch (error) {
    console.error(`Error calling ${method}:`, error);

    const { error_code, error_message } = error;

    if (error_code === 420) {
      const seconds = Number(error_message.split("FLOOD_WAIT_")[1]);
      const ms = seconds * 1000;
      await new Promise((resolve) => setTimeout(resolve, ms));
      return mtprotoCall(method, params, options);
    }

    if (error_code === 303) {
      const [type, dcIdAsString] = error_message.split("_MIGRATE_");
      const dcId = Number(dcIdAsString);

      if (type === "PHONE") {
        await mtproto.setDefaultDc(dcId);
      } else {
        Object.assign(options, { dcId });
      }

      return mtprotoCall(method, params, options);
    }

    throw error;
  }
};

module.exports = { mtprotoCall, mtproto };