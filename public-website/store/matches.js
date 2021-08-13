export const state = () => ({
    matches: []
})

export const mutations = {
    set(state, matches) {
        state.matches = matches;
    }
}

export const actions = {
    async getMatches({ commit }) {
        const matches = await this.$http.$get(`/api/matches`);
        commit('set', matches);
    }
}