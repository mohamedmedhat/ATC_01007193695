const COMMON_LOCAL_URL = 'http://localhost:8080';
const COMMON_PROD_URL = 'https://api.example.com';

const STATUS = 'DEV';

const USED_URL = STATUS === 'DEV' ? COMMON_LOCAL_URL : COMMON_PROD_URL;

export const URLS = {
  AUTH: {
    LOGIN: `${USED_URL}/auth/login`,
    REGISTER: `${USED_URL}/auth/register`,
  },
  EVENTS: {},
};
