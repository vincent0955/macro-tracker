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

// get single entry
router.get("/:id", async (req, res) => {
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

export default router;