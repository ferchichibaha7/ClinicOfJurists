import { NextFunction, Request, Response } from 'express';
import { Category } from '../models/Category';
import HttpStatusCodes from 'http-status-codes';
export class CategoryController {

  // Get all categories
  public getAllCategories = (...params: [Request, Response]) => {
    const [req, res] = params;
    Category.findAll()
      .then(categories => {
        res.json({ message: "Categories retrieved", result: categories });
      })
      .catch(error => {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching categories', error });
      });
  };

  // Get category by ID
  public async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    // Fetch category by ID from the database
  }

  // Create a new category
  public async createCategory(req: Request, res: Response) {
    // Extract data from request body and create a new category in the database
  }

  // Update an existing category
  public async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    // Extract data from request body and update the category in the database
  }

  // Delete a category
  public async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    // Delete the category from the database
  }
}
