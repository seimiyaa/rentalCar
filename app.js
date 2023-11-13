const path = require("path");
const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql2");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "express_db",
});

const users = [
  {
    id: 1,
    name: "鈴木 さくら",
    hiragana: "すずき さくら",
    address: "東京都渋谷区桜丘町1-2-3",
    phoneNumber: "03-1234-5678",
    startDate: "2023年10月15日",
    endDate: "2023年10月17日",
  },
  {
    id: 2,
    name: "山田 たけし",
    hiragana: "やまだ たけし",
    address: "大阪府大阪市中央区花園町4-5-6",
    phoneNumber: "06-9876-5432",
    startDate: "2023年11月10日",
    endDate: "2023年11月20日",
  },
  {
    id: 3,
    name: "田中 ゆりこ",
    hiragana: "たなか ゆりこ",
    address: "京都府京都市東山区鴨川町7-8-9",
    phoneNumber: "075-1111-2222",
    startDate: "2023年10月5日",
    endDate: "2023年10月9日",
  },
  {
    id: 4,
    name: "高橋 はるか",
    hiragana: "たかはし はるか",
    address: "福岡県福岡市博多区中洲1-2-3",
    phoneNumber: "092-3333-4444",
    startDate: "2023年9月20日",
    endDate: "2023年9月25日",
  },
  {
    id: 5,
    name: "佐藤 けんた",
    hiragana: "さとう けんた",
    address: "北海道札幌市中央区大通西1-2-3",
    phoneNumber: "011-5555-6666",
    startDate: "2023年10月12日",
    endDate: "2023年10月17日",
  },
];

app.get("/", (req, res) => {
  const vehiclesSql = "SELECT * FROM vehicles";
  const carusersSql = "SELECT * FROM carusers";

  con.query(vehiclesSql, function (errVehicles, vehicles, fieldsVehicles) {
    if (errVehicles) throw errVehicles;

    con.query(carusersSql, function (errCarusers, carusers, fieldsCarusers) {
      if (errCarusers) throw errCarusers;

      res.render("index", {
        vehicles: vehicles,
        carusers: carusers,
      });
    });
  });
});

app.post("/", (req, res) => {
  const vehiclesSql = "INSERT INTO vehicles SET ?";
  con.query(
    vehiclesSql,
    req.body,
    function (errVehicles, vehicles, fieldsVehicles) {
      if (errVehicles) throw errVehicles;
      console.log("Inserted into vehicles:", vehicles);

      const carusersSql = "INSERT INTO carusers SET ?";
      con.query(
        carusersSql,
        req.body,
        function (errCarusers, carusers, fieldsCarusers) {
          if (errCarusers) throw errCarusers;
          console.log("Inserted into carusers:", carusers);

          res.redirect("/");
        }
      );
    }
  );
});



app.get("/edit/:caruserscol?", (req, res) => {
  const Sql = "SELECT * FROM carusers WHERE caruserscol = ?";
  con.query(Sql, [req.params.caruserscol], function (err, result, fields) {
    if (err) {
      console.error("Error executing query:", err);
      throw err;
    }
    console.log(result);
    res.render("edit", {
      carusers: result,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
console.log("テスト");
