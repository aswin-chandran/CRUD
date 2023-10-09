const express = require("express");
const data = require("./data/data.json");
const morgan = require("morgan");
const fs = require("node:fs");

const app = express();
const PORT = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//GET-----------

app.get("/hospital", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.send(JSON.parse(data));
      console.log(JSON.parse(data));
    }
  });

});

//POST-----------

app.post("/new", (req, res) => {
  data.push(req.body);
  res.send(data);

  const newdata = req.body;

  fs.writeFile(
    "./data/newdata.json",
    JSON.stringify(newdata),
    { flag: "a" },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New data successfully written in newdata.json file");
        console.log(newdata);
      }
    }
  );
});

//PUT------------

app.put(`/update`, (req, res) => {
  data.splice(0, 1, req.body);
  res.send(data);
});

//Delete ---------

app.delete(`/delete`, (req, res) => {
  data.pop();
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
