const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const Post = require('../schema/Post');
const path = require('path');

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(fileUpload());

router.post("/add", (req, res) => {
    // console.log(req.files.image_file); // image_file : --> is the ( KEY ) for -> files we have set up in the frontend 
    const {caption} = req.body; // capturing body other than files
    const {image_file} = req.files; // req.files : is an Object that will have all the files , capturing here
    image_file.mv("./uploads/"+image_file.name, async (err) => { // concatinating relative path with file-name like : ./uploads/+image_file.name
        if(err) {
            res.json({
                message: err
            })
        }else {
            try {
                const data = await Post.create({
                    ...{caption},image_file: image_file.name
                })
                 res.json({
                    message: "success",
                    data
                })
            }catch(err) {
                 res.json({
                    message: err.message
                    
                })
            }
        }
    }); // uploads is the folder where i will push file and image_file.name is the name of image with which i want to save the file

})


router.get("/all", async (req, res) => {
    try {
        const data = await Post.find();
        return res.json({
            status: "success",
            data
        })
    }catch(err) {
        return res.json({
            status: 'failed'
        }) 
    }
})

router.get('/images/:filename', async (req, res) => {
    res.sendFile(path.join(__dirname, `../uploads/${req.params.filename}`))
})

module.exports = router;