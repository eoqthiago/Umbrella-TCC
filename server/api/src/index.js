import "dotenv/config";
import express from "express";
import cors from "cors";
import userController from "./controllers/userController.js";
import adminController from "./controllers/adminController.js";
import communityController from "./controllers/communityController.js";
import swaggerUi from "swagger-ui-express";
import SwaggerDocs from "./swagger.json" assert { type: "json" };

const app = express();

app.use(express.json());
app.use(cors());
app.use("/storage/files", express.static("storage/files"));
app.use("/storage/users", express.static("storage/users"));
app.use("/storage/communities", express.static("storage/communities"));
app.use(userController);
app.use(adminController);
app.use(communityController);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs));

app.listen(process.env.PORT, () => console.log(`Server listening on ${process.env.PORT}`));
