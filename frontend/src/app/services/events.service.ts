import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { eventResponse } from '../shared/models/events,model';
import { URLS } from '../../environments/urls.env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private readonly http: HttpClient) {}

  getAllEvents(category: string, page: number, size: number): Observable<eventResponse[]> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<eventResponse[]>(URLS.EVENTS.PUBLIC.GET_ALL, { params });
  }

  getEventById(id: number): Observable<eventResponse> {
    return this.http.get<eventResponse>(URLS.EVENTS.PUBLIC.GET_BY_ID(id));
  }

  bookEvent(id: number): Observable<string> {
    return this.http.post<string>(URLS.EVENTS.PUBLIC.BOOK_EVENT(id), {});
  }

  cancelEvent(id: number): Observable<string> {
    return this.http.post<string>(URLS.EVENTS.PUBLIC.CANCEL_EVENT(id), {});
  }

  getBookedEvents(userId: string): Observable<eventResponse[]> {
    return this.http.get<eventResponse[]>(URLS.EVENTS.PUBLIC.GET_BOOKED(userId));
  }

  isEventBooked(eventId: number): Observable<boolean> {
    return this.http.get<boolean>(URLS.EVENTS.PUBLIC.IS_EVENT_BOOKED(eventId));
  }

  createEvent(event: eventResponse): Observable<eventResponse> {
    return this.http.post<eventResponse>(URLS.EVENTS.ADMIN.CREATE, event);
  }

  updateEvent(id: number, event: eventResponse): Observable<eventResponse> {
    return this.http.put<eventResponse>(URLS.EVENTS.ADMIN.UPDATE(id), event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(URLS.EVENTS.ADMIN.DELETE(id));
  }
}
