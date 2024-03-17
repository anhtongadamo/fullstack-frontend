<template>
  <v-overlay :value="isLoading">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: "IndicatorLoading",
  components: {},
  props: ["isLoading"],
};
</script>

<style lang="scss" scoped></style>
