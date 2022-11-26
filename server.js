var expressKuch = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql");

var path = require("path");
const { report } = require("process");
var app = expressKuch();
//         port   behavior
app.listen(2003, function () {
    console.log("Server Started");
})

app.use(expressKuch.static("public"));  //imp for using ajax....


var dbConfiguration = {
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
}

var refDB = mysql.createConnection(dbConfiguration);
refDB.connect(function (errKuch) {

    if (errKuch)
        console.log(errKuch);
    else
        console.log("Connected to Server............");
})

app.get("/signup", function (req, resp) {

    var dataAry = [req.query.mail, req.query.pass];
    refDB.query("insert into users values(?,?)", dataAry, function (err, result) {
        if (err)
            resp.send(err);
        else
            resp.send("inserted successfully");

    })
})

app.get("/chklogin", function (req, resp) {
    var ary = [req.query.txtemail, req.query.txtpass];

    refDB.query("select * from users where email=? and pwd=? ",ary, function(err, result) {

        if (err) {
            resp.send(err);
        }
        else {
            resp.send(result);
        }
    })
})
