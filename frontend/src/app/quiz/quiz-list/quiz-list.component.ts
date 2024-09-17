import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { QuizService } from '../quiz.service';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  imports:[IonicModule,CommonModule],
  standalone: true,
})
export class QuizListComponent  implements OnInit {
  quizzes: any[] = [];
  subcategory : any
  category : any
  subcategoryId: number | null = null;
  constructor(private navCtrl: NavController,private quizService: QuizService,private router: Router, private route: ActivatedRoute) {
    addIcons({ arrowBack });
   }

  ngOnInit() {
    // Extract categoryId from route parameters and fetch subcategories
  this.route.paramMap.subscribe(params => {
    const id = params.get('subcategoryId');
    if (id) {
      this.subcategoryId = +id; // Convert to number
      this.loadQuizzes(this.subcategoryId);
    }
  });
  }

  private loadQuizzes(id:any): void {
    this.quizService.getQuizzesBySubCategory(id).subscribe({
      next: (data:any) => {
        this.subcategory = data.result.subcategory;
        this.category = data.result.category;
        this.quizzes = data.result.quizzes
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  navigateToQuiz(quizId: string) {
    this.router.navigate([`quiz/${quizId}`]);
  }

  goBack(): void {
    this.navCtrl.back();
  }
}
