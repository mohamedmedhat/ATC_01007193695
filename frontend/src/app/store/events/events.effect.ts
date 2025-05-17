import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventsService } from '../../services/events.service';
import { EventsActions } from './events.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';

export const GetEvents$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.loadEvents),
      switchMap(({ request }) =>
        eventsService.getAllEvents(request).pipe(
          map((events) => EventsActions.loadEventsSuccess({ events })),
          catchError((error) => of(EventsActions.loadEventsFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const GetEvent$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.loadEventDetails),
      switchMap(({ eventId }) =>
        eventsService.getEvent(eventId).pipe(
          map((event) => EventsActions.loadEventDetailsSuccess({ event })),
          catchError((error) =>
            of(EventsActions.loadEventDetailsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const CreateEvent$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.createEvent),
      switchMap(({ event }) =>
        eventsService.createEvent(event).pipe(
          map((createdEvent) => EventsActions.createEventSuccess({ event: createdEvent })),
          catchError((error) => of(EventsActions.createEventFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const updateEvent$ = createEffect(
  (action$ = inject(Actions), eventsService = inject(EventsService)) => {
    return action$.pipe(
      ofType(EventsActions.updateEvent),
      switchMap(({ eventId, event }) =>
        eventsService.updateEvent(eventId, event).pipe(
          map((updatedEvent) => EventsActions.updateEventSuccess({ event: updatedEvent })),
          catchError((error) => of(EventsActions.updateEventFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteEvent$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.deleteEvent),
      tap(({ eventId }) => console.log('Attempting to delete event ID:', eventId)),
      switchMap(({ eventId }) =>
        eventsService.deleteEvent(eventId).pipe(
          tap(() => console.log('Successfully deleted event ID:', eventId)),
          map(() => EventsActions.deleteEventSuccess({ eventId })),
          catchError((error) => {
            console.error('Delete error for ID:', eventId, 'Error:', error);
            return of(
              EventsActions.deleteEventFailure({
                error: error.message,
                eventId,
              }),
            );
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const BookEvent$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.bookEvent),
      switchMap(({ request }) =>
        eventsService.bookEvent(request).pipe(
          map((bookingResponse) => EventsActions.bookEventSuccess({ bookingResponse })),
          catchError((error) => of(EventsActions.bookEventFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const cancelBooked$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.cancelBooking),
      switchMap(({ request }) =>
        eventsService.cancelEvent(request).pipe(
          map((bookingResponse) => EventsActions.cancelBookingSuccess({ bookingResponse })),
          catchError((error) => of(EventsActions.cancelBookingFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getBooked$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.loadBookedEvents),
      switchMap(({ request }) =>
        eventsService.getBookedEvents(request).pipe(
          map((events) => EventsActions.loadBookedEventsSuccess({ events })),
          catchError((error) =>
            of(EventsActions.loadBookedEventsFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const isBooked$ = createEffect(
  (actions$ = inject(Actions), eventsService = inject(EventsService)) => {
    return actions$.pipe(
      ofType(EventsActions.checkEventBookingStatus),
      switchMap(({ request }) =>
        eventsService.isEventBooked(request).pipe(
          map((isBooked) =>
            EventsActions.checkEventBookingStatusSuccess({
              eventId: request.id, // Just pass the ID we need
              isBooked,
            }),
          ),
          catchError((error) =>
            of(EventsActions.checkEventBookingStatusFailure({ error: error.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const eventsEffects = {
  GetEvents$,
  GetEvent$,
  CreateEvent$,
  updateEvent$,
  deleteEvent$,
  BookEvent$,
  cancelBooked$,
  getBooked$,
  isBooked$,
};
