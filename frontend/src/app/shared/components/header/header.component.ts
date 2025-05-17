import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserName } from '../../../store/events/events.selector';
import { map, Observable, of, take } from 'rxjs';
import { AuthActions } from '../../../store/auth/auth.action';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName$: Observable<string | undefined> = of(undefined);
  userId$: Observable<string | undefined> = of(undefined);
  currentTheme = signal<string>('dark');
  isScrolled = signal(false);




  links = [
    { id: 1, name: 'Home', route: '/' },
    { id: 2, name: 'Events', route: '/events' },
    { id: 3, name: 'My Events', route: '/myevents' },
    { id: 4, name: 'Dashboard', route: '/admin/dashboard' },
  ];

  constructor(
    private router: Router,
    private store: Store,
    private themeService: ThemeService
  ) {
    effect(() => {
      document.body.className = this.currentTheme() === 'dark' ? '' : 'light-theme';
    });
  }

  ngOnInit(): void {
    this.userId$ = this.store.select(selectUserId);
    this.userName$ = this.store.select(selectUserName);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.currentTheme.set(savedTheme);
    this.themeService.setTheme(savedTheme);
  }

  isLoggedIn(): Observable<boolean> {
    return this.userId$.pipe(
      take(1),
      map(userId => !!userId)
    );
  }

  toggleAuth() {
    this.userId$.pipe(take(1)).subscribe(userId => {
      if (userId) {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onThemeChange(event: Event) {
    const theme = (event.target as HTMLSelectElement).value;
    this.currentTheme.set(theme);
    this.themeService.setTheme(theme);
    localStorage.setItem('theme', theme);
  }
}