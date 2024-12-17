import { NextFunction, Request, Response } from "express";
import prisma from "../prisma"; // Importing Prisma client instance for database operations
import { ApiError } from "../utils/ApiError";


/**
 * @description This function fetches paginated tasks from the "task" table using Prisma's `findMany` method.
 * It takes `page` and `limit` as query parameters for pagination.
 */
export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;
  
    try {
      const [tasks, totalTasks, completedTasks] = await Promise.all([
        prisma.task.findMany({
          skip,
          take: limit,
          orderBy: { id: "desc" },
        }),
        prisma.task.count(),
        prisma.task.count({
          where: { completed: true },
        }),
      ]);
  
      res.json({
        tasks,
        totalTasks,
        completedTasks,
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
      });
    } catch (error) {
      next(new ApiError(500, "Error fetching paginated tasks"));
    }
  };
  


/*
 * @description This function queries the "task" table for a task with the specified ID
 * using Prisma's `findUnique` method. It returns the task's `title` and `color` fields.
 */

export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
  
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
        select: { id: true, title: true, color: true },
      });
  
      if (!task) {
        throw new ApiError(404, "Task not found");
      }
  
      res.json(task);
    } catch (error) {
      next(error instanceof ApiError ? error : new ApiError(500, "Error fetching task by ID"));
    }
};



/**
 * @description This function creates a new task in the "task" table using Prisma's `create` method.
 * It expects the request body to include `title` and `color` fields.
 */

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, color } = req.body;
  
    if (!title || !color) {
      return next(new ApiError(400, "Title and color are required fields"));
    }
  
    try {
      const newTask = await prisma.task.create({ data: { title, color } });
      res.status(201).json(newTask);
    } catch (error) {
      next(new ApiError(500, "Error creating task"));
    }
};

/**
 * @description This function updates an existing task in the "task" table using Prisma's `update` method.
 * It identifies the task by its ID and applies the updates provided in the request body.
 */

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
  
    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, color, completed },
      });
  
      res.json(updatedTask);
    } catch (error) {
      next(new ApiError(404, "Task not found or error updating task"));
    }
};

/**
 * @description This function deletes a task from the "task" table using Prisma's `delete` method.
 * It identifies the task by its ID and removes it from the database.
 */

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    try {
      await prisma.task.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      next(new ApiError(404, "Task not found or error deleting task"));
    }
  };