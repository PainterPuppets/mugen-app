import { Request, Response } from "express";
import { storage } from "../storage";
import { insertUserSchema } from "@shared/schema";

export async function getUsers(req: Request, res: Response) {
  try {
    // In a real application, you would fetch users from a database
    // For now, we'll simulate some dummy users since this is just a template
    const usersList = [
      { id: 1, username: "johndoe", password: "********" },
      { id: 2, username: "janedoe", password: "********" }
    ];
    
    res.json(usersList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const user = await storage.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    // Validate request body using zod schema
    const validatedData = insertUserSchema.safeParse(req.body);
    
    if (!validatedData.success) {
      return res.status(400).json({ 
        message: "Invalid request data", 
        errors: validatedData.error.format() 
      });
    }
    
    // Create user in storage
    const newUser = await storage.createUser(validatedData.data);
    
    // Don't send password in response
    const { password, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
