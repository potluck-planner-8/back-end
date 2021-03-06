const router = require('express').Router();
const {restricted} = require("../auth/auth-middleware");
const {validateId} = require("../potlucks/potluck-middleware")
const inviteModel = require("./invite-model");

router.get("/", async (req, res, next)=>{
    try{
        const invites = await inviteModel.getAll();
        res.status(200).json(invites);
    }catch(er){
        next(er)
    }
})

router.get("/:invite_id", async (req, res, next)=>{
    try{
        const invite_id = req.params.invite_id;
        const invite = await inviteModel.getByInviteId(invite_id);
        res.status(200).json(invite);
    }catch(er){
        next(er)
    }
})

router.post("/", async (req, res, next)=>{
    try{
        const {user_id, potluck_id, organizer_id, description} = req.body;
        
        const newInviteObject = {user_id, potluck_id, organizer_id, description : (description === undefined?"no description" : description), accepted:false};
        
        console.log("newInviteObject = ", newInviteObject);

        const arrayOfInvite = await inviteModel.addInvite(newInviteObject);

        res.status(201).json(arrayOfInvite[0]);

    }catch(er){
        next(er)
    }
})

router.put("/", async (req, res, next)=>{
    try{
        const {invite_id, user_id, potluck_id, description, accepted} = req.body;
        
        const newInviteObject = {user_id, potluck_id, description , accepted};

        // res.status(200).json({message:`reached PUT /api/invite/${invite_id}`});

        const respond = await inviteModel.updateInvite({invite_id, user_id, potluck_id, description, accepted});
        
        //when respond === 1, update was a success
        if( respond === 1){
            res.status(201).json({message:`successfully updated invite_id ${invite_id}`});
        }else{
            res.status(204).json({message: "something went wrong with update invite"});
        }

        
    }catch(er){
        next(er)
    }
})

router.delete("/:invite_id", async (req, res, next)=>{
    try{
        const invite_id = req.params.invite_id;
        const respond = inviteModel.deleteInvite(invite_id);
        res.status(200).json({message: `successfully deleted invite_id ${invite_id}`});
    }catch(er){
        next(er)
    }
})


module.exports = router;

