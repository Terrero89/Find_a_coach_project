export default {
    //*difference is with signup is that this is suppose to sign in and test users that are in the database.
    async login(context,payload) {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk',
            {
              method: 'POST',
              body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
              })
            }
          );
      
          const responseData = await response.json();
      
          if (!response.ok) {
            console.log(responseData);
            const error = new Error(
              responseData.message || 'Failed to authenticate. Check your login data.'
            );
            throw error;
          }
      
          console.log(responseData);
          context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
          });

        
    
    },

    //*TODO: initial sign up where the data will be sent to the store and data 
    //* the api key needs to be change to signup instead of signin with... et...
    async signup(context, payload) {
       const response =  await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk', {

            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })

        const responseData = await response.json();
        if(!response.ok){
            console.log(responseData)
            const error = new Error(responseData.message || 'Failed to authenticate')
            throw error
        }
        console.log(responseData)
        //*TODO: we are going to commit the mutation setUser
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
        })
    }
}


