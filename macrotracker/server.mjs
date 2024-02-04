import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import entries from "./routes/record.mjs";
import settings from "./routes/settings.mjs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/entries", entries);
app.use("/settings", settings);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
