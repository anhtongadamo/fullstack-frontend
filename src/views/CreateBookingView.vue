<template>
  <div class="create-booking">
    <h2 style="margin-bottom: 30px">Create New Booking</h2>
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field v-model="name" label="Tour Name" readonly></v-text-field>
      <v-text-field v-model="price" label="Price ($)" readonly></v-text-field>
      <v-select
        v-model="date"
        :error-messages="dateErrors"
        :items="filterTourDates"
        label="Tour Date"
        item-text="date"
        item-value="value"
        required
        @input="$v.date.$touch()"
        @blur="$v.date.$touch()"
      ></v-select>
      <div
        class="d-flex align-center justify-space-between"
        style="margin: 30px 0"
      >
        <h4>Passengers</h4>
        <v-btn @click="addPassenger" color="primary">Add passengers</v-btn>
      </div>
      <div>
        <v-row
          v-for="(passenger, index) in passengers"
          :key="index"
          class="row-item"
        >
          <v-col cols="12" md="6">
            <v-text-field
              v-model="passenger.given_name"
              label="Given Name"
              required
              :error-messages="
                getErrorMessage(
                  'given_name',
                  'Given name',
                  $v.passengers.$each[index]
                )
              "
              @input="$v.passengers.$each[index].given_name.$touch()"
              @blur="$v.passengers.$each[index].given_name.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="passenger.email"
              required
              label="Email"
              :error-messages="
                getErrorMessage('email', 'Email', $v.passengers.$each[index])
              "
              @input="$v.passengers.$each[index].email.$touch()"
              @blur="$v.passengers.$each[index].email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="passenger.passport"
              label="Passport"
              required
              :error-messages="
                getErrorMessage(
                  'passport',
                  'Passport',
                  $v.passengers.$each[index]
                )
              "
              @input="$v.passengers.$each[index].passport.$touch()"
              @blur="$v.passengers.$each[index].passport.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="passenger.surname"
              label="Surname"
              required
              :error-messages="
                getErrorMessage(
                  'surname',
                  'Surname',
                  $v.passengers.$each[index]
                )
              "
              @input="$v.passengers.$each[index].surname.$touch()"
              @blur="$v.passengers.$each[index].surname.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="passenger.mobile"
              required
              label="Mobile"
              :error-messages="
                getErrorMessage('mobile', 'Mobile', $v.passengers.$each[index])
              "
              @input="$v.passengers.$each[index].mobile.$touch()"
              @blur="$v.passengers.$each[index].mobile.$touch()"
            ></v-text-field>
            <v-dialog v-model="passenger.dialog" persistent max-width="290">
              <template v-slot:activator="{}">
                <v-text-field
                  v-model="passenger.birth_date"
                  label="Date of birth"
                  required
                  readonly
                  :error-messages="
                    getErrorMessage(
                      'birth_date',
                      'Date of birth',
                      $v.passengers.$each[index]
                    )
                  "
                  @input="$v.passengers.$each[index].birth_date.$touch()"
                  @blur="$v.passengers.$each[index].birth_date.$touch()"
                  @click="toggleDate(index)"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="passenger.birth_date"
                @input="toggleDate(index)"
              ></v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="passenger.special_request"
              label="Special request"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn @click="removePassenger(index)" color="error">Remove</v-btn>
          </v-col>
        </v-row>
      </div>

      <v-btn class="mr-4" type="submit" color="secondary"> submit </v-btn>
      <v-btn @click="back"> Cancel </v-btn>
    </v-form>

    <IndicatorLoading :isLoading="isLoading" />
  </div>
</template>

<script>
import IndicatorLoading from "@/components/IndicatorLoading.vue";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateBookingView",
  components: { IndicatorLoading },
  mixins: [validationMixin],
  data: () => ({
    name: "",
    price: "",
    date: "",
    passengers: [],
    isLoading: false,
  }),
  validations: {
    date: { required },
    passengers: {
      $each: {
        given_name: { required, maxLength: maxLength(128) },
        surname: { required, maxLength: maxLength(64) },
        email: { required, email, maxLength: maxLength(128) },
        mobile: { required, maxLength: maxLength(16) },
        passport: { required, maxLength: maxLength(16) },
        birth_date: { required },
      },
    },
  },
  computed: {
    ...mapGetters({
      tour: "tour/getTour",
      tourDates: "tour/getTourDates",
    }),
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push("Date is required.");
      return errors;
    },
    filterTourDates() {
      return this.tourDates.filter((item) => {
        // if date is enabled then return them
        if (item.status === 1) {
          return item;
        }
      });
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions({
      createBooking: "booking/createBooking",
      getTour: "tour/getTour",
    }),
    getErrorMessage(fieldName, name, validationObject) {
      const errors = [];
      if (!validationObject[fieldName].$dirty) return errors;
      !validationObject[fieldName].required &&
        errors.push(`${name} is required.`);

      // Check if the field is email and email valid or not
      if (
        !validationObject[fieldName].email &&
        validationObject[fieldName].$error
      ) {
        !validationObject[fieldName].email && errors.push(`${name} is invalid`);
      }

      // Check if the field has maxLength or not
      if (validationObject[fieldName].maxLength) {
        !validationObject[fieldName].maxLength &&
          errors.push(`${name} must be at most 64 characters long.`);
      }
      return errors;
    },
    async fetchData() {
      try {
        this.isLoading = true;
        await this.getTour(this.$route.params.id);
        this.name = this.tour.name;
        this.price = this.tour.price;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleDate(index) {
      this.passengers[index].dialog = !this.passengers[index].dialog;
    },
    addPassenger() {
      this.passengers.push({
        given_name: null,
        surname: null,
        email: null,
        mobile: null,
        passport: null,
        birth_date: null,
        special_request: null,
        dialog: false,
      });
    },
    removePassenger(index) {
      this.passengers.splice(index, 1);
    },
    async submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const payload = {
        tour_date: this.date,
        passengers: this.passengers,
      };
      console.log("Final payload", payload);

      await this.createBooking({ payload, tourId: this.$route.params.id });
      this.$toast.success("Create booking successfully !", {
        timeout: 5000,
      });
      this.$router.push("/bookings");
    },
    back() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.create-booking {
  width: 700px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
}
.mb-3 {
  margin-bottom: 30px;
}
.row-item {
  background-color: #f7f7f7;
  margin-bottom: 30px;
  border-radius: 5px;
}
</style>
