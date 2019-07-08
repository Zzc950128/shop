var express = require("express");
var app = express();
app.get("/", function(req, res) {
        res.send("This is api");
});
app.listen(3002, function() {
        console.log("Server running at 3002 port");
});

