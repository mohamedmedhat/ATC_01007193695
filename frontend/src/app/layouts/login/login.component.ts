import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectError,
  selectIsAuthenticated,
  selectIsLoading,
} from '../../store/auth/auth.selector';
import { AuthActions } from '../../store/auth/auth.actions';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  error$ = this.store.select(selectError);
  isLoading$ = this.store.select(selectIsLoading);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ email, password }));

    this.store
      .select(selectIsAuthenticated)
      .pipe(
        filter((isAuth) => isAuth),
        take(1),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
