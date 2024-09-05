import { Component, Input } from '@angular/core';
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

  async  loginWithGoogle() {
    const user = await GoogleAuth.signIn();
    const idToken = user.authentication.idToken; // This is the ID token you need to send to your backend.
    console.log(idToken);

    //await sendTokenToBackend(idToken);
  }
}
