import { Request, Response } from 'express';
import { Quiz } from '../models/Quiz';
import { Subcategory } from '../models/Subcategory';
import { Category } from '../models/Category';
import HttpStatusCodes from 'http-status-codes';
import { Question } from '../models/Question';
import { Option as QuizOption } from '../models/Option'; // Rename the import to avoid conflict with HTMLOptionElement
export class QuizController {

  // Get all quizzes for a subcategory
// Get all quizzes by subcategory ID and include the category and subcategory information
public async getQuizzesBySubcategory(req: Request, res: Response) {
  const { subcategoryId } = req.params;

  try {
    // Fetch the subcategory with its associated category
    const subcategory = await Subcategory.findOne({
      where: { id: subcategoryId },
      include: [
        {
          model: Category,  // Include the associated category
          as: 'category',   // Ensure correct alias if defined in associations
        },
      ],
    });

    // Check if subcategory exists
    if (!subcategory) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Subcategory not found',
      });
    }

    // Fetch all quizzes related to this subcategory
    const quizzes = await Quiz.findAll({
      where: { subcategory_id: subcategoryId },
    });

    // Extract category data from the subcategory object
    const category = subcategory.category;

    // Return the structured response
    res.status(HttpStatusCodes.OK).json({
      message: 'Quizzes, Category, and Subcategory retrieved successfully',
      result: {
        quizzes,
        category,
        subcategory,
      },
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching quizzes for the subcategory',
      error,
    });
  }
}


  // Get a quiz by ID
// Get a quiz by ID and include category, subcategory, questions, and options
public async getQuizById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    // Fetch the quiz by ID, and include subcategory, category, questions, and options
    const quiz = await Quiz.findOne({
      where: { id },
      include: [
        {
          model: Subcategory, // Include the associated subcategory
          as: 'subcategory',
          include: [
            {
              model: Category, // Include the associated category through the subcategory
              as: 'category',
            },
          ],
        },
        {
          model: Question, // Include the associated questions
          as: 'questions',
          include: [
            {
              model: QuizOption, // Include the options for each question
              as: 'options',
            },
          ],
        },
      ],
    });

    // Check if the quiz exists
    if (!quiz) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        message: 'Quiz not found',
      });
    }


    // Return the structured response
    res.status(HttpStatusCodes.OK).json({
      message: 'Quiz retrieved successfully',
      result: {
        quiz
      },
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error fetching quiz',
      error,
    });
  }
}



  // Create a new quiz
  public async createQuiz(req: Request, res: Response) {
    const { name, subcategoryId } = req.body;
    // Validate and create a new quiz under a specific subcategory
  }

  // Update an existing quiz
  public async updateQuiz(req: Request, res: Response) {
    const { id } = req.params;
    const { name, subcategoryId } = req.body;
    // Find the quiz by ID and update it
  }

  // Delete a quiz
  public async deleteQuiz(req: Request, res: Response) {
    const { id } = req.params;
    // Delete the quiz by ID
  }
  
  // Submit quiz answers
  public async submitQuiz(req: Request, res: Response) {
    const { userId, quizId, answers } = req.body;
    // Save user's quiz answers to the database (store in UserQuizzes or similar)
  }
}

