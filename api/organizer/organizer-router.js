const router = require('express').Router();
const organizerModel = require("./organizer-model");

router.get("/", async(req, res, next)=>{
    try{
        const organizers = await organizerModel.getAll();
        res.status(200).json(organizers);
    }catch (err){
        next(err);
    }
})

router.get("/:organizer_id", async(req, res, next)=>{
    try{
        const {organizer_id} = req.params;
        const arrayOfOrganizers = await organizerModel.getById(organizer_id);
        res.status(200).json(arrayOfOrganizers[0]);
    }catch (err){
        next(err);
    }
})

router.post("/", async(req, res, next)=>{
    try{
        const {user_id} = req.body;
        const arrayOfOrganizers = await organizerModel.insert({user_id});
        res.status(201).json(arrayOfOrganizers[0]);
    }catch (err){
        next(err);
    }
})

router.delete("/:organizer_id", async(req, res, next)=>{
    try{
        const {organizer_id} = req.params;
        const respond = await organizerModel.remove(organizer_id);
        console.log("organizer_id = ", organizer_id);
        console.log("respond = ", respond);
        console.log("Boolean(respond) =  ", Boolean(respond));
        if(Boolean(respond) === false){
            res.status(202).json({message: `error occured while deleting organizer_id ${organizer_id}`});
        }else{
            res.status(201).json({message: `successfully deleted organizer_id ${organizer_id}`});
        }
        
    }catch (err){
        next(err);
    }
})

module.exports = router;