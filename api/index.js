import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import holtesRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
dotenv.config();
const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")

})



//midelware
app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/hotels", holtesRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);

//Error handler 

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(748, () => {
    connect();
    console.log("Connected to backend.");
});