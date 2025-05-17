import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { AuthActions } from '../../store/auth/auth.action';
import {
  selectError,
  selectIsLoading,
  selectIsAuthenticated,
} from '../../store/auth/auth.selector';
import { RegisterRequest } from '../../store/auth/auth.model';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private store = inject(Store);

  error$ = this.store.select(selectError);
  isLoading$ = this.store.select(selectIsLoading);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, Validators.requiredTrue],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { name, email, password } = this.form.value;
    const req: RegisterRequest = { name, email, password };
    this.store.dispatch(AuthActions.register({ req }));

    this.store
      .select(selectIsAuthenticated)
      .pipe(
        filter((isAuth) => isAuth),
        take(1),
      )
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
  }
}
