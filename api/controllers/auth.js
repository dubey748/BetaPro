import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { createError } from "../utils/error.js";
export const register = async(req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
           ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

export const login = async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));
        //for password incrypted
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        //jwt token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
        //for hide password and admin
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true, // use beaause it does'nt allow client to reach here
            })
            .status(200)
            .json({details:{...otherDetails}, isAdmin });
    } catch (err) {
        next(err);
    }
};