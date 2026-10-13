const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rock_zenekarok_70s"
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Kapcsolódva az adatbázishoz!");
    }
});

app.listen(3000, () => {
    console.log("A szerver fut a 3306-es porton");
});

app.get("/api/zenekar", (req, res) => {
    db.query(
        "SELECT * FROM zenekarok",
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        }
    );
});

app.get("/api/stilus", (req, res) => {
    db.query(
        "SELECT stilus_neve FROM stilusok",
        (err, result) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(result);
            }
        }
    );
});
