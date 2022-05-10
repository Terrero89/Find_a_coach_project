export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },

  shouldUpdate(state) {
    //? access last fetch mutation
    const lastFetch = state.lastFetch;
    //? we check if last fetch is null or falsey
    //? if it is we return true(no time stamp), that means that we update teh section.
    if (!lastFetch) {
      return true;
    }
    //* this will ensure that the time staps was a minute or longer ago.
    const currentTimeStamp = new Date().getTime();
    //*we deduct currenttime stap to last time fetched. that ensures when we need to update again, if less than 60 seconds.
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};