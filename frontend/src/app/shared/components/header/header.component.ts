import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserName } from '../../../store/events/events.selector';
import { map, Observable, take } from 'rxjs';
import { AuthActions } from '../../../store/auth/auth.action';
import { ThemeService, Theme } from '../../../services/theme.service';
import { Role } from '../../enums/Role.enum';
import { selectUserRoles } from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string | undefined>;
  userRoles$: Observable<Role[]>;
  userId$: Observable<string | undefined>;

  currentTheme = signal<Theme>('dark');
  isScrolled = signal(false);
  currentTheme$!: Signal<Theme>;
  // Add this line

  constructor(
    private router: Router,
    private store: Store,
    public themeService: ThemeService,
  ) {
    this.userId$ = this.store.select(selectUserId);
    this.userName$ = this.store.select(selectUserName);
    this.userRoles$ = this.store.select(selectUserRoles);
    this.currentTheme.set(this.themeService.getTheme());
    this.currentTheme$ = this.themeService.themeChanged;
  }

  links = [
    { id: 1, name: 'Home', route: '/' },
    { id: 2, name: 'Events', route: '/events' },
    { id: 3, name: 'My Events', route: '/myevents' },
    { id: 4, name: 'Dashboard', route: '/admin/dashboard', roles: [Role.ADMIN] },
  ];

  ngOnInit(): void {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark';
    this.currentTheme.set(savedTheme);
    this.themeService.setTheme(savedTheme);
  }

  isLoggedIn(): Observable<boolean> {
    return this.userId$.pipe(
      take(1),
      map((userId) => !!userId),
    );
  }

  toggleAuth() {
    this.userId$.pipe(take(1)).subscribe((userId) => {
      if (userId) {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onThemeChange(event: Event) {
    const theme = (event.target as HTMLSelectElement).value as Theme;
    this.themeService.setTheme(theme);
    this.currentTheme.set(theme);
  }
}
