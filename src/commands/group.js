const { mtprotoCall } = require("../services/mtprotoService");

const createGroup = async (userId, accessHash, groupName) => {
  try {
    const result = await mtprotoCall("messages.createChat", {
      users: [
        {
          _: "inputUser",
          user_id: userId,
          access_hash: accessHash,
        },
      ],
      title: groupName,
    });
    console.log("Group created:", result);

    const groupId = result.chats[0].id;

    const peer = {
      _: "inputPeerChat",
      chat_id: groupId,
    };

    // Add a link to the IntroLink bot in the group description
    await mtprotoCall("messages.editChatAbout", {
      peer: peer,
      about:
        "Welcome to the group! Check out the IntroLink bot: https://t.me/IntroLinkBot",
    });

    // Generate an invite link for the group
    const inviteLinkResult = await mtprotoCall("messages.exportChatInvite", {
      peer: peer,
      expire_date: 0,
      usage_limit: 0,
    });

    const inviteLink = inviteLinkResult.link;
    console.log("Generated invite link:", inviteLink);

    return inviteLink;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

module.exports = createGroup;
