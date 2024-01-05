import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import entries from "./routes/record.mjs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/entries", entries);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
