const express = require("express");
const router = express.Router();

const Place = require("../models/Places");

router.get("/getallplaces" , async(req,res)=>{
    try {
        const places = await Place.find({})
        res.send(places);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getPlaceById" , async(req,res)=>{

    const placesid = req.body.placesid

    try {
        const place = await Place.findOne({_id:placesid})
        res.send(place);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getPlaceByIdFood" , async(req,res)=>{

    const placesid = req.body.placesid

    try {
        const place = await Place.findOne({_id:placesid})
        res.send(place);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/addroom",async(req,res) => {
    try {
        const newroom = new Place(req.body)
        await newroom.save()
        res.send("New Room Added Successfully !")
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = router;