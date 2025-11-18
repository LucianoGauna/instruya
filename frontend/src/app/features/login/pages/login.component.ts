import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private auth = inject(AuthService);

  fb = new FormBuilder();
  form: FormGroup = this.fb.group({
    email: [''],
    password: [''],
  });

  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    this.loginService.login({ email, password }).subscribe({
        next: (res) => {
          console.log('LOGIN OK:', res);
          // Guardar sesión
          this.auth.login(res.token, res.user);
        },
        error: (err) => {
          console.error('LOGIN ERROR:', err);
        }
      });
  }
}
