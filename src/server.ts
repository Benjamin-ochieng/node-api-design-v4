import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { createNewUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
  res.json({ messaage: "Hello from express" });
});

app.post("/user", createNewUser);
app.post("/signin", signin);
app.use("/api", protect, router);
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
         res.status(500).json({ message: "oops something went wron" });

  }
});

export default app;
