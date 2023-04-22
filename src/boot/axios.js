import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:1337/api/' })

export default boot(({ app, router }) => {

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api

  api.interceptors.request.use(function (config) {
    console.log("Interceptors request")
    config.headers.common["Accept"] = "application/json";
    config.headers.common["Content-Type"] = "application/json";
    config.headers.common["Access-Control-Allow-Origin"] = "*";
    config.headers.common["Access-Control-Allow-Credentials"] = true;
    config.headers.common["Access-Control-Allow-Credentials"] = true;
    config.headers.common["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS";
    config.processData = false;
    delete config.headers.common["X-Requested-With"];
    if (config.url.includes("auth") || config.url.includes("customers")) {
      config.async = true;
      config.crossDomain = true;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      config.headers["Cache-control"] = "no-cache";
      delete config.headers;
    } else {
      config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("finansofttoken").split("|")[1]}`;
    }
    return config;
  });

  /* api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status == 500) {
        showErrorMessage(
          error.response.data.Message,
          error.response.data.TypeMessageName
        );
      } else {
        showErrorMessage(
          error.response.data.Message,
          error.response.data.TypeMessageName
        );
      }
      return Promise.reject(error);
    }
  );
 */
})

export { api }
