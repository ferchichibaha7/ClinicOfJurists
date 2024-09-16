import { Request, Response } from 'express';
import { Option } from '../models/Option';

export class OptionController {

  // Get all options for a question
  public async getOptionsByQuestion(req: Request, res: Response) {
    const { questionId } = req.params;
    // Fetch all options associated with a specific question
  }

  // Get a single option by ID
  public async getOptionById(req: Request, res: Response) {
    const { id } = req.params;
    // Fetch option by ID from the database
  }

  // Create a new option
  public async createOption(req: Request, res: Response) {
    const { text, questionId, isCorrect } = req.body;
    // Validate and create a new option for a specific question
  }

  // Update an existing option
  public async updateOption(req: Request, res: Response) {
    const { id } = req.params;
    const { text, isCorrect } = req.body;
    // Find the option by ID and update it
  }

  // Delete an option
  public async deleteOption(req: Request, res: Response) {
    const { id } = req.params;
    // Delete the option by ID
  }
}
