import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index'
const store = createStore({
  modules: {
    coaches: coachesModule,
    requests:requestsModule
  },
  state() {
    //user that will use the app currently
    //userID will manage the user ID's that will interact with the App
    return {
      userId: 'c3'
    };
  },
  //this getter will provide the user id state, (if logged in or not etc...)
  getters: {
    
    userId(state) {
      return state.userId;
    }
  }
});

export default store;