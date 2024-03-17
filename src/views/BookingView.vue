<template>
  <div class="booking">
    <div class="booking-table">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Booking Id</th>
              <th class="text-left">Tour Name</th>
              <th class="text-left">Tour Date</th>
              <th class="text-left">Number of passengers</th>
              <th class="text-left">Status</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bookings" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.tour.name }}</td>
              <td>{{ item.tour_date }}</td>
              <td>{{ item.number_passengers }}</td>
              <td>{{ getStatusLabel(item.status) }}</td>
              <td style="width: 300px">
                <v-btn
                  color="primary"
                  elevation="2"
                  @click="edit(item.id)"
                  class="btn-edit"
                  >Edit</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>

    <IndicatorLoading :isLoading="isLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IndicatorLoading from "@/components/IndicatorLoading.vue";

export default {
  name: "BookingView",
  components: { IndicatorLoading },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      bookings: "booking/getBookings",
    }),
  },
  methods: {
    ...mapActions({
      setBookings: "booking/setBookings",
    }),
    edit(bookingId) {
      this.$router.push(`/edit-booking/${bookingId}`);
    },
    getStatusLabel(status) {
      return status === 1 ? "Submitted" : "Cancelled";
    },
  },
  async created() {
    this.isLoading = true;
    await this.setBookings();
    this.isLoading = false;
  },
};
</script>
<style lang="scss" scoped>
.booking-table {
  width: 70%;
  margin: 50px auto;
}
.btn-edit {
  margin-right: 10px;
}
</style>
