const router = require("express").Router();

const PostController = require("../controllers/PostController")

const multer = require("multer");

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDirectory = path.join(__dirname, '../uploads/');
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage : storage });

router.post('/post',upload.single('file'),PostController.registerPost);



router.get('/get',PostController.getPosts);


router.get('/get/:id',PostController.getPostById)




module.exports = router;

