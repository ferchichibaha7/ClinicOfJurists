import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonInput } from "@ionic/angular/standalone";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonicModule ,RouterModule,
    CommonModule, // For common directives like ngIf, ngFor
    ReactiveFormsModule, // For reactive form handling
    RouterModule, // For navigation between routes
  ],
  standalone: true,

})
export class RegisterComponent  implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessages: any =[];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone_number: ['']
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit(): void {
  }

  // Custom validator for password matching
  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // Getter for form controls to avoid accessing controls directly
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessages = [];

    const { name, email, password, phone_number } = this.registerForm.value;

    this.authService.register({ name, email, password, phone_number })
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.isLoading = false;
          // Handle success (e.g., navigate to login page)
        },
        error: (error) => {
          console.log(error);

          this.isLoading = false;
          this.errorMessages = error?.error?.errors || ['An error occurred. Please try again.'];
        }
      });
  }

}
