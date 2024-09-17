import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack, checkmarkCircle, checkmarkCircleOutline, closeCircle, closeCircleOutline } from 'ionicons/icons';
import { QuizService } from '../quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
  imports:[IonicModule,CommonModule],

  standalone: true,
})
export class QuizResultComponent  implements OnInit {
  resultId: number | null = null;
  results :any
  scoreColor : any
  constructor(private navCtrl: NavController,private quizService: QuizService,private router: Router, private route: ActivatedRoute) {
    addIcons({ arrowBack,closeCircleOutline,checkmarkCircleOutline  });
   }

  ngOnInit() {
    // Extract categoryId from route parameters and fetch subcategories
  this.route.paramMap.subscribe(params => {
    const id = params.get('resultid');
    if (id) {
      this.resultId = +id; // Convert to number
      this.loadResult(this.resultId);
    }
  });
  }

  private loadResult(id:any): void {
    this.quizService.getQuizResult(id).subscribe({
      next: (data:any) => {
        this.results = data
        this.scoreColor = this.calculateScoreColor(data.user_quiz.score, data.user_quiz.questions_answered);
      },
      error: (error :any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  private calculateScoreColor(score: number, questionsAnswered: number): string {
    const mediumScoreThreshold = Math.ceil(questionsAnswered / 2);
    return score >= mediumScoreThreshold ? 'green' : 'red';
  }


  goBack(): void {
    this.router.navigate([`/`]);

  }

}
