const COMMON_LOCAL_URL = 'http://localhost:8080/api';
const COMMON_PROD_URL = 'https://api.example.com';
const CURRENT_VERSION = 'v1';

const STATUS = 'DEV';

const USED_URL = STATUS === 'DEV' ? COMMON_LOCAL_URL : COMMON_PROD_URL;

export const URLS = {
  AUTH: {
    LOGIN: `${USED_URL}/${CURRENT_VERSION}/users/auth/login`,
    REGISTER: `${USED_URL}/${CURRENT_VERSION}/users/auth/register`,
    REFRESH_TOKEN: `${USED_URL}/${CURRENT_VERSION}/users/auth/refresh-token`,
  },
  EVENTS: {
    ADMIN: {
      CREATE: `${USED_URL}/events`,
      UPDATE: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
      DELETE: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
    },
    PUBLIC: {
      GET_ALL: `${USED_URL}/${CURRENT_VERSION}/events`,
      GET_BY_ID: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
      BOOK_EVENT: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}/book`,
      CANCEL_EVENT: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}/cancel`,
      GET_BOOKED: (userId: string) => `${USED_URL}/${CURRENT_VERSION}/events/user/${userId}`,
      IS_EVENT_BOOKED: (eventId: number) =>
        `${USED_URL}/${CURRENT_VERSION}/events/${eventId}/isBooked`,
    },
  },
};
