import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginResponse, RegisterResponse } from './auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Auto Login': emptyProps(),
    'Auto Login Success': props<{ token: string }>(),
    'Auto Login Failure': emptyProps(),
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ response: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),
    Register: props<{ name: string; email: string; password: string }>(),
    'Register Success': props<{ response: RegisterResponse }>(),
    'Register Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ token: string }>(),
    'Refresh Token Failure': props<{ error: string }>(),
  },
});
