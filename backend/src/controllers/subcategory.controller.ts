import { Request, Response } from "express";
import { Subcategory } from "../models/Subcategory";
import HttpStatusCodes from "http-status-codes";
import { Category } from "../models/Category";

export class SubcategoryController {
  // Get all subcategories by category ID
  public async getAllSubcategoriesByCategory(req, res) {
    const { categoryId } = req.params;
    // Fetch all subcategories for the given category ID from the database
    try {
      // Fetch all subcategories for the given category ID and include the associated category object
      const subcategories = await Subcategory.findAll({
        where: { category_id: categoryId },
        include: [
          {
            model: Category, // Assuming Category is the associated model
            as: "category", // Make sure to use the right alias if you have one
            attributes: ["id", "name", "description"], // Specify the fields you want to retrieve from the Category
          },
        ],
      });

      // Extract the category from the first subcategory (since all subcategories have the same category)
      const category =
        subcategories.length > 0 ? subcategories[0].category : null;

      res.status(HttpStatusCodes.OK).json({
        message: "Subcategories and Category retrieved",
        result: {
          category,
          subcategories,
        },
      });
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error fetching subcategories and category",
        error,
      });
    }
  }

  // Get subcategory by ID
  public async getSubcategoryById(req: Request, res: Response) {
    const { id } = req.params;
    // Fetch subcategory by ID from the database
  }

  // Create a new subcategory
  public async createSubcategory(req: Request, res: Response) {
    // Extract data from request body and create a new subcategory in the database
  }

  // Update an existing subcategory
  public async updateSubcategory(req: Request, res: Response) {
    const { id } = req.params;
    // Extract data from request body and update the subcategory in the database
  }

  // Delete a subcategory
  public async deleteSubcategory(req: Request, res: Response) {
    const { id } = req.params;
    // Delete the subcategory from the database
  }
}
