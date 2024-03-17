<template>
  <div class="tour-table">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">TourID</th>
            <th class="text-left">Tour Name</th>
            <th class="text-left">Itinerary</th>
            <th class="text-left">Price</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tours" :key="item.name">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.itinerary }}</td>
            <td>{{ item.price }}</td>
            <td style="width: 300px">
              <v-btn
                color="primary"
                elevation="2"
                class="btn-edit"
                @click="edit(item.id)"
                >Edit</v-btn
              >
              <v-btn
                color="secondary"
                elevation="2"
                class="btn-booking"
                @click="booking(item.name, item.id)"
                >Booking</v-btn
              >
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <IndicatorLoading :isLoading="isLoading" />
  </div>
</template>

<script>
import IndicatorLoading from "@/components/IndicatorLoading.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HomeView",

  components: { IndicatorLoading },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      tours: "tour/getTours",
    }),
  },
  methods: {
    ...mapActions({
      setTours: "tour/setTours",
    }),
    edit(tourId) {
      this.$router.push(`/edit-tour/${tourId}`);
    },
    booking(tourName, tourId) {
      this.$router.push(`/create-booking/${tourName}/${tourId}`);
    },
  },
  async created() {
    this.isLoading = true;
    await this.setTours();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.tour-table {
  width: 60%;
  margin: 50px auto;
}
.btn-edit {
  margin-right: 10px;
}
</style>
