import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all entries
router.get("/", async (req, res) => {
  let collection = await db.collection("entries");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// get all entries for today
router.get("/today", async (req, res) => {
  let collection = await db.collection("entries");
  let today = new Date();
  today.setHours(0,0,0,0);
  let results = await collection.find( { dateadded: { $gt: today } } ).sort({_id:-1}).toArray();
  
  res.send(results).status(200);
});

// get all macros for today
router.get("/today/sum", async (req, res) => {
  let collection = await db.collection("entries");
  let today = new Date();
  today.setHours(0,0,0,0);
  let results = await collection.find( { dateadded: { $gt: today } } ).sort({_id:-1}).toArray();
  var macros = [0, 0, 0, 0];
  for (var i = 0; i < results.length; i++) {
    macros[0] += results[i].calories;
    macros[1] += results[i].protein;
    macros[2] += results[i].carbs;
    macros[3] += results[i].fat;
  }
  res.send(macros).status(200);
});

// get all entries for not today
router.get("/excludetoday", async (req, res) => {
  let collection = await db.collection("entries");
  let today = new Date();
  today.setHours(0,0,0,0);
  let results = await collection.find( { dateadded: { $lt: today } } ).sort({_id:-1}).toArray();
  res.send(results).status(200);
});

// get all entries for this week
router.get("/week", async (req, res) => {
  let collection = await db.collection("entries");
  var oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0,0,0,0);
  let results = await collection.find( { dateadded: { $gt: oneWeekAgo } } ).sort({_id:-1}).toArray();
  res.send(results).status(200);
});


// get single entry
router.get("/id/:id", async (req, res) => {
  let collection = await db.collection("entries");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// add
router.post("/", async (req, res) => {
  var currentDate = new Date();
  let newDocument = {
    name: req.body.name,
    calories: req.body.calories,
    protein: req.body.protein,
    carbs: req.body.carbs,
    fat: req.body.fat,
    dateadded: currentDate
  };
  let collection = await db.collection("entries");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// update entry by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      calories: req.body.calories,
      protein: req.body.protein,
      carbs: req.body.carbs,
      fat: req.body.fat,
    }
  };
  let collection = await db.collection("entries");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// delete entry by id
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("entries");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

// search entries using entry name (starts-with)
router.get("/name/:name", async (req, res) => {
  let collection = await db.collection("entries");

  let str = "^".concat(req.params.name)
  let re = new RegExp(str);

  let result = await collection.find({name: { $regex: re } } ).toArray();;

  res.send(result).status(200);
});

/***  this function returns info for the weekly reports(data.js) component
          - get todays day of the week
          - organize the week's data starting from sunday into the bar chart format; 7x3 array
*/
router.get("/weeklyreport", async (req, res) => {
  let collection = await db.collection("entries");
  let today = new Date();
  let day = today.getDay();
  let endDay = new Date();
  endDay.setDate(today.getDate());
  today.setHours(0,0,0,0);
  
  let results = await collection.find( { dateadded: { $gt: today } } ).sort({_id:-1}).toArray();
  var macros = [[0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]];


  console.log(new Date());

  while (day >= 0) {
    
    for (var i = 0; i < results.length; i++) {
      macros[0][day] += results[i].calories;
      macros[1][day] += results[i].protein;
      macros[2][day] += results[i].carbs;
      macros[3][day] += results[i].fat;
    }
    // console.log(today, endDay);
    endDay.setTime(today.getTime());
    today.setDate(today.getDate() - 1);    

    results = await collection.find( { dateadded: { $gt: today, $lt: endDay } } ).sort({_id:-1}).toArray();
    
    day--;
  }
  
  
  res.send(macros).status(200);
});

export default router;