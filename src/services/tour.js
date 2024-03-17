import { axiosInstance } from "../plugins/axios";
const getTours = async () => {
  return await axiosInstance.get("/tours");
};

const getTour = async (tourId) => {
  return await axiosInstance.get(`/tours/${tourId}`);
};

const createTour = async (payload) => {
  return await axiosInstance.post("/tours", payload);
};

const disableDates = async (payload, tourId) => {
  return await axiosInstance.post(`/tours-date/${tourId}/update`, payload);
};

const updateTour = async (payload, tourId) => {
  return await axiosInstance.put(`/tours/${tourId}`, payload);
};

export { getTours, createTour, disableDates, updateTour, getTour };
