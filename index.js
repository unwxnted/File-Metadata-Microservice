const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', upload.single('upfile'), (req, res) => {
    try {
        res.json({
            "name": req.file.originalname,
            "type": req.file.mimetype,
            "size": req.file.size
        });
    } catch (err) {
        res.send(400);
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})