export const BACKEND_WAKE_MESSAGE =
  "Please wait a few minutes and try again. Render can take 2-3 minutes to wake the backend web service.";

export const getApiErrorMessage = (error, fallbackMessage = "Something went wrong. Try again.") => {
  return error?.userMessage || error?.response?.data?.message || fallbackMessage;
};
