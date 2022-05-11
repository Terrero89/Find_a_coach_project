import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      //* to fetch users and no reload everytime we add a coach.
      //* we will add a timestamp
      lastFetch: null,
      coaches: [
  
      ]
    };
  },
  mutations,
  actions,
  getters
};
