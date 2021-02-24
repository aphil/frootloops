export const state = () => ({
    flyers: [],
    fetcherStatus: '',
    fetcherIndex: 0
})

export const mutations = {
    set(state, flyers) {
        state.flyers = flyers
    },

    setFetcherStatus(state, status) {
        state.fetcherStatus = status;
    },

    setFetcherIndex(state, index) {
        state.fetcherIndex = index;
    }
}

export const actions = {
    async getFlyers({ commit }) {
        const flyers = await this.$http.$get(`/api/flyers`);
        commit('set', flyers);
    },

    async deleteAll({ dispatch }) {
        await this.$http.$delete(`/api/flyers`);
        dispatch('getFlyers');
    },

    async fetch({ commit, dispatch }) {
        await this.$http.$post(`/api/flyers/fetcher/start`);
        let refreshStatusInterval = setInterval(async () => {
            let statusAndIndex = await this.$http.$get(`/api/flyers/fetcher/status`);
            commit('setFetcherStatus', statusAndIndex.status);
            commit('setFetcherIndex', statusAndIndex.index);
            if (statusAndIndex.status == 'done') {
                clearInterval(refreshStatusInterval);
                dispatch('getFlyers');
            }
        }, 1000);
    },

    async getFetcherStatus({ commit }) {
        const statusAndIndex = await this.$http.$get(`/api/flyers/fetcher/status`);
        commit('setFetcherStatus', statusAndIndex.status);
        commit('setFetcherIndex', statusAndIndex.index);
    }
}