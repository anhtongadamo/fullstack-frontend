<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="main-header d-flex align-center justify-space-between">
        <h3>Booking Tour</h3>
        <nav>
          <router-link to="/">Tours</router-link> |
          <router-link to="/bookings">View Bookings</router-link> |
          <router-link to="/create-tour">Create new Tour</router-link>
        </nav>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.main-header {
  width: 100%;
}
.v-application a {
  color: #fff !important;
}
</style>
