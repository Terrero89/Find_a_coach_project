//register the vuex store
import {createStore} from 'vuex';

import coachesModule from './modules/coaches/index.js' //import the modules we are going to use
const store = createStore({

    modules:{
            coaches:coachesModule,          //reference to the just imported coach module above
    },


});

export default store;