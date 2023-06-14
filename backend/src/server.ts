import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.routes";
import notificationRouter from "./routes/notification.routes";
import msgRouter from "./routes/messages.routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

// config the app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--ROUTES--
app.use("api/users", router);
app.use("api/notification", notificationRouter);
app.use("api/messages", msgRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
