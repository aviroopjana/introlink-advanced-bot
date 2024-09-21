const getUser = async (mtprotoCall) => {
  try {
    // returns the user info
    const user = await mtprotoCall("users.getFullUser", {
      id: {
        _: "inputUserSelf",
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

module.exports = { getUser };