const { mtprotoCall } = require("../services/mtprotoService");
const handleMessage = require("./messageHandler");

let lastPts = 0;

const initPts = async () => {
  const state = await mtprotoCall("updates.getState", {});
  if (!state || !state.pts) {
    console.error("Failed to initialize PTS: state or PTS is undefined");
    return;
  }
  lastPts = state.pts;
  console.log("PTS initialized:", lastPts);
};

const trackOutgoingMessages = async () => {
  console.log("Checking for new updates...");
  const difference = await mtprotoCall("updates.getDifference", {
    pts: lastPts,
    date: Math.floor(Date.now() / 1000),
    qts: 0,
  });

  console.log('difference: ', difference );

  // Check if difference is defined and contains state
  if (!difference || !difference.state) {
    console.error("No new updates available at the moment.");
    return;
  }

  // Update last known PTS
  if (difference.state && difference.state.pts) {
    lastPts = difference.state.pts;
  } else {
    console.error("Error: PTS is undefined in the state");
    return;
  }

  if (difference.new_messages && difference.new_messages.length > 0) {
    difference.new_messages.forEach(async (message) => {
        if (message.out) {
            // Check if it's an outgoing message
  
            const peerId = message.peer_id;
            if (peerId && peerId._ === "peerUser") {
              const userId = peerId.user_id;
              const userInfo = difference.users.find(
                (user) => user.id === userId
              );
              if (userInfo) {
                await handleMessage(message, userInfo);
                // console.log(difference);
                // console.log(userInfo);
              } else {
                console.error("User info not found in the response");
              }
            }
          }
    });
  }
};

module.exports = { initPts, trackOutgoingMessages };
