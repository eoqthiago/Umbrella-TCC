import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/storage/images", express.static("storage/images"));

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
