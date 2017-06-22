var mysql = require('mysql');
var express = require('express');
var router=express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

function BD() {
    var connection = mysql.createConnection({
        user: 'root',
        password: 'rpqb123',
        host: 'localhost',
        //port: 3306,
        database: 'smartcurrency_dev'
    });
    return connection;
}

router.post("/user/create", function(req, res) {
    var objBD = BD();
    console.log(req.body.email)
objBD.connect();
    var user = {
        email :req.body.email,
        password: req.body.password,
        ethaddress:req.body.ethaddress
    };
//console.log(user.username)
    objBD.query('INSERT INTO user_detail SET ?', user, function(error) {
        return res.json({
message:'success',
error:false
});
});
}),

router.get("/user/get", function(req, res) {
    var objBD = BD();
objBD.connect();

    objBD.query('select * from user_detail', function(error,vals,fields) {
        var temp=JSON.stringify(vals);

        var userdetail = JSON.parse(temp);
       return res.json({
users:userdetail,
error:false
});
});
});
module.exports = router;