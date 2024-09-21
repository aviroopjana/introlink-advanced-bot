const { mtprotoCall } = require("../services/mtprotoService");
const createGroup = require("../commands/group");

// Function to handle incoming messages
const handleMessage = async (message, userInfo) => {
  if (message.message.startsWith("/group")) {
    const peerId = message.peer_id;
    if (peerId && peerId._ === "peerUser") {
      const userId = peerId.user_id;

      if (userInfo) {
        const accessHash = userInfo.access_hash;

        const myData = await mtprotoCall("users.getFullUser", {
          id: { _: "inputUserSelf" },
        });

        const myFirstName = myData.users.find((user) => user.self).first_name;

        // Extract group name from message or use default format
        const commandParts = message.message.split(" ");
        const groupName =
          commandParts.slice(1).join(" ") ||
          `${myFirstName} <> ${userInfo.first_name}`;

        // Update the message to indicate processing
        const processingMessage = await mtprotoCall("messages.sendMessage", {
          peer: {
            _: "inputPeerUser",
            user_id: userId,
            access_hash: accessHash,
          },
          random_id:
            BigInt(Date.now()) * BigInt(1000) +
            BigInt(Math.floor(Math.random() * 1000)),
          message: "/group (@IntroLink_Bot processing...)",
        });

        try {
          const inviteLink = await createGroup(userId, accessHash, groupName);

          // Update the message with the invite link
          await mtprotoCall("messages.editMessage", {
            peer: {
              _: "inputPeerUser",
              user_id: userId,
              access_hash: accessHash,
            },
            id: processingMessage.id,
            message: `Group automatically created by @IntroLink_Bot\n\nJoin the Group here: ${inviteLink}`,
          });
        } catch (error) {
          await mtprotoCall("messages.editMessage", {
            peer: {
              _: "inputPeerUser",
              user_id: userId,
              access_hash: accessHash,
            },
            id: processingMessage.id,
            message: "Error creating group. Please try again later.",
          });
        }
      }
    }
  }
};

module.exports = handleMessage;
