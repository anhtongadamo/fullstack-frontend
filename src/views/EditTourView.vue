<template>
  <div class="create-tour">
    <h2 style="margin-bottom: 30px">Edit Tour</h2>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="256"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-textarea
        class="mb-3"
        v-model="itinerary"
        :error-messages="itineraryErrors"
        label="Itinerary"
        :counter="500"
        required
        @input="$v.itinerary.$touch()"
        @blur="$v.itinerary.$touch()"
      ></v-textarea>

      <v-text-field
        v-model="price"
        :error-messages="priceErrors"
        :counter="10"
        label="Price ($)"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>

      <div
        class="d-flex align-center justify-space-between"
        style="margin: 30px 0"
      >
        <h4>Tour available Dates</h4>
        <v-btn @click="addTourDate" color="primary">Add Tour Date</v-btn>
      </div>
      <div>
        <v-row v-for="(tourDate, index) in tourDates" :key="index">
          <v-col cols="12" md="9">
            <v-dialog
              v-if="tourDate.isNewDate"
              v-model="tourDate.dialog"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{}">
                <v-text-field
                  v-model="tourDate.date"
                  label="Tour Date"
                  readonly
                  @click="toggleDate(index)"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tourDate.date"
                @input="toggleDate(index)"
              ></v-date-picker>
            </v-dialog>
            <v-text-field
              v-else
              v-model="tourDate.date"
              label="Tour Date"
              readonly
              :class="tourDate.status === 2 ? 'disabled' : ''"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn
              v-if="tourDate.isNewDate"
              @click="removeTourDate(index)"
              color="error"
              >Remove Date</v-btn
            >
            <v-btn
              v-else
              @click="disabledDate(tourDate.id, tourDate.status)"
              :color="tourDate.status === 1 ? 'error' : 'success'"
              >{{ tourDate.status === 1 ? "Disabled" : "Enabled" }}</v-btn
            >
          </v-col>
        </v-row>
      </div>

      <v-btn class="mr-4" type="submit" color="secondary"> submit </v-btn>
    </v-form>

    <IndicatorLoading :isLoading="isLoading" />
  </div>
</template>

<script>
import IndicatorLoading from "@/components/IndicatorLoading.vue";
import { validationMixin } from "vuelidate";
import { required, maxLength, integer } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditTourView",
  components: { IndicatorLoading },
  mixins: [validationMixin],
  data: () => ({
    name: "",
    itinerary: "",
    price: "",
    isLoading: false,
  }),
  validations: {
    name: { required, maxLength: maxLength(256) },
    price: { required, maxLength: maxLength(10), integer },
    itinerary: { required, maxLength: maxLength(500) },
  },
  computed: {
    ...mapGetters({
      tour: "tour/getTour",
      tourDates: "tour/getTourDates",
    }),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 256 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    itineraryErrors() {
      const errors = [];
      if (!this.$v.itinerary.$dirty) return errors;
      !this.$v.itinerary.maxLength &&
        errors.push("Itinerary must be at most 500 characters long");
      !this.$v.itinerary.required && errors.push("Itinerary is required");
      return errors;
    },

    priceErrors() {
      const errors = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.integer && errors.push("Price must be a number");

      !this.$v.price.maxLength &&
        errors.push("Price must be at most 10 integer");
      !this.$v.price.required && errors.push("Price is required");
      return errors;
    },
    listTourDates() {
      return this.tourDates
        .filter((item) => {
          if (item.isNewDate) {
            return item;
          }
        })
        .map((item) => {
          return item?.date;
        });
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      updateTour: "tour/updateTour",
      updateStatus: "tour/disableDates",
      getTour: "tour/getTour",
    }),
    async fetchData() {
      try {
        this.isLoading = true;
        await this.getTour(this.$route.params.id);
        this.name = this.tour.name;
        this.itinerary = this.tour.itinerary;
        this.price = this.tour.price;
        console.log("tourDates: ", this.tourDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleDate(index) {
      this.tourDates[index].dialog = !this.tourDates[index].dialog;
    },
    addTourDate() {
      this.tourDates.push({ date: null, dialog: false, isNewDate: true });
    },
    removeTourDate(index) {
      this.tourDates.splice(index, 1);
    },
    async disabledDate(id, status) {
      this.isLoading = true;

      const payload = {
        id_date: id,
        status: status === 1 ? 2 : 1,
      };
      await this.updateStatus({ payload, tourId: this.$route.params.id });
      this.isLoading = false;
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const payload = {
        name: this.name,
        itinerary: this.itinerary,
        price: this.price,
        status: "public",
      };
      if (this.listTourDates.length > 0) {
        payload.tour_date = this.listTourDates;
      }
      await this.updateTour({ payload, tourId: this.$route.params.id });

      this.$toast.success("Update tour successfully !", {
        timeout: 5000,
      });
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.create-tour {
  width: 700px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
}
.mb-3 {
  margin-bottom: 30px;
}

.disabled {
  text-decoration: line-through;
}
</style>
