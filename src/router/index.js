import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/bookings",
    name: "booking",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BookingView.vue"),
  },
  {
    path: "/create-booking/:tourName/:id",
    name: "createBooking",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateBookingView.vue"),
  },
  {
    path: "/edit-booking/:id",
    name: "editBooking",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditBookingView.vue"),
  },
  {
    path: "/create-tour",
    name: "createTour",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateTourView.vue"),
  },
  {
    path: "/edit-tour/:id",
    name: "editTour",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditTourView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
