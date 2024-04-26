const express = require("express");
const router = express.Router();

const Location = require("../models/Locations");

router.get("/getlocations", async(req,res)=>{

    try {
        const locations = await Location.find({})
        res.send(locations)
    } catch (error) {
        return res.status(400).json({ error })
    }

});
router.get("/getAllBookings", async(req,res)=>{

    try {
        const bookiongs = await Location.find()
        res.send(bookiongs)
    } catch (error) {
        return res.status(400).json({ error })
    }

});

// admin screen add new locations

router.post("/addlocation",async(req,res) => {
    try {
        const newlocation = new Location(req.body)
        await newlocation.save()
        res.send("New Room Added Successfully !")
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports=router;