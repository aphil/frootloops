<template>
  <v-layout row wrap>
    <v-card
      class="mx-auto my-12"
      max-width="374"
      v-for="flyer in flyers"
      :key="flyer.id"
    >
      <v-card-title> {{ flyer.name }} </v-card-title>
      <v-img :src="flyer.imageUrl" />
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: {
    flyers: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>