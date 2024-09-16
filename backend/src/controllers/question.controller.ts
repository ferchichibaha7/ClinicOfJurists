import { Request, Response } from 'express';
import { Question } from '../models/Question';

export class QuestionController {

  // Get all questions for a quiz
  public async getQuestionsByQuiz(req: Request, res: Response) {
    const { quizId } = req.params;
    // Fetch all questions associated with a specific quiz
  }

  // Get a single question by ID
  public async getQuestionById(req: Request, res: Response) {
    const { id } = req.params;
    // Fetch question by ID from the database
  }

  // Create a new question
  public async createQuestion(req: Request, res: Response) {
    const { text, quizId } = req.body;
    // Validate and create a new question for a specific quiz
  }

  // Update an existing question
  public async updateQuestion(req: Request, res: Response) {
    const { id } = req.params;
    const { text, quizId } = req.body;
    // Find the question by ID and update it
  }

  // Delete a question
  public async deleteQuestion(req: Request, res: Response) {
    const { id } = req.params;
    // Delete the question by ID
  }
}
