export const state = () => ({
    recipes: [],
    fetcherStatus: '',
    fetcherIndex: 0
})

export const mutations = {
    set(state, recipes) {
        state.recipes = recipes
    },

    setFetcherStatus(state, status) {
        state.fetcherStatus = status;
    },

    setFetcherIndex(state, index) {
        state.fetcherIndex = index;
    }
}

export const actions = {
    async getRecipes({ commit }) {
        const recipes = await this.$http.$get(`/api/recipes`);
        commit('set', recipes);
    },

    async deleteAll({ dispatch }) {
        await this.$http.$delete(`/api/recipes`);
        dispatch('getRecipes');
    },

    async fetch({ commit, dispatch }) {
        await this.$http.$post(`/api/recipes/fetcher/start`);
        let refreshStatusInterval = setInterval(async () => {
            let statusAndIndex = await this.$http.$get(`/api/recipes/fetcher/status`);
            commit('setFetcherStatus', statusAndIndex.status);
            commit('setFetcherIndex', statusAndIndex.index);
            if (statusAndIndex.status == 'done') {
                clearInterval(refreshStatusInterval);
                dispatch('getRecipes');
            }
        }, 1000);
    },

    async getFetcherStatus({ commit }) {
        const statusAndIndex = await this.$http.$get(`/api/recipes/fetcher/status`);
        commit('setFetcherStatus', statusAndIndex.status);
        commit('setFetcherIndex', statusAndIndex.index);
    }
}