import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

import { FloatLabel } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    FloatLabel,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  public loginForm = this.fb.group({
    token: ['', Validators.required],
  });

  public responseMessage = '';
  public isLoading = false;

  onSubmit() {
    if (this.loginForm.invalid) {
      this.responseMessage = 'Por favor, ingrese un token válido.';
      return;
    }

    this.isLoading = true;

    const token = this.loginForm.value.token;

    if (!token) return;

    if (!token.startsWith('http://') && !token.startsWith('https://')) return;

    this.authService.sendTokenUrlToRobot(token).subscribe({
      next: response => {
        this.responseMessage = response.success
          ? 'Prueba ejecutada con éxito.'
          : `Error: ${response.output}`;
      },
      error: error => {
        this.responseMessage = 'Error en la solicitud.';
        console.error('Request failed:', error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
