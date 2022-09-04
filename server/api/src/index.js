import "dotenv/config";
import express from "express";
import cors from "cors";
import userController from "./controllers/userController.js";
import adminController from "./controllers/adminController.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/storage/files", express.static("storage/files"));
app.use("/storage/users", express.static("storage/users"));
app.use("/storage/communities", express.static("storage/communities"));
app.use(userController);
app.use(adminController);

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
