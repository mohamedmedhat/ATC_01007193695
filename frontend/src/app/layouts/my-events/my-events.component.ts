import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, map } from 'rxjs';
import { selectIsLoading, selectError } from '../../store/auth/auth.selector';
import { EventsActions } from '../../store/events/events.action';
import { EventResponse, BookEventRequest, GetBookedEventsRequest } from '../../store/events/events.model';
import { selectEvents, selectUserId } from '../../store/events/events.selector';

@Component({
  selector: 'app-my-events',
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent implements OnInit {
  events$: Observable<EventResponse[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);
  userId$: Observable<string | undefined> = of(undefined);

  // Local component state
  currentPage = 1;
  itemsPerPage = 6;
  selectedCategory = 'All';
  searchQuery = '';

  constructor(
    private store: Store,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Initialize observables after store is available
    this.events$ = this.store.select(selectEvents);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.userId$ = this.store.select(selectUserId);
    this.loadBookedEvents();
  }

  loadBookedEvents(): void {
    this.userId$.subscribe((userId) => {
      if (!userId) return;
      const req: GetBookedEventsRequest = {
        userId: userId,
        page: this.currentPage - 1,
        size: this.itemsPerPage,
      };
      this.store.dispatch(EventsActions.loadBookedEvents({ request: req }));
    }).unsubscribe();
  }

  navToDetail(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }

  bookEvent(eventId: string, userId: string): void {
    const id = parseInt(eventId);
    const request: BookEventRequest = { id: id, userId };
    this.store.dispatch(EventsActions.bookEvent({ request }));
  }

  get filteredEvents$() {
    return this.events$.pipe(
      map((events) =>
        events.filter((event) => {
          const matchesSearch =
            event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase());
          return matchesSearch;
        }),
      ),
    );
  }

  get paginatedEvents$() {
    return this.filteredEvents$;
  }

  get categories$() {
    return this.events$.pipe(
      map((events) => {
        const categories = events.map((event) => event.category);
        return ['All', ...new Set(categories)];
      }),
    );
  }

  changePage(page: number) {
    if (page >= 1) {
      this.currentPage = page;
      this.loadBookedEvents();
    }
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadBookedEvents();
  }
}
