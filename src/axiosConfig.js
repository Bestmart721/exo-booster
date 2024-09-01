// src/axiosConfig.js
import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('Request:', config);
    // You can modify the request config here
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log('Response:', response);
    return response;
  },
  function (error) {
    // If the response has an error status
    if (error.response && error.response.status === 401) {
      // Handle 401 error here
      console.log('Unauthorized access - 401');

      // post error to the server
      axios.post(
        `https://sitebugreport-l2ugzeb65a-uc.a.run.app/`,
        {
          userId: undefined,
          errorPagePath: window.location.pathname,
          errorMessage: 'Unauthorized access - 401',
        }
      ).then((response) => {
        console.log(response.data);
        console.log("Error reported to the server.");
      });

      // Example: Redirect to Login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;



// axios.post(
//   `https://sitebugreport-l2ugzeb65a-uc.a.run.app/`,
//   {
//     userId: user?.uid || undefined,
//     errorPagePath: window.location.pathname,
//     errorMessage: error.stack,
//   }
// ).then((response) => {
//   console.log(response.data);
//   console.log("Error reported to the server.");
// });