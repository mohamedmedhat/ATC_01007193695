const COMMON_LOCAL_URL = 'http://localhost:8080/api';
const COMMON_PROD_URL = 'https://api.example.com';
const CURRENT_VERSION = 'v1';

const STATUS = 'DEV';

const USED_URL = STATUS === 'DEV' ? COMMON_LOCAL_URL : COMMON_PROD_URL;

export const URLS = {
  AUTH: {
    LOGIN: `${USED_URL}/${CURRENT_VERSION}/users/auth/login`,
    REGISTER: `${USED_URL}/${CURRENT_VERSION}/users/auth/register`,
    REFRESH_TOKEN: `${USED_URL}/${CURRENT_VERSION}/users/auth/refresh-token`, // not implemented in backend
    LOGOUT: `${USED_URL}/${CURRENT_VERSION}/users/auth/logout`,
  },
  EVENTS: {
    ADMIN: {
      CREATE: `${USED_URL}/${CURRENT_VERSION}/events`,
      UPDATE: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
      DELETE: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
    },
    PUBLIC: {
      GET_ALL: `${USED_URL}/${CURRENT_VERSION}/events`,
      GET_BY_ID: (id: number) => `${USED_URL}/${CURRENT_VERSION}/events/${id}`,
      BOOK_EVENT: (id: number, userId: string) =>
        `${USED_URL}/${CURRENT_VERSION}/events/${id}/book?userId=${userId}`,
      CANCEL_EVENT: (id: number, userId: string) =>
        `${USED_URL}/${CURRENT_VERSION}/events/${id}/cancel?userId=${userId}`,
      GET_BOOKED: (userId: string, page: number, size: number) =>
        `${USED_URL}/${CURRENT_VERSION}/events/user/${userId}?page=${page}&size=${size}`,
      IS_EVENT_BOOKED: (eventId: number, userId: string) =>
        `${USED_URL}/${CURRENT_VERSION}/events/${eventId}/isBooked?userId=${userId}`,
    },
  },
};
