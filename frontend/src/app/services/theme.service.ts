import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<string>('dark');

  constructor() {
    // Initialize from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme.set(savedTheme);
    }
  }

  setTheme(theme: string) {
    this.currentTheme.set(theme);
    document.body.className = theme === 'dark' ? '' : 'light-theme';
  }

  getTheme() {
    return this.currentTheme();
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}
