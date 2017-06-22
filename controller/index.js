var express=require('express');
var router=express.Router();
router.use('/smartcurrency',require('./insert'));
module.exports=router;