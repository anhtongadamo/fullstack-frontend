/* eslint-disable */
import {
    getTours,
    createTour,
    getTour,
    disableDates,
    updateTour,
} from "../services/tour";

const state = () => ({
    tours: [],
    tour: null,
    tourDate: []
});

const actions = {
    async setTours({ commit }) {
        const response = await getTours();
        commit("SET_TOURS", response.data.data);
    },
    async getTour({ commit }, tourId) {
        const response = await getTour(tourId);
        const tourDates = response.data.data.tour_date.map(item => {
            return {
                ...item,
                dialog: false,
                isNewDate: false,
            }
        })
        commit("SET_TOUR", response.data.data);
        commit("SET_TOUR_DATE", tourDates);
    },
    async createTour({ commit }, tour) {
        const payload = {
            ...tour,
        };
        const response = await createTour(payload);

        commit("SET_TOUR", response.data.data);
    },
    async disableDates({ commit }, { payload, tourId }) {
        const response = await disableDates(payload, tourId);
        const tourDates = response.data.data.tour_date.map(item => {
            return {
                ...item,
                dialog: false,
                isNewDate: false,
            }
        })
        commit("SET_TOUR", response.data.data);
        commit("SET_TOUR_DATE", tourDates);
    },
    async updateTour({ commit }, { payload, tourId }) {
        const response = await updateTour(payload, tourId);
        commit("SET_TOUR", response.data.data);
    },
};

const mutations = {
    SET_TOUR(state, tour) {
        state.tour = tour;
    },
    SET_TOUR_DATE(state, tourDate) {
        state.tourDate = tourDate;
    },
    SET_TOURS(state, tours) {
        state.tours = tours;
    },
};

const getters = {
    getTour(state) {
        return state.tour;
    },
    getTourDates(state) {
        return state.tourDate;
    },
    getTours(state) {
        return state.tours;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
