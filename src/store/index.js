import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';
const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  },
      //*TODO: we are going to remove this from here, 
  //*TODO: we are going to use that global state from the index auth module.
  // state() {
  //   return {

   
  //     userId: 'c2'
  //   };
  // },
  //*TODO: we are going to removed this from here, becase we are going to authenticate in the auth module.
  //*TODO: we are going to use that getter from
  // getters: {
  //   userId(state) {
  //     return state.userId;
  //   }
//   }
}
);


export default store;


