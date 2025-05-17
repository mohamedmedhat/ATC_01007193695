import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
// import { EventsData } from '../../../data/events.data';
import { CommonModule } from '@angular/common';
import { BookEventRequest, EventResponse } from '../../store/events/events.model';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of } from 'rxjs';
import { EventsActions } from '../../store/events/events.action';
import { selectIsLoading, selectError } from '../../store/auth/auth.selector';
import { selectBookingStatus, selectEvents, selectUserId } from '../../store/events/events.selector';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  events$: Observable<EventResponse[]> = of([]);
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);
  bookingStatus$: Observable<{ [eventId: number]: boolean }> = of({});
  userId$: Observable<string | undefined> = of(undefined);
  isBooked = false;

  eventForm: FormGroup;
  isEditing = false;
  selectedFiles: File[] = [];
  currentEventId: number | null = null;
  searchQuery = '';
  imagePreviews: string[] = [];

  filteredEvents$: Observable<EventResponse[]> = of([]);


  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      isBooked: [false],
    });

    this.store.dispatch(
      EventsActions.loadEvents({
        request: { page: 0, size: 100 },
      }),
    );
  }

  ngOnInit(): void {
    this.events$ = this.store.select(selectEvents);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.userId$ = this.store.select(selectUserId);
    this.error$ = this.store.select(selectError);
    this.bookingStatus$ = this.store.select(selectBookingStatus);

    this.filteredEvents$ = combineLatest([this.events$, this.bookingStatus$]).pipe(
      map(([events, bookingStatus]) => {
        return events
          .filter(event =>
            event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
          .map(event => ({
            ...event,
            isBooked: bookingStatus[Number(event.id)] || false
          }));
      })
    );
  }

  removePreview(index: number) {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.imagePreviews = [];

      // Create previews for selected files
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === 'string') {
            this.imagePreviews.push(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  createEvent() {
    if (this.eventForm.valid) {
      const formData = new FormData();

      // Append all form fields
      Object.keys(this.eventForm.value).forEach(key => {
        formData.append(key, this.eventForm.value[key]);
      });

      // Append each image file
      this.selectedFiles.forEach(file => {
        formData.append('images', file, file.name);
      });

      this.store.dispatch(EventsActions.createEvent({ event: formData }));
      this.resetForm();
    }
  }

  updateEvent() {
    if (this.eventForm.valid && this.currentEventId) {
      const formData = new FormData();

      Object.keys(this.eventForm.value).forEach(key => {
        formData.append(key, this.eventForm.value[key]);
      });

      // Only append new files if they were selected
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.forEach(file => {
          formData.append('images', file, file.name);
        });
      }

      this.store.dispatch(
        EventsActions.updateEvent({
          eventId: this.currentEventId,
          event: formData
        })
      );
      this.resetForm();
    }
  }

  editEvent(event: EventResponse) {
    this.isEditing = true;
    this.currentEventId = Number(event.id);
    this.selectedFiles = [];
    this.imagePreviews = [];

    // Set existing images as previews
    if (event.images && event.images.length > 0) {
      this.imagePreviews = event.images.map(img => img.url);
    }

    this.eventForm.patchValue({
      name: event.name,
      description: event.description,
      category: event.category,
      date: event.date,
      venue: event.venue,
      price: event.price,
    });
  }

  resetForm() {
    this.eventForm.reset();
    this.isEditing = false;
    this.currentEventId = null;
    this.selectedFiles = [];
    this.imagePreviews = [];
  }

  checkBookingStatus(eventId: number) {
    this.userId$.subscribe(userId => {
      if (userId) {
        const request: BookEventRequest = { id: eventId, userId };
        this.store.dispatch(EventsActions.checkEventBookingStatus({ request }));
      }
    }).unsubscribe();
  }


  deleteEvent(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    console.log('Deleting event with ID:', id, 'Type:', typeof id);

    const numericId = Number(id);
    if (isNaN(numericId)) {
      console.error('Invalid event ID:', id);
      return;
    }

    this.store.dispatch(EventsActions.deleteEvent({ eventId: numericId }));
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }
}
