import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15* 24 * 60 * 60 * 1000,  //This is just 15ms, we cannot write it as 15ms directly.
        httpOnly: true,  //prevent XSS attacks cross-site scripting attacks (we add this so cookies not accessible using javascript by anyone.)
        sameSite: "strict",  //CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",    //show false in development, but true while production
    });
};

export default generateTokenAndSetCookie;