import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonicModule } from '@ionic/angular';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [IonicModule],
  styleUrls: ['./auth.component.scss'],
  standalone: true,
})
export class AuthComponent  implements OnInit {
  username = ''
  password = ''
  constructor(private router: Router) {

    addIcons({});
  }
  ngOnInit(): void {
  }

  navigateToTab1() {
    this.router.navigate(['/home/tab1']);
  }


  async loginWithGoogle() {
    try {
      const user = await GoogleAuth.signIn();
      if (user && user.authentication) {
        const idToken = user.authentication.idToken; // This is the ID token you need to send to your backend.
        console.log(user);

        // Here you would send the idToken to your backend
        // await sendTokenToBackend(idToken);
      } else {
        console.error('Google Auth failed or returned no user.');
      }
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  }

}
