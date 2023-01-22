const express = require('express');
const router  = express.Router();
const {body, validationResult} = require('express-validator')
const logModel = require('../model/regeModel')

const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'PURU'

router.post("/login", body("email").isEmail(),
                            body('password').isLength({min:6}),
                            async (req, res)=>{
                                const errors = validationResult(req)
                                if(!errors.isEmpty()){
                                    return res.status(404).json({
                                        status:"failed",
                                        errors:errors.array()
                                    })
                                }
                                const isexist = await logModel.find({email:req.body.email})
                                if(!isexist.length){
                                    return res.status(404).json({
                                        status:"Failed",
                                        message:"Email does not found"
                                    })
                                }
                                else{
                                    console.log(isexist)
                                    bcrypt.compare(req.body.password, isexist[0].password).then(function(result) {
                                        if(!result){
                                            return res.status(404).json({
                                                status:"Failed",
                                                message:"Password incorrect"
                                            })
                                        }
                                        else{
                                            
                                            const token = jwt.sign({
                                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                                data: isexist[0]._id
                                            }, secret)
                                            return res.status(200).json({
                                                status:"Success",
                                                userid:isexist[0]._id,
                                                Authorization:token
                                            })
                                        }
                                    });
                                }
                                
                                
                            })
module.exports = router;