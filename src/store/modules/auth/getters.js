export default {
//* taken from root index.
    userId(state) {
      return state.userId;
    },

    //*we add a token getter tobe able to use it in the url parameters.
    token(state){
        return state.token;
    },
    //* we will see when person is authenticated when they receive a token
    //* !! makes the expresion truthty
isAuthenticated(state){
        return !!state.token
},

didAutologout(state){
    return state.didAutologout;
}
};