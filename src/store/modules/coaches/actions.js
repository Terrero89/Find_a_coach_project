export default {
  registerCoach(context, data) {
    const coachData = {
      //! this will represent the user id that will use app. will be automatically assigned through the users id in the noot Index
      id: context.rootGetters.userId,     //accesing root index to grab the current userID and change state/
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    context.commit('registerCoach', coachData);
  }
};