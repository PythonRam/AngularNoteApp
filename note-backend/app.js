var express = require("express");
var bodyParser = require("body-parser");
const cors = require('cors');


var app = express();
var fs = require("fs");


app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username == "hithesh@30.com" && password == "15times2") {
        res.status(200);
        res.send({
            success: true,
            uid: "14090"
        });
    } else {
        res.status(200);
        res.send({
            success: false,
            uid: null
        });
    }
});

app.get("/notes", (req, res) => {
    var notes = JSON.parse(fs.readFileSync("notes.json"));
    res.status(200);
    res.send({
        success: true,
        notes: notes
    });
});

app.post("/notes", (req, res) => {
    var notes = JSON.parse(fs.readFileSync("notes.json"));
    console.log(req.body);
    notes.push(req.body)
    var new_notes = JSON.stringify(notes, null, 2);
    fs.writeFileSync("notes.json", new_notes);
    res.status(200);
    res.send({
        success: true
    });
});

app.put('/notes/:id', (req, res) => {
    let id = req.params.id;
    var notes = JSON.parse(fs.readFileSync("notes.json"));
    notes.forEach(element => {
        if (element.id == id) {
            element.note = req.body.note;
        }
    });
    var new_notes = JSON.stringify(notes, null, 2);
    fs.writeFileSync("notes.json", new_notes);
    res.status(200);
    res.send({
        success: true
    });
});

app.get('/notes/:id', (req, res) => {
    let id = req.params.id;
    var notes = JSON.parse(fs.readFileSync("notes.json"));
    let flag = false;
    notes.forEach(element => {
        if (element.id == id) {
            flag = true;
            res.status(200);
            res.send({
                success: true,
                notes: element
            });
        }
    });
    if (!flag) {
        res.status(200);
        res.send({
            success: false,
            notes: null
        });
    }
});

app.delete('/notes/:id', (req, res) => {
    let id = req.params.id;
    var notes = JSON.parse(fs.readFileSync("notes.json"));
    notes = notes.filter((note) => note.id != id);
    var new_notes = JSON.stringify(notes, null, 2);
    fs.writeFileSync("notes.json", new_notes);
    res.status(200);
    res.send({
        success: true
    });
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});