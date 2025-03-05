import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
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
    const url = 'http://localhost:3000/robot/execute';
    const payload = { url: this.loginForm.value.token };

    this.http
      .post<{ success: boolean; output: string }>(url, payload)
      .subscribe({
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
