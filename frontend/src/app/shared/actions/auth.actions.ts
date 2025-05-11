import { createAction, props } from '@ngrx/store';
import { LoginResponse } from '../models/login.model';
import { RegisterResponse } from '../models/register.model';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponse }>(),
);
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: never }>());

export const register = createAction(
  '[Auth] Register',
  props<{ name: string; email: string; password: string }>(),
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: RegisterResponse }>(),
);
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: never }>());

export const logout = createAction('[Auth] Logout');
