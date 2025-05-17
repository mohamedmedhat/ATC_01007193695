import { createActionGroup, props } from '@ngrx/store';
import {
  BookedEventResponse,
  BookEventRequest,
  EventResponse,
  GetBookedEventsRequest,
  GetEventsRequest,
} from './events.model';

export const EventsActions = createActionGroup({
  source: 'Events',
  events: {
    // Event management
    'Load Events': props<{ request: GetEventsRequest }>(),
    'Load Events Success': props<{ events: EventResponse[] }>(),
    'Load Events Failure': props<{ error: string }>(),

    'Load Event Details': props<{ eventId: number }>(),
    'Load Event Details Success': props<{ event: EventResponse }>(),
    'Load Event Details Failure': props<{ error: string }>(),

    'Create Event': props<{ event: FormData }>(),
    'Create Event Success': props<{ event: EventResponse }>(),
    'Create Event Failure': props<{ error: string }>(),

    'Update Event': props<{ eventId: number; event: FormData }>(),
    'Update Event Success': props<{ event: EventResponse }>(),
    'Update Event Failure': props<{ error: string }>(),

    'Delete Event': props<{ eventId: number }>(),
    'Delete Event Success': props<{ eventId: number }>(),
    'Delete Event Failure': props<{ error: string, eventId?: number }>(),

    // Booking management
    'Book Event': props<{ request: BookEventRequest }>(),
    'Book Event Success': props<{ bookingResponse: BookedEventResponse }>(),
    'Book Event Failure': props<{ error: string }>(),

    'Cancel Booking': props<{ request: BookEventRequest }>(),
    'Cancel Booking Success': props<{ bookingResponse: BookedEventResponse }>(),
    'Cancel Booking Failure': props<{ error: string }>(),

    'Load Booked Events': props<{ request: GetBookedEventsRequest }>(),
    'Load Booked Events Success': props<{ events: EventResponse[] }>(),
    'Load Booked Events Failure': props<{ error: string }>(),

    'Check Event Booking Status': props<{ request: BookEventRequest }>(),
    'Check Event Booking Status Success': props<{ eventId: number; isBooked: boolean }>(),
    'Check Event Booking Status Failure': props<{ error: string }>(),
  },
});
