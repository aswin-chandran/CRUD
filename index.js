const express = require("express");
const data = require("./data/data.json");
const morgan = require("morgan");
const fs = require('node:fs');
const { error } = require("node:console");

// const jFile = fs.readFileSync('./data/data.json','utf-8')
// console.log(jFile);



const app = express();
const PORT = 3030;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//GET-----------

app.get("/hospital", (req, res) => {

  fs.readFile('./data/data.json','utf-8',(error,data)=>{
if(error){
  console.log(error)
}
else{
  res.send(data);
  console.log(data)
}

  })
  // res.json(data);
});

//POST-----------

app.post("/new", (req, res) => {
  data.push(req.body);
  res.send(data);
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

// // POST Method----------

// router.post('/add',(req,res)=>{
//   console.log(req.body);
//   array1.push(req.body);
//   res.send(array1)
// })

// // PUT/Update Method-----------

// router.put('/update',(req,res)=>{
//   console.log(req.body);
//   array1.splice(0,1,req.body);
//   res.send(array1)
// })

// //Deleted Method-----------
// router.delete('/remove',(req,res)=>{
//   array1.pop();
//   res.send(array1)
// })