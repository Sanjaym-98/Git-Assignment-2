const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json())
router.use(express.urlencoded());
router.use(express.json());

const bcrypt = require('bcrypt')

const regModel = require('../model/regeModel');
const {body, validationResult} = require('express-validator')

router.post("/user",body('name').isAlphanumeric(),
                    body("email").isEmail(),
                    body('password').isLength({min:6}),
                 async (req, res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    const isdata = await regModel.find({email:req.body.email})
    if(isdata.length){
        return res.status(501).json({
            status:"failed",
            message:"Email is already exists"
        })
    }
    else{
        bcrypt.hash(req.body.password, 10).then( async function(hash) {
            // Store hash in your password DB.
            const data = await regModel.create({
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
             res.status(201).json({
            status:"Success",
            data
        })
    
        });

    }

    
    
    
    
   
})


module.exports = router;
