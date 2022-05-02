export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;  //accesing the getter with the coach state in getters module/.
    const userId = rootGetters.userId; //accesing rootgettters's user id from rootgetters
    return coaches.some(coach => coach.id === userId); // this will find a coach id that if we already have it added. else will return false.
  }
};

