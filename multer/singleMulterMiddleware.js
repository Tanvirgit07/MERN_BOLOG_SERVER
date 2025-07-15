const multer = require('multer');
const storage = multer.diskStorage({
    // 1.step one distination
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    // 2.set fileName
    filename: function (req, file, cb) {
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null, fileName);
    }

})


const fileFilter = (req,file,cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null, true);
    }else{
        cb(new Error("Only image files are allowed"), false)
    }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})



module.exports = upload;

