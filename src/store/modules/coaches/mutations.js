export default {
  //*TODO: Mutation that will push the object to the store.
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },


  //*TODO: Mutation that will fetch the mentors data and display it in the CoachesList component
  setCoaches(state,payload){
    state.coaches = payload //* the state of the coaches state in the store is equal to the payload or data
  }
};