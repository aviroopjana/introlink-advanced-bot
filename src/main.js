const { bot } = require("./services/telegramService");
const handleLoginCommand = require("./commands/login");
const handleStartCommand = require("./commands/start");
const handleGroupCommand = require("./commands/group");
const { initPts, trackOutgoingMessages } = require("./utils/messageTracker");

// Bot commands
bot.start(handleStartCommand);
bot.command("login", handleLoginCommand);
bot.command("group", handleGroupCommand);


bot.launch();
console.log("Bot has started successfully and is ready to receive commands.");

// Function to initialize PTS and start tracking messages
async function startTracking() {
    console.log('Initializing PTS and starting tracking...');
    try {
        await initPts();
        console.log('PTS initialized, starting message tracking...');
        setInterval(trackOutgoingMessages, 5000);
        console.log('Started tracking messages.');
    } catch (err) {
        console.error("Error occurred while initializing tracking:", err);
    }
}

// Main function to run both operations
async function main() {
    try {
        await startTracking();
    } catch (err) {
        console.error("Error in main execution:", err);
    }
}

// Start the bot
main();
