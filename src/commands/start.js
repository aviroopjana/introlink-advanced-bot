const handleStartCommand = (ctx) => {
  const welcomeMessage =
    `Hello! I'm your new Telegram assistant. This is a demo of IntroLink Bot\n\n` +
    `As a starter, here's what I can do for you:\n` +
    `/login - Authenticate with Telegram.\n` +
    `/group - Create a group chat with the person you're DMing.\n` +
    `\nCreated by Aviroop Jana`;
  ctx.reply(welcomeMessage);
};

module.exports = handleStartCommand;
