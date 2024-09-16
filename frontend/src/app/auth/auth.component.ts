import { Component, OnInit } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addIcons } from 'ionicons';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [IonicModule ,RouterModule,
    CommonModule, // For common directives like ngIf, ngFor
    ReactiveFormsModule, // For reactive form handling
    RouterModule,],
  styleUrls: ['./auth.component.scss'],
  standalone: true,
})
export class AuthComponent  implements OnInit {
  loginForm: FormGroup
  errorMessages: any = [];
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    addIcons({});
  }
  ngOnInit(): void {
  }




get f() {
  return this.loginForm.controls;
}

onSubmit() {
  if (this.loginForm.invalid) {
    return;
  }

  this.authService.login(this.loginForm.value).subscribe(
    response => {
      this.errorMessages = []
      this.router.navigate(['/']);
    },
    error => {
      this.errorMessages = error.error.errors || ['An unexpected error occurred.'];
    }
  );
}


  async loginWithGoogle() {
    try {
      const user = await GoogleAuth.signIn();
      if (user && user.authentication) {
        const idToken = user.authentication.idToken; // This is the ID token you need to send to your backend.
        if(idToken){
          this.authService.login_google(idToken).subscribe(
            response => {
              this.errorMessages = []
              this.router.navigate(['/']);
            },
            error => {
              this.errorMessages = error.error.errors || ['An unexpected error occurred.'];
            }
          )
        }
      } else {
        console.error('Google Auth failed or returned no user.');
      }
    } catch (error) {
      console.error('Google Sign-In failed:', error);
    }
  }

}
