import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  price: number;
  category: string;
  isBooked: boolean;
  location: string;
  organizer: string;
  capacity: number;
  remainingTickets: number;
}

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  event: Event = {
    id: 1,
    title: 'Concert Night',
    description:
      'Join us for an unforgettable evening of live music featuring top artists from around the world. This event will showcase a variety of genres and performances that will keep you entertained all night long.',
    imageUrl: 'https://via.placeholder.com/800x400',
    date: '2023-11-15T19:00:00',
    price: 50,
    category: 'Music',
    isBooked: false,
    location: 'Central Park Amphitheater',
    organizer: 'Music Events Inc.',
    capacity: 500,
    remainingTickets: 124,
  };

  constructor(private route: ActivatedRoute) {
    // In a real app, you would fetch the event based on route parameter
    // this.route.params.subscribe(params => {
    //   this.eventService.getEvent(params['id']).subscribe(event => {
    //     this.event = event;
    //   });
    // });
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

  bookEvent() {
    // In a real app, this would call a service
    this.event.isBooked = true;
    alert('Event booked successfully!');
  }
}
