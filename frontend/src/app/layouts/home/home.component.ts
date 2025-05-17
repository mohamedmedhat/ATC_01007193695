import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { homeFeatures, testimonials } from '../../../data/home.data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  features = homeFeatures;
  testimonials = testimonials;
}
