import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { URLS } from '../../environments/urls.env';
import { Role } from '../shared/enums/Role.enum';

describe('AuthService', () => {
  let service: AuthService;

  const mockHttp = {
    post: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call login with correct payload and URL', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockResponse = { access_token: 'abc123' };

    mockHttp.post.mockReturnValue(of(mockResponse));

    service.login(email, password).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    expect(mockHttp.post).toHaveBeenCalledWith(URLS.AUTH.LOGIN, { email, password });
  });

  it('should call register with correct payload and URL', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'pass123';
    const mockResponse = { id: '1', name, email, roles: new Set([Role.USER]) };

    mockHttp.post.mockReturnValue(of(mockResponse));

    service.register(name, email, password).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    expect(mockHttp.post).toHaveBeenCalledWith(URLS.AUTH.REGISTER, { name, email, password });
  });
});
