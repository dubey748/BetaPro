import express from "express";
import { countByCity, countByType, createHotel, getHotelRooms } from "../controllers/hotel.js";
import { updateHotel } from "../controllers/hotel.js";
import { deleteHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getHotels } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";



const router = express.Router();

//Create

router.post("/", verifyAdmin, createHotel);

//Update

router.put("/:id", verifyAdmin, updateHotel);

//Delete
router.delete("/:id", verifyAdmin, deleteHotel);

//GET

router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms);

export default router;