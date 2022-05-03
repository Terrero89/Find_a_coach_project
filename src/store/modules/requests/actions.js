export default {

    //*this is the request to message the coach
    contactCoach(context, payload) {         //payload is the data coming from the contact coach component
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        }
        //*addRequest is the mutation from the mutations that will be changing the request
        //* the state of the received request
        //?this request will be sent to the requestItem components to change the state of requests.
        context.commit('addRequest', newRequest)

    }


}