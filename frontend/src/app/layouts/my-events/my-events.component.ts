import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  of,
  map,
  take,
  withLatestFrom,
  filter,
  BehaviorSubject,
  combineLatest,
} from 'rxjs';
import { selectIsLoading, selectError } from '../../store/auth/auth.selector';
import { EventsActions } from '../../store/events/events.action';
import {
  EventResponse,
  BookEventRequest,
  GetBookedEventsRequest,
} from '../../store/events/events.model';
import { selectBookedEvents, selectUserId } from '../../store/events/events.selector';

@Component({
  selector: 'app-my-events',
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss',
})
export class MyEventsComponent implements OnInit {
  private rawEvents$: Observable<EventResponse[]> = of([]);
  private cancelledEventIds = new BehaviorSubject<number[]>([]);

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
  ) {}

  ngOnInit(): void {
    this.rawEvents$ = this.store.select(selectBookedEvents);

    this.events$ = combineLatest([this.rawEvents$, this.cancelledEventIds]).pipe(
      map(([events, cancelledIds]) =>
        events.filter((event) => !cancelledIds.includes(Number(event.id))),
      ),
    );

    this.isLoading$ = this.store.select(selectIsLoading).pipe(
      withLatestFrom(this.rawEvents$),
      map(([isLoading, events]) => isLoading && events.length === 0),
    );

    this.error$ = this.store.select(selectError).pipe(
      filter((error) => error !== null),
      take(1),
    );

    this.userId$ = this.store.select(selectUserId);
    this.loadBookedEvents();
  }

  loadBookedEvents(): void {
    this.userId$.pipe(take(1)).subscribe((userId) => {
      if (!userId) return;
      const req: GetBookedEventsRequest = {
        userId: userId,
        page: this.currentPage - 1,
        size: this.itemsPerPage,
      };
      this.store.dispatch(EventsActions.loadBookedEvents({ request: req }));
    });
  }

  navToDetail(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }

  cancelEvent(eventId: string): void {
    this.userId$.pipe(take(1)).subscribe((userId) => {
      if (userId) {
        const eventIdNumber = parseInt(eventId);
        const request: BookEventRequest = {
          id: eventIdNumber,
          userId: userId,
        };

        const currentCancelled = this.cancelledEventIds.value;
        this.cancelledEventIds.next([...currentCancelled, eventIdNumber]);

        this.store.dispatch(EventsActions.cancelBooking({ request }));

        this.store.dispatch(
          EventsActions.checkEventBookingStatusSuccess({
            eventId: request.id,
            isBooked: false,
          }),
        );

        setTimeout(() => {
          this.store.dispatch(EventsActions.checkEventBookingStatus({ request }));
        }, 500);
      }
    });
  }

  get filteredEvents$() {
    return this.events$.pipe(
      map((events) =>
        events.filter((event) => {
          const matchesSearch =
            event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase());

          const matchesCategory =
            this.selectedCategory === 'All' || event.category === this.selectedCategory;

          return matchesSearch && matchesCategory;
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
