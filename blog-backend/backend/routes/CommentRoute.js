const router = require("express").Router();

const CommentController = require("../controllers/CommentController");






router.post('/',CommentController.postComment)
router.get('/',CommentController.getComments)






module.exports = router;