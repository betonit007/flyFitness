const express = require('express')
const path = require('path')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({  //initialization our storage engine, we need to create an object with two functions - 1.) destination - where we want the files and 2.) filename - what we want to call it
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) //path.extname get the original file extension type (ie: jpg, png, etc...)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/ // what type of files we will except
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase()) // this will return a boolean to see if the name matches.
    const mimetype = filetypes.test(file.mimetype) //it has to have one of the file types listed above

    if(extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images Only')
    }
}

const upload = multer({ //passing in as middleware to our route 
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => { // set multer to just accept a single image
    res.send(`${req.file.path}`)
})

module.exports = router