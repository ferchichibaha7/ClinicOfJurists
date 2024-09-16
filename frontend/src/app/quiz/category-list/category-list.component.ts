import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  imports:[IonicModule,CommonModule],
  standalone: true,
})
export class CategoryListComponent  implements OnInit {
  categories: any[] = [];
  constructor(private navCtrl: NavController,private quizService: QuizService,private router: Router) {
    addIcons({ arrowBack });

   }

   ngOnInit() {
    this.loadCategories();
  }
  goBack(): void {
    this.navCtrl.back();
  }

    navigateToSubcategories(categoryId: string) {
    this.router.navigate([`categories/${categoryId}/subcategories`]);
  }

  private loadCategories(): void {
    this.quizService.getCategories().subscribe({
      next: (data:any) => {
        this.categories = data.result;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
