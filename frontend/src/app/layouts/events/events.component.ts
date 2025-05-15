import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
// import { EventsData } from '../../../data/events.data';
import { eventResponse } from '../../shared/models/events,model';
import { finalize } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  providers: [EventsService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events: eventResponse[] = [];
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 6;
  selectedCategory = 'All';
  searchQuery = '';
  totalItems = 0;

  constructor(
    private eventsService: EventsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  bookEvent(eventId: number) {
    this.eventsService.bookEvent(eventId).subscribe({
      next: (response) => {
        console.log('Event booked successfully:', response);
        this.loadEvents(); // Reload events to reflect booking
      },
      error: (err) => {
        console.error('Error booking event:', err);
      },
    });
  }

  navToDetail(eventId: number): void {
    this.router.navigate(['/events', eventId]);
  }

  loadEvents(): void {
    this.isLoading = true;
    const category = this.selectedCategory === 'All' ? '' : this.selectedCategory;

    this.eventsService
      .getAllEvents(category, this.currentPage - 1, this.itemsPerPage)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (events) => {
          this.events = events;
          this.totalItems = events.length;
        },
        error: (err) => {
          console.error('Error loading events:', err);
        },
      });
  }

  get categories(): string[] {
    const categories = this.events.map((event) => event.category);
    return ['All', ...new Set(categories)];
  }

  get filteredEvents() {
    return this.events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesSearch;
    });
  }

  get paginatedEvents() {
    return this.filteredEvents;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(this.totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = end - maxVisiblePages + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEvents();
    }
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadEvents();
  }

  getDisplayRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start} - ${end}`;
  }
}
