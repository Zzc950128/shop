var express = require("express");
var app = express();
app.get("/", function(req, res) {
        res.send("This is api");
});
app.listen(3001, function() {
        console.log("Server running at 3001 port");
});

