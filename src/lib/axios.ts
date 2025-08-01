import axios from "axios";
import { useLocale } from "next-intl";

// Create axios instance
export const api = axios.create({});

// Add request interceptor to include locale parameter
api.interceptors.request.use((config) => {
  // Get the current locale from the URL or use default
  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split("/");
  const locale = pathSegments[1] || "ar"; // Default to 'ar' if not found

  // Add locale parameter to the URL if it doesn't already exist
  if (config.params) {
    config.params.locale = locale;
  } else {
    config.params = { locale };
  }

  return config;
});

// Add response interceptor to handle errors properly
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the error has a response with data, extract the custom message
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    } else if (error.response?.data?.error) {
      error.message = error.response.data.error;
    }

    return Promise.reject(error);
  }
);

// Export a hook for components that need to use axios with locale
export const useApi = () => {
  const locale = useLocale();

  // Create a new instance with the current locale
  const apiWithLocale = axios.create({
    params: { locale },
  });

  // Add the same response interceptor to the hook instance
  apiWithLocale.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // If the error has a response with data, extract the custom message
      if (error.response?.data?.message) {
        error.message = error.response.data.message;
      } else if (error.response?.data?.error) {
        error.message = error.response.data.error;
      }

      return Promise.reject(error);
    }
  );

  return apiWithLocale;
};
