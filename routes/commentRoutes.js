const express=require('express')
const commentController=require('../controllers/commentController')
const middleWare=require('../middleware/AuthVerify')
const router = express.Router();

router.post('/comment',commentController.createComment)
module.exports = router;
