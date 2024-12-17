import express from "express";
import router from "./routes/tasks";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(
    cors({
      origin: "http://localhost:3000", // 
      methods: ["GET", "POST", "PUT", "DELETE"], 
    })
);

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Todo List App!");
})

app.use("/tasks", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})