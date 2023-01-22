const express = require('express')
const router = express.Router();

const postModel = require('../model/postModel')

const bodyparser = require('body-parser')
router.use(bodyparser.json())
router.use(express.json())
router.use(express.urlencoded())
router.use(bodyparser.urlencoded())

router.get('/post', async (req, res)=>{
    const data = await postModel.create({
        title:req.body.title,
        description:req.body.description,
        user:req.userID
    })
    res.status(200).json({
        status:"success",
        data
    })
})
module.exports = router;