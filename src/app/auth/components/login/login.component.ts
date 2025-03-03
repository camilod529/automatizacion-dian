import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);

  public loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  onSubmit() {
    console.log(this.loginForm.value);
    // TODO: Redirect to
  }
}
