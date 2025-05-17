import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Check Auth': emptyProps(),
    'Check Auth Success': props<{ token: string }>(),
    'Check Auth Failure': emptyProps(),

    'Auto Login': emptyProps(),
    'Auto Login Success': props<{ token: string }>(),
    'Auto Login Failure': emptyProps(),

    'Login': props<{ req: LoginRequest }>(),
    'Login Success': props<{ response: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Register': props<{ req: RegisterRequest }>(),
    'Register Success': props<{ response: RegisterResponse }>(),
    'Register Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': emptyProps(),

    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ token: string }>(),
    'Refresh Token Failure': props<{ error: string }>(),
  },
});
