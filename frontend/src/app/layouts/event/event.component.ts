import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EventsActions } from '../../store/events/events.action';
import { filter, Observable, of, take } from 'rxjs';
import { BookEventRequest, EventResponse } from '../../store/events/events.model';
import {
  selectError,
  selectEvent,
  selectIsLoading,
  selectUserId,
} from '../../store/events/events.selector';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-event',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  facebookIcon = faFacebook;
  twitterIcon = faTwitter;
  linkedInIcon = faLinkedin;

  isBooked = signal<boolean>(false);
  eventId = signal<string>('');

  event$: Observable<EventResponse | null> = of(null);
  isLoading$: Observable<boolean> = of(false);
  error$: Observable<string | null> = of(null);
  userId$: Observable<string | undefined>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.userId$ = this.store.select(selectUserId);
  }

  ngOnInit(): void {
    this.event$ = this.store.select(selectEvent);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.loadEventDetail();
  }

  loadEventDetail() {
    this.eventId.set(this.route.snapshot.paramMap.get('id')!);
    this.store.dispatch(EventsActions.loadEventDetails({ eventId: Number(this.eventId()) }));
  }

  bookEvent() {
    this.userId$
      .pipe(
        take(1),
        filter((userId): userId is string => !!userId),
      )
      .subscribe((userId) => {
        if (!userId) {
          // Handle unauthenticated user (redirect to login?)
          return;
        }

        const request: BookEventRequest = {
          id: Number(this.eventId()),
          userId,
        };
        this.store.dispatch(EventsActions.bookEvent({ request }));
      });
  }

  shareEvent(platform: string) {
    this.event$.pipe(take(1)).subscribe((event) => {
      if (!event) return;

      const url = `${window.location.origin}/events/${event.id}`;
      const text = `Check out ${event.name} at ${event.venue} on ${this.formatDate(event.date)}`;

      switch (platform) {
        case 'facebook':
          this.shareOnFacebook(url, text);
          break;
        case 'twitter':
          this.shareOnTwitter(url, text);
          break;
        case 'linkedin':
          this.shareOnLinkedIn(url);
          break;
        default:
          this.copyToClipboard(url);
      }
    });
  }

  private shareOnFacebook(url: string, text: string) {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=400',
    );
  }

  private shareOnTwitter(url: string, text: string) {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '_blank',
      'width=600,height=400',
    );
  }

  private shareOnLinkedIn(url: string) {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400',
    );
  }

  private async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // Show a toast/snackbar message
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  }

  isAvailabilityLow(): boolean {
    // Implement your availability logic
    return false;
  }

  getAvailabilityStatus(): string {
    // Return appropriate status message
    return 'Tickets Available';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
