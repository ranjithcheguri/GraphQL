var express = require('express');
var router = express.Router(); // capital R
const mongoClient = require('mongodb').MongoClient;
var kafka = require('../kafka/client');

router.post('/message', (req, res) => {
    console.log(req.body);
    kafka.make_request('post_message', req.body, function (err, results) {
        console.log("mongoDB.js", 'in result');
        console.log(results);
        if (err) {
            console.log("mongoDB.js", "Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("mongoDB.js", "Inside else");
            // res.json({
            //     updatedList: results
            // });
            res.end(results);
        }
    });
})

module.exports = router;