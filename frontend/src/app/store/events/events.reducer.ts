import { createReducer, on } from '@ngrx/store';
import { EventResponse, EventsState } from './events.model';
import { EventsActions } from './events.action';

export const initialState: EventsState = {
  events: [],
  event: null,
  bookedEvents: [],
  isLoading: false,
  error: null,
  bookingStatus: {},
};

export const eventsReducer = createReducer(
  initialState,
  on(EventsActions.loadEventDetails, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.loadEventDetailsSuccess, (state, { event }) => ({
    ...state,
    event,
    isLoading: false,
    error: null,
  })),
  on(EventsActions.loadEventDetailsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.createEvent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.createEventSuccess, (state, { event }) => ({
    ...state,
    events: [...state.events, event],
    isLoading: false,
    error: null,
  })),
  on(EventsActions.createEventFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.updateEvent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.updateEventSuccess, (state, { event }) => ({
    ...state,
    events: state.events.map((e) => (e.id === event.id ? event : e)),
    isLoading: false,
    error: null,
  })),
  on(EventsActions.updateEventFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.deleteEvent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.deleteEventSuccess, (state, { eventId }) => ({
    ...state,
    events: state.events.filter((event: EventResponse) => Number(event.id) !== eventId),
    isLoading: false,
  })),
  on(EventsActions.deleteEventFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.bookEvent, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.bookEventSuccess, (state, { bookingResponse }) => ({
    ...state,
    msg: bookingResponse.msg,
    isLoading: false,
    error: null,
  })),
  on(EventsActions.bookEventFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.cancelBooking, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.cancelBookingSuccess, (state, { bookingResponse }) => ({
    ...state,
    msg: bookingResponse.msg,
    isLoading: false,
    error: null,
  })),
  on(EventsActions.cancelBookingFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.loadBookedEvents, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.loadBookedEventsSuccess, (state, { events }) => ({
    ...state,
    bookedEvents: events,
    isLoading: false,
    error: null,
  })),
  on(EventsActions.loadBookedEventsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(EventsActions.checkEventBookingStatus, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.checkEventBookingStatusSuccess, (state, { eventId, isBooked }) => ({
    ...state,
    bookingStatus: {
      ...state.bookingStatus,
      [eventId]: isBooked,
    },
    isLoading: false,
    error: null,
  })),
  on(EventsActions.checkEventBookingStatusFailure, (state, { error }) => ({
    ...state,
    booked: false,
    isLoading: false,
    error,
  })),
  on(EventsActions.loadEvents, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(EventsActions.loadEventsSuccess, (state, { events }) => ({
    ...state,
    events,
    isLoading: false,
    error: null,
  })),
  on(EventsActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);
