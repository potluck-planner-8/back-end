const router = require('express').Router();
const {restricted} = require("../auth/auth-middleware");
const {validateId} = require("../potlucks/potluck-middleware")

router.get("/", async (req, res, next)=>{
    try{
        res.status(200).json({message:"reached GET /api/invite/"})
    }catch(er){
        next(er)
    }
})

router.get("/:invite_id", async (req, res, next)=>{
    try{
        const invite_id = req.params.invite_id;
        res.status(200).json({message:`reached GET /api/invite/${invite_id}`});
    }catch(er){
        next(er)
    }
})

router.post("/", async (req, res, next)=>{
    try{
        res.status(200).json({message:`reached POST /api/invite/`});
    }catch(er){
        next(er)
    }
})

router.put("/:invite_id", async (req, res, next)=>{
    try{
        const invite_id = req.params.invite_id;
        res.status(200).json({message:`reached PUT /api/invite/${invite_id}`});
    }catch(er){
        next(er)
    }
})

router.delete("/:invite_id", async (req, res, next)=>{
    try{
        const invite_id = req.params.invite_id;
        res.status(200).json({message:`reached DELETE /api/invite/${invite_id}`});
    }catch(er){
        next(er)
    }
})


module.exports = router;

