import { Request, Response } from 'express';
import { UserQuizzes } from '../models/UserQuizzes';
import { UserAnswers } from '../models/UserAnswers';
import { Question } from '../models/Question';
import { Option } from '../models/Option';
import { Quiz } from '../models/Quiz';

export class UserQuizzesController {

  // Get all quizzes taken by a user
  public async getQuizzesByUser(req: Request, res: Response) {
    const { userId } = req.params;
    // Fetch all quizzes taken by the user
  }

  // Get quiz results for a specific quiz and user
  public async getQuizResults(req, res) {
    try {
      const { resultId } = req.params;
      const userId = req.currentUser?.id;
  
      if (!userId) {
        return res.status(400).json({ message: 'User not authenticated' });
      }
  
      if (!resultId) {
        return res.status(400).json({ message: 'Result ID is required' });
      }
  
      // Fetch the quiz results for the specific user and quiz
      const userQuiz = await UserQuizzes.findOne({
        where: {
          user_id: userId,
          id: resultId,
        },
      });
  
      if (!userQuiz) {
        return res.status(404).json({ message: 'Quiz results not found' });
      }
  
    // Fetch the quiz title
    const quiz = await Quiz.findOne({
      where: { id: userQuiz.quiz_id },
      attributes: ['title'],
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

      // Fetch all questions for the quiz
      const questions = await Question.findAll({
        where: { quiz_id: userQuiz.quiz_id },
        include: [
          {
            model: Option,
            attributes: ['id', 'text'],
          },
        ],
      });
  
      // Fetch user answers for the quiz
      const userAnswers = await UserAnswers.findAll({
        where: {
          user_quiz_id: userQuiz.id,
        },
      });
  
      // Map correct answers for easy lookup
     // Map correct answers for easy lookup
     const correctAnswers: { [key: number]: number } = {};
     questions.forEach(question => {
       correctAnswers[question.id] = question.correct_answer;
     });
 
  
      // Format results with questions, options, user answers, and correctness
      const results = questions.map(question => {
        const options = question.options.map(option => {
          const userAnswer = userAnswers.find(answer => answer.question_id === question.id && answer.option_id === option.id);
          const isCorrect = userAnswer && correctAnswers[question.id] === option.id;
  
          return {
            id: option.id,
            text: option.text,
            isCorrect: isCorrect || false, // Mark if option is correct
          };
        });
  
        return {
          question_id: question.id,
          question_text: question.text,
          answern_desq: question.desc_answer,
          correct_answer: correctAnswers[question.id], // Include the correct answer here
          options: options,
          user_answer: userAnswers.find(answer => answer.question_id === question.id)?.option_id || null,
          is_answer_correct: correctAnswers[question.id] === (userAnswers.find(answer => answer.question_id === question.id)?.option_id || null),
        };
      });
  
      // Respond with the formatted results
      return res.status(200).json({
        quiz_id: userQuiz.quiz_id,
        quiz_title: quiz.title, // Add the quiz title here
        user_quiz: userQuiz,
        results: results,
      });
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  


  public async saveQuizResults(req, res) {
    try {
      // Extract quizId and user answers from the request body
      const { quizId, answers } = req.body; // answers should be an array of answer objects
      const user = req.currentUser; // Assume currentUser middleware adds user info
      const userId = user?.id;
  
      if (!userId) {
        return res.status(400).json({ message: 'User not authenticated' });
      }
  
      if (!quizId) {
        return res.status(400).json({ message: 'Quiz ID is required' });
      }
  
      // Fetch questions with correct answers for the given quiz
      const questions = await Question.findAll({
        where: { quiz_id: quizId }
      });
  
      // Map of question IDs to their correct answer IDs
      const correctAnswers = questions.reduce((map, question) => {
        map[question.id] = question.correct_answer;
        return map;
      }, {} as Record<number, number>);
  
      // Calculate score and count answered questions
      let score = 0;
      let answeredQuestionsCount = 0;
  
      // Create a map for quick lookup of user answers
      const userAnswersMap = new Map<number, number>(); // questionId => optionId
  
      answers.forEach((answer: any) => {
        // Skip if answer is null or not valid
        if (answer && answer.questionId && answer.optionId) {
          userAnswersMap.set(answer.questionId, answer.optionId);
        }
      });
  
      // Iterate over all questions to calculate score and count answered questions
      questions.forEach(question => {
        const correctAnswer = correctAnswers[question.id];
        const userAnswer = userAnswersMap.get(question.id);
  
        // Check if the user's answer is correct
        if (userAnswer === correctAnswer) {
          score += 1; // Increment score if the answer is correct
        }
  
        // Count the answered question
        if (userAnswer !== undefined) {
          answeredQuestionsCount += 1;
        }
      });
  
      // Create or update the user's quiz record
      const userQuiz = await UserQuizzes.create({
        user_id: userId,
        quiz_id: quizId,
        score: score, // Save the calculated score
        questions_answered: answeredQuestionsCount,
      });
  
      // Prepare answers for saving, skip null or invalid answers
      const userAnswers = answers
        .filter((answer: any) => answer && answer.questionId && answer.optionId) // Remove null and invalid answers
        .map((answer: any) => ({
          user_quiz_id: userQuiz.id,
          question_id: answer.questionId,
          option_id: answer.optionId,
          answer_text: answer.answerText,
        }));
  
      // Save each answer
      if (userAnswers.length > 0) {
        await UserAnswers.bulkCreate(userAnswers);
      }
  
      return res.status(201).json(userQuiz);
    } catch (error) {
      console.error('Error saving quiz results:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  }
  


