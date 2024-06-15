const express = require('express');
const router = express.Router();
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    secure: true,
});

router.post('/upload',upload.single('file'),async (req,res)=>{
    const file = req.file;
    try{
        const result = await cloudinary.uploader.upload(file.path, {
            use_filename: false,
            unique_filename: true,
            folder: 'ecoTokens',
        });
        console.log(result);
        res.status(200).json({
            message: 'File uploaded successfully',
            url: result.url,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: 'Error in uploading file',
        });
    }
});

module.exports = router;