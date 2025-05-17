import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../environments/urls.env';
import { Observable } from 'rxjs';
import {
  BookedEventResponse,
  BookEventRequest,
  EventResponse,
  GetBookedEventsRequest,
  GetEventsRequest,
} from '../store/events/events.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private readonly http: HttpClient) { }

  getAllEvents(req: GetEventsRequest): Observable<EventResponse[]> {
    let params = new HttpParams().set('page', req.page.toString()).set('size', req.size.toString());

    if (req.category) {
      params = params.set('category', req.category);
    }

    return this.http.get<EventResponse[]>(URLS.EVENTS.PUBLIC.GET_ALL, { params });
  }

  getEvent(id: number): Observable<EventResponse> {
    return this.http.get<EventResponse>(URLS.EVENTS.PUBLIC.GET_BY_ID(id));
  }

  bookEvent(req: BookEventRequest): Observable<BookedEventResponse> {
    return this.http.post<BookedEventResponse>(
      URLS.EVENTS.PUBLIC.BOOK_EVENT(req.id, req.userId),
      {},
    );
  }

  cancelEvent(req: BookEventRequest): Observable<BookedEventResponse> {
    return this.http.post<BookedEventResponse>(
      URLS.EVENTS.PUBLIC.CANCEL_EVENT(req.id, req.userId),
      {},
    );
  }

  getBookedEvents(req: GetBookedEventsRequest): Observable<EventResponse[]> {
    return this.http.get<EventResponse[]>(
      URLS.EVENTS.PUBLIC.GET_BOOKED(req.userId, req.page, req.size),
    );
  }

  isEventBooked(req: BookEventRequest): Observable<boolean> {
    return this.http.get<boolean>(URLS.EVENTS.PUBLIC.IS_EVENT_BOOKED(req.id, req.userId));
  }

  createEvent(event: FormData): Observable<EventResponse> {
    return this.http.post<EventResponse>(URLS.EVENTS.ADMIN.CREATE, event);
  }

  updateEvent(id: number, event: FormData): Observable<EventResponse> {
    return this.http.put<EventResponse>(URLS.EVENTS.ADMIN.UPDATE(id), event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(URLS.EVENTS.ADMIN.DELETE(id));
  }
}
