import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() isBooked: boolean = false;
  @Input() eventId: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() date: string = '';
  @Input() price: number = 0;
  @Input() category: string = '';
  @Output() navToDetail = new EventEmitter<string>();
  @Output() bookEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<string>();

  book(event: MouseEvent) {
    event.stopPropagation();
    this.bookEvent.emit(this.eventId);
  }

  cancel(event: MouseEvent) {
    event.stopPropagation();
    this.cancelEvent.emit(this.eventId);
  }

  nav(event: Event) {
    event.stopPropagation();
    this.navToDetail.emit(this.eventId);
  }
}
