import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { QuizService } from '../quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss'],
  imports:[IonicModule,CommonModule],
  standalone: true,
})
export class SubcategoryListComponent  implements OnInit {
  subcategories: any[] = [];
  categorie : any
  categoryId: number | null = null;
  constructor(private navCtrl: NavController,private quizService: QuizService,private router: Router, private route: ActivatedRoute) {
    addIcons({ arrowBack });
   }

   ngOnInit() {
  // Extract categoryId from route parameters and fetch subcategories
  this.route.paramMap.subscribe(params => {
    const id = params.get('categoryId');
    if (id) {
      this.categoryId = +id; // Convert to number
      this.loadSubcategories(this.categoryId);
    }
  });  }

  private loadSubcategories(id:any): void {
    this.quizService.getSubcategoriesByCategory(id).subscribe({
      next: (data:any) => {
        this.subcategories = data.result.subcategories;
        this.categorie = data.result.category;

      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  navigateToQuiz(subcategoryId: string) {
    this.router.navigate([`subcategories/${subcategoryId}/quiz`]);
  }

  goBack(): void {
    this.navCtrl.back();
  }
}
