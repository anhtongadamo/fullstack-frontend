<template>
  <div class="create-tour">
    <h2 style="margin-bottom: 30px">Create New Tour</h2>
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
            <v-dialog v-model="tourDate.dialog" persistent max-width="290">
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
          </v-col>
          <v-col cols="12" md="3">
            <v-btn @click="removeTourDate(index)" color="error"
              >Remove Date</v-btn
            >
          </v-col>
        </v-row>
      </div>

      <v-btn class="mr-4" type="submit" color="secondary"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, integer } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "CreateTourView",
  components: {},
  mixins: [validationMixin],
  data: () => ({
    name: "",
    itinerary: "",
    price: "",
    tourDates: [],
  }),
  validations: {
    name: { required, maxLength: maxLength(256) },
    price: { required, maxLength: maxLength(10), integer },
    itinerary: { required, maxLength: maxLength(500) },
  },
  computed: {
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
      return this.tourDates.map((item) => {
        return item.date;
      });
    },
  },
  methods: {
    ...mapActions({
      createTour: "tour/createTour",
    }),
    toggleDate(index) {
      this.tourDates[index].dialog = !this.tourDates[index].dialog;
    },
    addTourDate() {
      this.tourDates.push({ date: null, dialog: false });
    },
    removeTourDate(index) {
      this.tourDates.splice(index, 1);
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const payload = {
        name: this.name,
        itinerary: this.itinerary,
        tour_date: this.listTourDates,
        price: this.price,
        status: "public",
      };
      console.log("Final payload", payload);

      this.$toast.success("Create tour successfully !", {
        timeout: 5000,
      });

      await this.createTour(payload);
      this.$router.push("/");
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.itinerary = "";
      this.price = "";
      this.tourDates = [];
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
</style>
