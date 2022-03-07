import axios from 'axios';
import queryString from 'query-string';
import { auth } from './firebase';

const getFirebaseToken = async () => {
  console.log('start getFirebaseToken');
  const currentUser = auth.currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }
  // Not logged in
  // check in local (localStorage or IndexedDB) if firebase-loggedin is null
  const hasRememberedAccount = true; // we assume if it still there
  if (!hasRememberedAccount) return null;

  // Logged in but currentUser is not fetched --> wait (10s)
  return new Promise((resolve, reject) => {
    const waitTimer = setTimeout(() => {
      reject(null);
      console.log('Reject timeout getFirebaseToken');
    }, 10000);

    const unsubscribeAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return reject(null);
      }

      const token = await user.getIdToken();
      console.log('[AXIOS] Logged in user Token', token);
      resolve(token);

      unsubscribeAuthObserver();
      clearTimeout(waitTimer);
    });
  });
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // Handle token here
    const token = await getFirebaseToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
