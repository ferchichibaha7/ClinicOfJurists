import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonButtons, IonButton } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  imports:[IonButtons],
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
})
export class ExploreContainerComponent {
  @Input() name?: string;

  constructor(private router: Router){}

  async  loginWithGoogle() {
    const user = await GoogleAuth.signIn();
    const idToken = user.authentication.idToken; // This is the ID token you need to send to your backend.
    console.log(idToken);

    //await sendTokenToBackend(idToken);
  }

  navigateToQuiz(): void {
    this.router.navigate(['/quiz']);
  }
}
