import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonButton, IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {  logOut } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  constructor(private authservice : AuthService,private router: Router) {
    addIcons({ logOut });

  }
  logout() {
    this.authservice.signOut().subscribe(res=>{
      this.router.navigate(['/auth']);
    })
  }
}
