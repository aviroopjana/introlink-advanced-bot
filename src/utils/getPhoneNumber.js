const getPhoneNumber = (ctx, bot) => {
  return new Promise((resolve) => {
    ctx.telegram.sendMessage(
      ctx.chat.id,
      "Please share your contact information by pressing the button below:",
      {
        parse_mode: "Markdown",
        reply_markup: {
          one_time_keyboard: true,
          keyboard: [
            [
              {
                text: "Share Phone Number",
                request_contact: true,
              },
              {
                text: "Cancel",
              },
            ],
          ],
          force_reply: true,
        },
      }
    );

    // Listen for contact information
    const contactHandler = (ctx) => {
      if (ctx.message.contact) {
        const contact = ctx.message.contact.phone_number;
        console.log("Hello Contact", contact);
        resolve(contact);
        bot.off("contact", contactHandler);
      }
    };

    bot.on("contact", contactHandler);
  });
};

module.exports = { getPhoneNumber };
