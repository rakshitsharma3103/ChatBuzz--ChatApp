import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password");  //It means find every user in database except User whose userId is not equal to loggedInUserId. Because we don't want to see ourself on the sidebar we just want to see all other user or friends.
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({ error: "Internal Server error"});
    }
}