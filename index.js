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
    "./data/data.json",
    JSON.stringify(data),
    
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New data added successfully ");
        console.log(data);
      }
    }
  );
});

//PUT------------

app.put(`/update`, (req, res) => {

const x = data.length-1;
  data.splice(x, 1, req.body);
  res.send(data);
  console.log(data);

  fs.writeFile(
    "./data/data.json",
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated data successfully ");
      }
    }
  );



});

//Delete ---------

app.delete(`/delete`, (req, res) => {
  data.pop();
  res.send(data);

  fs.writeFile(
    "./data/data.json",
    JSON.stringify(data),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted data successfully ");
      }
    }
  );


});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
