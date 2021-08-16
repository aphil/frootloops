<template>
  <v-layout row wrap>
    <a href="https://www.google.com">This is a link!</a>
     <v-card
      v-for="recipe in matches"
      :key="recipe.id"
      class="mx-auto my-12"
      max-width="374"
    >
      <v-card-title>{{ recipe.name }}</v-card-title>
      <v-img :src="recipe.imageUrl" height="250px"></v-img>
      <v-card-text v-html="recipe.highlight"></v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import RecipeList from "../components/RecipeList.vue";
// import FlyersList from "../components/FlyersList.vue";
// import FetcherStatus from "@/components/FetcherStatus.vue";
export default {
  // components: { RecipeList, FlyersList, FetcherStatus },
  async asyncData({ store, params }) {
    let getRecipes = store.dispatch("matches/getMatches");
    // let getFlyers = store.dispatch("flyer/getFlyers");

    await getRecipes;
    // await getFlyers;
  },

  computed: {
    ...mapState("matches", {
      matches: "matches",
    }),
  },

  // methods: {
  //   ...mapActions("recipe", {
  //     fetchRecipes: "fetch"
  //   }),
  // },
};
</script>
