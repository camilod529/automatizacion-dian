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
    identificationType: [''],
    username: [''],
  });

  public identificationTypeOptions = [
    { value: '10910036', text: 'Certificado Registraduría sin identificación' },
    { value: '10910092', text: 'Registro civil' },
    { value: '10910093', text: 'Tarjeta de identidad' },
    { value: '10910094', text: 'Cédula de ciudadanía' },
    { value: '10910095', text: 'Tarjeta de extranjería' },
    { value: '10910096', text: 'Cédula de extranjería' },
    { value: '10910097', text: 'NIT' },
    { value: '10910098', text: 'Pasaporte' },
    { value: '10910366', text: 'Tipo de documento desconocido' },
    { value: '10910394', text: 'Documento de identificación extranjero' },
    { value: '10910402', text: 'Nit de otro país' },
    { value: '10910403', text: 'NIUP' },
    { value: '10930954', text: 'PEP' },
    { value: '10930955', text: 'PPT' },
  ];

  onSubmit() {
    const formValue = this.loginForm.value;
    const identificationTypeText =
      this.identificationTypeOptions.find(
        option => option.value === formValue.identificationType,
      )?.text || '';
    console.log({
      ...formValue,
      identificationType: identificationTypeText,
    });
    // TODO: Redirect to
  }
}
