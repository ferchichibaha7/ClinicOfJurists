import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonTitle, IonButtons, IonButton, IonToolbar, NavController } from "@ionic/angular/standalone";
import { QuizService } from '../quiz.service';
import { addIcons } from 'ionicons';
import { arrowBack, checkmarkCircle, checkmarkCircleOutline, closeCircle, closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  imports:[IonicModule,CommonModule],
  standalone: true,
})
export class QuizComponent  implements OnInit {
  questions: any[] = [];
  subcategory : any
  category : any
  quiz : any
  quizId: any;
  currentQuestionId = 0
  selectedOption :any
  selectedOptions: { questionId: number, optionId: any,answerText:any }[] = []; // Store selected options
  constructor(private navCtrl: NavController,private quizService: QuizService,private router: Router, private route: ActivatedRoute) {
    addIcons({ arrowBack});
   }

  ngOnInit() {
    // Extract categoryId from route parameters and fetch subcategories
    this.route.paramMap.subscribe(params => {
      const id = params.get('quizId');
      if (id) {
        this.quizId = +id; // Convert to number
        this.loadQuiz(this.quizId);
      }
    });

  }


  private loadQuiz(id:any): void {
    this.quizService.getQuizById(id).subscribe({
      next: (data:any) => {
        this.quiz = data.result.quiz
        this.subcategory = data.result.quiz.subcategory;
        this.category = data.result.quiz.subcategory.category;
        this.questions = data.result.quiz.questions
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  selectOption(questionId: any, optionId: any,answerText:any) {
    // Ensure that selectedOptions[currentQuestionId] is initialized
    if (!this.selectedOptions[this.currentQuestionId]) {
      this.selectedOptions[this.currentQuestionId] = { questionId, optionId : null,answerText:null };
    }
    // Update the selected option for the current question
    this.selectedOptions[this.currentQuestionId].optionId = optionId;
    this.selectedOptions[this.currentQuestionId].answerText = answerText
  }

  nextQuestion(){
    if((this.currentQuestionId+1)<this.questions.length)
    this.currentQuestionId++
  }
  prevQuestion(){
    if(this.currentQuestionId>0)
    this.currentQuestionId--

  }

   // Calculate the score and send quiz results to the backend
   showResult() {
    // Prepare the user quiz results object
    const userQuizResults = {
      quizId: this.quizId,
      answers: this.selectedOptions.map(option => ({
        questionId: option.questionId,
        optionId: option.optionId,
        answerText: option.answerText,
      })),
    };

    // Save the quiz results
    this.quizService.saveQuiz(userQuizResults).subscribe((data : any) => {
      console.log('Quiz results saved:', data);
      const resultId = data['id']
      this.router.navigate([`result/${resultId}`]);

    }, error => {
      console.error('Error saving quiz results:', error);
    });
  }





  goBack(): void {
    this.navCtrl.back();
  }
}
