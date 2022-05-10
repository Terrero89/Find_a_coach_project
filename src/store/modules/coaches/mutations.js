export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  //* mutation that will hold on the timestamp to reload coaches. 
//*will give us the time when the time starts, could say that is a snapshot of the time.
//*we are going to commit this action everytime we commit any data
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();  
  }
};