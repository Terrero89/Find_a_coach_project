export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    //*this is the tokem from the getters we are using in a variable
    const token = context.rootGetters.token

//*TODO: we add ?auth=[token code.]
    const response = await fetch(
      `https://find-mentor-project-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();

    //*TODO: here we determine if is 60 secs or longer, if it is then we update
    //*TODO: We now are able to go the exact id that is sending the token
    if (!response.ok) {     //? if response is not longer than 60 secs. we return, and skip the step and wll no send request..
      // error ...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  },
  //*TODO: we add payload to  be able to refresh forcing the non refresh to do it .
  //*TODO: if does not have a payload.forceRefresh, abd should update, then we skip load coaches, the the above commite register coach.
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
   
    const response = await fetch(
      `https://find-mentor-project-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    //*mutation that will hold the time stamp 
    context.commit('setFetchTimestamp');
  }
};
