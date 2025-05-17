import { createFeature, createSelector } from '@ngrx/store';
import { eventsReducer } from './events.reducer';
import { selectAuthState } from '../auth/auth.selector';

export const eventsFeature = createFeature({
  name: 'events',
  reducer: eventsReducer,
  extraSelectors: ({
    selectEvents,
    selectEvent,
    selectBookedEvents,
    selectIsLoading,
    selectError,
    selectBookingStatus,
  }) => ({
    selectEventsState: createSelector(
      selectEvents,
      selectEvent,
      selectBookedEvents,
      selectIsLoading,
      selectError,
      selectBookingStatus,
      (events, event, bookedEvents, isLoading, error) => ({
        events,
        event,
        bookedEvents,
        isLoading,
        error,
      }),
    ),
  }),
});

export const selectBookingStatus = createSelector(
  eventsFeature.selectBookingStatus,
  (bookingStatus) => bookingStatus,
);

export const selectUserId = createSelector(selectAuthState, (state) => state.user?.id);

export const selectUserName = createSelector(
  selectAuthState,
  (state) => state.user?.name || state.user?.email,
);

export const {
  selectEvents,
  selectEvent,
  selectBookedEvents,
  selectIsLoading,
  selectError,
  selectEventsState,
} = eventsFeature;
