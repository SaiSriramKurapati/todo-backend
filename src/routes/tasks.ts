import express from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasksController";
const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);

export default router;