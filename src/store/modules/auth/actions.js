let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
  
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk'

    if (mode === 'signup') {
    
      url =   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk'
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};




// //* global variable to clear or add time to the timer anywhere in the store.

// let timer;

// export default {
//     //*difference is with signup is that this is suppose to sign in and test users that are in the database.

//     //TODO we erase all past code and try to minimize the code. This
//     ///TODO we dispatch the auth payload along with all the payloads (spread operator and the mode will be log in)
//     async login(context, payload) {
//         return context.dispatch('auth', {
//             ...payload,
//             mode: 'login'
//         })
//     },
//        //*TODO: initial sign up where the data will be sent to the store and data 
//     //* the api key needs to be change to signup instead of signin with... et...
//     async signup(context, payload) {
//        return context.dispatch('auth', {
//             ...payload,
//             mode: 'signup'
//         })
//     },
//     //TODO: we are goint to add this action to prevent data to be erased everytime a refresh is done in the browser.
//     async auth(context,payload) {
//         //TODO we now difine what we are going to do with an if  statement. 
//         const mode = payload.mode //? fr login or signup
//         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk'

//         if(mode === 'signup'){
//             url =   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXKkcnS8glBBukvot7Vy-QLlhNAbqM7lk'
//         }
//         const response = await fetch(
//             //url will define the route selected above
//             url,
//             {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     email: payload.email,
//                     password: payload.password,
//                     returnSecureToken: true
//                 })
//             }
//         );

//         const responseData = await response.json();

//         if (!response.ok) {
//             console.log(responseData);
//             const error = new Error(
//                 responseData.message || 'Failed to authenticate. Check your login data.'
//             );
//             throw error;
//         }

//         //*EXPIRATION OF THE TOKEN WHILE LOGGED IN.
//         //* we multiply current date and time plus 60 minutes in miliseconds/
//         //*/ expirationData needs to be included in localStorage 
//         const expiresIn = responseData.expiresIn * 1000;
   
//         const expirationDate = new Date().getTime + expiresIn


//         //TODO we are going to save locally the data to support refresh on the browser with losing the data
//         localStorage.setItem('token', responseData.idToken);
//         localStorage.setItem('userId', responseData.userId);
//         localStorage.setItem('tokenExpiration', expirationDate)  //?expiration data included with the idToken and userId
       
       
//         //*timeout to log user out when time expires.
//         //*expiresIn is the time it will last. dispatch logout is what we are going to do when time expires.
//         timer = setTimeout(function(){
//             context.dispatch('autoLogout');
//         }, expiresIn)


//         context.commit('setUser', {
//             token: responseData.idToken,
//             userId: responseData.localId,
//             // tokenExpiration: expirationDate //? this is what will be sent once the process of authenticate starts/ we done even needed.
//         });
//     },

//  //*if the user is there, we store the user information, if user does not exist then we dont save it.
//  //* if not authenticated, and token and user id are ok, user will not be saved locally automatically.
// tryLogin(context){
//     const token = localStorage.getItem('token')
//     const userId = localStorage.getItem('userId')
//     const tokenExpiration = localStorage.getItem('tokenExpiration')
//     const expiresIn = +tokenExpiration - new Date().getTime()

//     //* if exceeds 0 then we return and do not excute time out. else, we excecute.
//     if(expiresIn < 0){
//         return;
//     }

//     timer = setTimeout(function(){
//         context.dispatch('autoLogout');
//     }, expiresIn)

//     if(token && userId){
//         context.commit('setUser', {
//             token:token,
//             userId:userId,
//             // tokenExpiration: null
//         })
//     }
// },
//     //*TODO: to log out user we set the data below to null, that means,
//     //*TODO: that we no need to do extra to be able to logout user.
//     //* we create a context to commit the same data to change them to null all together
//     logout(context) {
//               //TODO we are going to save locally the data to support refresh on the browser with losing the data
//         localStorage.removeItem('token');
//         localStorage.removeItem('userId');
//         localStorage.removeItem('tokenExpiration')
//         clearTimeout(timer); //? Will clear the timer 

//         context.commit('setUser', {
//             token: null,
//             userId: null,
          
//         })
//     },
//     //TODO: it will be redirecting the user once the set time out expires 
//     //TODO it will dispatch logout to log the user out and did auto log out to kick user out once time expires.
//     autoLogout(context) {
//         context.dispatch('logout');
//         context.commit('setAutoLogout');
//       }
// }


