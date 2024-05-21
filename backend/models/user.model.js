import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male","female"],
    },
    profilePic:{
        type: String,
        default: "",            //by default it is empty.
    }, 
//createdAt, updatedAt   //MongoDB created these fields for us. {ex: Member since <createdAt>}
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;


//models are created to take data of users