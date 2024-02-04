import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get settings
router.get("/", async (req, res) => {
    let collection = await db.collection("settings");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

// get setting by name
router.get("/:name", async (req, res) => {
    const query = { name: req.params.name };
    let collection = await db.collection("settings");
    let result = await collection.findOne(query); 
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

// add setting
router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        goalCalories: req.body.goalCalories,
        goalProtein: req.body.goalProtein,
        goalCarbs: req.body.goalCarbs,
        goalFat: req.body.goalFat,
    };
    let collection = await db.collection("settings");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });

// update settings
router.patch("/:name", async (req, res) => {
    const query = { name: req.params.name };
    const updates =  {
      $set: {
        goalCalories: req.body.goalCalories,
        goalProtein: req.body.goalProtein,
        goalCarbs: req.body.goalCarbs,
        goalFat: req.body.goalFat,
      }
    };
    let collection = await db.collection("settings");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  });

  export default router;