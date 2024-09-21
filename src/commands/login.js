const { bot } = require("../services/telegramService");
const { mtprotoCall } = require("../services/mtprotoService");
const { getUser } = require("../utils/getUser");
const { Markup } = require("telegraf");
const sessions = {};

const handleLoginCommand = async (ctx) => {
  const userId = ctx.from.id;

  // Check if user is already logged in
  if (sessions[userId]) {
    ctx.reply("You are already logged in.");
    return;
  }

  // Check if the user is already authenticated
  const user = await getUser(mtprotoCall);
  if (user) {
    ctx.reply("You are already authenticated.");
    return;
  }

  const welcomeMessage = "Please share your phone number to continue.";

  // Create keyboard for sharing contact
  const keyboard = Markup.keyboard([
    [Markup.button.contactRequest("Share Phone Number")],
    [Markup.button.text("Cancel")],
  ])
    .oneTime()
    .resize();

  // Send message with the keyboard
  await ctx.reply(welcomeMessage, keyboard);

  // Handle contact sharing
  bot.on("contact", async (ctx) => {
    if (ctx.message.contact) {
      const contact = ctx.message.contact;
      if (contact.user_id !== ctx.from.id) {
        ctx.reply("Please share your own number.");
        return;
      }

      const phoneNumber = contact.phone_number;

      // Continue the authentication process
      await authenticateUser(ctx, phoneNumber);
    }
  });
};

const authenticateUser = async (ctx, phoneNumber) => {
  try {
    // Start login process by sending authentication code
    const loginResponse = await mtprotoCall("auth.sendCode", {
      phone_number: phoneNumber,
      settings: { _: "codeSettings" },
    });

    const codeHash = loginResponse.phone_code_hash;

    // Ask user for the verification code
    ctx.reply(
      "Please enter the verification code sent to your phone, with spaces between each digit (e.g., 1 2 3 4 5 6)."
    );

    // Store session with code hash for later verification
    sessions[ctx.from.id] = { phone_number: phoneNumber, codeHash };

    // Listen for the verification code input
    bot.on("text", async (ctx) => {
      const inputCode = ctx.message.text.split(" ").join("");
      const session = sessions[ctx.from.id];

      if (session && session.codeHash) {
        try {
          await mtprotoCall("auth.signIn", {
            phone_number: session.phone_number,
            phone_code_hash: session.codeHash,
            phone_code: inputCode,
          });

          ctx.reply("You are now logged in!");
          delete sessions[ctx.from.id];
        } catch (error) {
          ctx.reply("Verification failed. Please try again.");
        }
      } else {
        ctx.reply(
          "No active session found. Please start the login process again."
        );
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    ctx.reply("Failed to start login process.");
  }
};

module.exports = handleLoginCommand;
