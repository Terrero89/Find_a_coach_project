export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId
    console.log('user' + userId)
    const coachData = {
      //! this will represent the user id that will use app. will be automatically assigned through the users id in the noot Index
      // id: context.rootGetters.userId,  //? will change to the specific user id in the fetch, const added   //accesing root index to grab the current userID and change state/
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
    //*TODO: We are going to do the HTTPS requests
    //*TODO: we are going to fetch the list of coaches rendered for coachesList
    //* we are going to send the post req to the coach/(spcific id) 
    //*const response contain the information we are waiting to finish to send the data to database.
    const response = await fetch(`https://find-mentor-project-default-rtdb.firebaseio.com/coaches/${userId}.json`, {

    //! PUT request will allow to be overwriiten is existed, or just add if not existed/
    //!this is used for data that needs to be specific, like the coaches data
    //!cannot be duplicates or more than one coach with the same id.
      method: "PUT", 
      body: JSON.stringify(coachData)   //TODO: in this case, we convert it to json data, and add the coachData to the link we are going to send the coach
     })

     //const responseData = await response.json()
     //*if there is an error, then we display message.
     if(!response.ok){
       // error
     }
     //?instead of committing the data, we are going to do....
     //?an object that represents all the data in coachData
     //? with am id separately, so is no duplicate when sent to database.
    //*context.commit('registerCoach', coachData);
    context.commit('registerCoach', {
      ...coachData,
      id:userId
    });
  }
};