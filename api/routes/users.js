import express from "express";
import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkuser/:id", verifyToken, (req, res, next) => {
//     res.send("hello user, you are logged in")
// })

// router.get("/checkauthentication", verifyUser, (req, res, next) => {
//     res.send("hello user, you are logged in and you can delete you account")
// })
// router.get("/checkadmin/:id", verifyAdmin(req, res, next) => {
//         res.send("hello admin, you are logged in and you can delete all accounts")
//     })
//Update

router.put("/:id", verifyUser, updateUser);

//Delete
router.delete("/:id", verifyUser, deleteUser);

//GET

router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);


export default router;