import { axiosInstance } from "../plugins/axios";
const getBookings = async () => {
  return await axiosInstance.get("/bookings");
};

const getBooking = async (bookingId) => {
  return await axiosInstance.get(`/bookings/${bookingId}`);
};

const createBooking = async (payload, tourId) => {
  return await axiosInstance.post(`/bookings/${tourId}`, payload);
};

const updateBooking = async (payload, bookingId) => {
  return await axiosInstance.put(`/bookings/${bookingId}`, payload);
};

export { getBookings, getBooking, createBooking, updateBooking };
