import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName = 'student';
  isLoggedIn = false;

  constructor(private readonly router: Router) {}

  toggleLogin() {
    this.router.navigate(['/auth/login']);
  }

  onThemeChange(_event: Event) {
    _event.preventDefault();
  }
}
