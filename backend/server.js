import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

console.log("PORT is ", process.env.PORT)


//middleware
app.use(cors({origin: "http://localhost:5173", credentials: true }));
app.use(express.json());;
app.use(cookieParser());

// Sign Up
app.post("/api/signup",async (req, res) => {
    const { username, password, email } = req.body;

    try {
        if (!username || !email || !password) {
            throw new Error("All fields are required");
        }

     const emailExists = await User.findOne({email});

     if(emailExists){
        return res.status(400).json({message: "Email already exists."})
     }

     const usernameExists = await User.findOne({username});
     if(usernameExists){
        return res.status(400).json({message: "Username is taken, try another name." });
     }

     // Hashing password using bcryptjs
     const hashedPassword = await bcryptjs.hash(password, 10);

     const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
     });



     // JWT token generation 
     if(userDoc) {
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
     }

     return res.status(200).json({user: userDoc, message: "User created successfully."});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Log In
app.post("/api/login",async (req, res) => {
    const {email, password} = req.body;

    try {
        const userDoc = await User.findOne({email});

        if(!userDoc) {
            return res.status(400).json({message: "Please check your email or password" });
        }

        const isPasswordValid = await bcryptjs.compareSync(password, userDoc.password);

        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid credentials." });
        }

        // jwt
        if(userDoc) {
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
    
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
         }
    
         return res.status(200).json({user: userDoc, message: "Logged in successfully."});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
});

// Fetching data
app.get("/api/fetch-user", async (req, res) => {
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Invalid token." });
        }

        const userDoc = await User.findById(decoded.id).select("-password");

        if(!userDoc) {
            return res.status(400).json({ message: "User not found." });
        }

        res.status(200).json({ user: userDoc });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Logout 
app.post("/api/logout", async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "You have successfully logged out" });
});

app.listen(PORT,async () => {
    await connectToDB();
    console.log("Server is running on PORT: " + PORT)
})