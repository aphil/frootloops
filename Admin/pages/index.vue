<template>
  <v-container>
    <div>
      <h1>[Recettes]</h1>
      <v-btn v-on:click.stop.prevent="fetchRecipes">[Obtenir les recettes]</v-btn>
      <v-btn @click="deleteAllRecipes">[Supprimer les recettes]</v-btn>
      <fetcher-status
        v-if="recipesFetcherStatus != 'stopped'"
        :index="recipesFetcherIndex"
        :status="recipesFetcherStatus"
      ></fetcher-status>
      <recipe-list :recipes="recipes"></recipe-list>
      <h1>[Circulaire]</h1>
      <v-btn v-on:click.stop.prevent="fetchFlyers">[Obtenir les offres]</v-btn>
      <v-btn @click="deleteAllFlyers">[Supprimer les offres]</v-btn>
      <fetcher-status
        v-if="flyersFetcherStatus != 'stopped'"
        :index="flyersFetcherIndex"
        :status="flyersFetcherStatus"
      ></fetcher-status>
      <flyers-list :flyers="flyers"></flyers-list>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RecipeList from "../components/RecipeList.vue";
import FlyersList from "../components/FlyersList.vue";
import FetcherStatus from "@/components/FetcherStatus.vue";
export default {
  components: { RecipeList, FlyersList, FetcherStatus },
  async asyncData({ store, params }) {
    let getRecipes = store.dispatch("recipe/getRecipes");
    let getFlyers = store.dispatch("flyer/getFlyers");

    await getRecipes;
    await getFlyers;
  },

  computed: {
    ...mapState("recipe", {
      recipes: "recipes",
      recipesFetcherIndex: "fetcherIndex",
      recipesFetcherStatus: "fetcherStatus",
    }),
    ...mapState("flyer", {
      flyers: "flyers",
      flyersFetcherIndex: "fetcherIndex",
      flyersFetcherStatus: "fetcherStatus",
    }),
  },

  methods: {
    ...mapActions("recipe", {
      fetchRecipes: "fetch",
      deleteAllRecipes: "deleteAll",
    }),
    ...mapActions("flyer", {
      fetchFlyers: "fetch",
      deleteAllFlyers: "deleteAll",
    }),
  },
};
</script>

<style>
</style>
