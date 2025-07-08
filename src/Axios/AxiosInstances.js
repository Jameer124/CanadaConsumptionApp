import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    //const token = localStorage.getItem("token"); // Get the token from localStorage or any other storage
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTb3BVc2VyIiwiZW1haWwiOiJTb3BVc2VyQGludmVudGl6LmNvbSIsImp0aSI6ImMyNzE2YTA0LWY2YWQtNDIwNC1iZjYwLTA1YzFjOTU3MGMxMiIsIlVzZXJOYW1lIjoiU29wVXNlciIsImV4cCI6MTczOTk0NzEyNywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIyNiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMjYifQ.ypHqwag0hfmGhRNz9qYGPVeUcVnD9B0lpl8t8KkasT0"
   // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTb3BVc2VyIiwiZW1haWwiOiJTb3BVc2VyQGludmVudGl6LmNvbSIsImp0aSI6ImQ4ZjYzOGE5LTVmNWYtNGE5OS1iODExLWUzOWIyZTM1NjRiOCIsIlVzZXJOYW1lIjoiU29wVXNlciIsImV4cCI6MTczOTk0NTQ2OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIyNiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMjYifQ.qQJuLwWBN-Ex8gLfIIsYZ36OLVg-ZAl-HLfwesz6aiA"
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTb3BVc2VyIiwiZW1haWwiOiJTb3BVc2VyQGludmVudGl6LmNvbSIsImp0aSI6ImVlODYzZTE1LWE0N2YtNDIyMC1iZTg0LThiYjBjMjk0MDY5OSIsIlVzZXJOYW1lIjoiU29wVXNlciIsImV4cCI6MTczOTg5MDM3NiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIyNiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMjYifQ.1Dgpv3soys7_JCJZvaz2R9WfZNj2H2K8PaMzNdgb0S4"
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 400) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Unauthorized, redirecting to login...");
    } else if (error.response.status === 403) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("Forbidden....");
    } else if (error.response.status === 404) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("There is a not found call...");
    } else if (error.response.status === 500) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("There is a internal server error...");
    } else if (error.response.status === 502) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error("There is a Bad Gateway error...");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
