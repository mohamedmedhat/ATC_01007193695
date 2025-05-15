import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() isBooked: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() date: string = '';
  @Input() price: number = 0;
  @Input() category: string = '';
  @Output() navtoDetail = new EventEmitter<void>();
  @Output() bookEvent = new EventEmitter<void>();

  book(): Observable<void> {
    return new Observable((observer) => {
      observer.next(this.bookEvent.emit());
      observer.complete();
    });
  }

  nav(): Observable<void> {
    return new Observable((observer) => {
      observer.next(this.navtoDetail.emit());
      observer.complete();
    });
  }
}
