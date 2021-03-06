<template>
  <v-layout row wrap>
    <v-card
      v-for="recipe in recipes"
      :key="recipe.id"
      class="mx-auto my-12"
      max-width="374"
    >
      <v-card-title>{{ recipe.name }}</v-card-title>
      <v-img :src="recipe.imageUrl" height="250px"></v-img>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>