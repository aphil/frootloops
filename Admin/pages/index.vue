<template>
  <div class="container">
    <div>
      <h1>[Recettes]</h1>
      <div v-on:click.stop.prevent="fetch">[Obtenir les recettes]</div>
      <div @click="deleteAll">[Supprimer les recettes]</div>
      <fetcher-status v-if="fetcherStatus != 'stopped'" :index="fetcherIndex" :status="fetcherStatus"></fetcher-status>
      <recipe-list :recipes="recipes"></recipe-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RecipeList from "../components/RecipeList.vue";
import FetcherStatus from "@/components/FetcherStatus.vue";
export default {
  components: { RecipeList, FetcherStatus },
  async asyncData({ store, params }) {
    await store.dispatch("recipe/getRecipes");
  },

  computed: {
    ...mapState("recipe", ["recipes", "fetcherIndex", "fetcherStatus"]),
  },

  methods: {
    ...mapActions("recipe", ["fetch", "deleteAll"]),
  },
};
</script>

<style>
</style>
