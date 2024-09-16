import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { addIcons } from "ionicons";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) {
   this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize(
        {
          clientId:"108369369460-g4gcc56jqauivggargg2nft88bkgp9v7.apps.googleusercontent.com",
          scopes: ['profile', 'email'],
          grantOfflineAccess: true,
        }
      )
    })
  }

}
