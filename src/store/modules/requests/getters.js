export default {

    // requests(state){                 //?for this example we are displaying message to all coaches.
    //    return state.requests        //? return a list of requests
    // },

    requests(state, _, _2, rootGetters){   
        //? since user id is part of rootGetters,  in the root index store
        //?we use the rootGetter    
        // *TODO: we are going to filter the messages depending on user or coach   
        const coachId = rootGetters.userId;
        console.log(state.requests)
        return state.requests.filter(req => req.coachId === coachId)    //*TODO: this way we can filter the message if message id is equael to coach id.   
            
    },



    hasRequests(_, getters){
        //?Used to display the list of requests but changed to....
            //return state.requests && state.requests.length > 0      //evaluates to true or false if contans 0 or more elements in it
            //*TODO: now we are using the requests getters 
            return getters.requests && getters.requests.length > 0
        }

}