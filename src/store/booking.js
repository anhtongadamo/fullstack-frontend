/* eslint-disable */
import {
  getBookings,
  createBooking,
  getBooking,
  updateBooking,
} from "../services/booking";

const state = () => ({
  bookings: [],
  booking: null,
  passengers: []
});

const actions = {
  async setBookings({ commit }) {
    const response = await getBookings();
    commit("SET_BOOKINGS", response.data.data);
  },
  async getBooking({ commit }, bookingId) {
    const response = await getBooking(bookingId);
    const passengers = response.data.data.passengers.map(item => {
      return {
        ...item.passenger,
        special_request: item.special_request,
        dialog: false,
        isNewBooking: false
      }
    });

    commit("SET_BOOKING", response.data.data);
    commit("SET_PASSENGERS", passengers);
  },
  async createBooking({ commit }, { payload, tourId }) {
    const response = await createBooking(payload, tourId);
    commit("SET_BOOKING", response.data.data);
  },

  async updateBooking({ commit }, { payload, bookingId }) {
    const response = await updateBooking(payload, bookingId);
    commit("SET_BOOKING", response.data.data);
  },
};

const mutations = {
  SET_BOOKING(state, booking) {
    state.booking = booking;
  },
  SET_BOOKINGS(state, bookings) {
    state.bookings = bookings;
  },
  SET_PASSENGERS(state, passengers) {
    state.passengers = passengers;
  },
};

const getters = {
  getBooking(state) {
    return state.booking;
  },
  getBookings(state) {
    return state.bookings;
  },
  getPassengers(state) {
    return state.passengers;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
