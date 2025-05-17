import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { map, Observable, of, take, startWith } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';
import { BookEventRequest, EventResponse, GetEventsRequest } from '../../store/events/events.model';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectError } from '../../store/auth/auth.selector';
import { EventsActions } from '../../store/events/events.action';
import { selectEvents, selectUserId } from '../../store/events/events.selector';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  providers: [EventsService],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events$: Observable<EventResponse[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);
  userId$: Observable<string | undefined> = of(undefined);
  hasLoaded$: Observable<boolean> = of(false);

  // Local component state
  isBooking = signal(false);
  currentPage = 1;
  pageSize = 6;
  totalEvents = 0;
  totalPages = 1;
  selectedCategory = 'All';
  searchQuery = '';

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.events$ = this.store.select(selectEvents);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.userId$ = this.store.select(selectUserId);
    this.hasLoaded$ = this.events$.pipe(
      map(events => events.length > 0),
      startWith(false)
    );
    this.loadEvents();
  }

  loadEvents(): void {
    const category = this.selectedCategory === 'All' ? '' : this.selectedCategory;

    const req: GetEventsRequest = {
      category: category,
      page: this.currentPage - 1,
      size: this.pageSize,
    };

    this.store.dispatch(EventsActions.loadEvents({ request: req }));

    this.events$.pipe(
      take(1),
      map(events => {
        this.totalEvents = events.length;
        this.totalPages = Math.ceil(this.totalEvents / this.pageSize);
      })
    ).subscribe();
  }

  navToDetail(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }

  bookEvent(eventId: string): void {
    this.userId$.pipe(take(1)).subscribe(userId => {
      if (userId) {
        const request: BookEventRequest = { 
          id: parseInt(eventId), 
          userId: userId 
        };
        this.store.dispatch(EventsActions.bookEvent({ request }));
        this.isBooking.set(true);
        this.resetBookingState();
      }
    });
  }

  resetBookingState(): void {
    setTimeout(() => {
      this.isBooking.set(false);
    }, 3000);
  }

  get categories$(): Observable<string[]> {
    return this.events$.pipe(
      map((events) => {
        const categories = events.map((event) => event.category);
        return ['All', ...new Set(categories)];
      }),
    );
  }

  // Pagination methods
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEvents();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEvents();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadEvents();
  }

  get showingStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEvents);
  }
}