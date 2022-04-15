//!getter is just to display or pull the information from the store, or 
//!to be able to evaluate what is inside of the object/array or just of the data

export default {
    //we get the state of the data by creating coaches object that takes state as parameter

    coaches(state){
        return state.coaches; //literally returns the data from coaches array

    },

    hasCoaches(state){
        return state.coaches && state.coaches.length > 0;
    }
    
}