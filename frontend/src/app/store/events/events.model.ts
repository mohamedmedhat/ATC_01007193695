export interface EventResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  images: {
    id: string;
    url: string;
  }[];
}

export interface BookedEventResponse {
  msg: string;
}

export interface EventsState {
  events: EventResponse[];
  event: EventResponse | null;
  bookedEvents: EventResponse[];
  isLoading: boolean;
  error: string | null;
  bookingStatus: { [eventId: number]: boolean };
}

export interface EventRequest {
  name: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  images: File[];
}

export interface GetEventsRequest {
  category?: string;
  page: number;
  size: number;
}

export interface BookEventRequest {
  id: number;
  userId: string;
}

export interface GetBookedEventsRequest {
  userId: string;
  page: number;
  size: number;
}
