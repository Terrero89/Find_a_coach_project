<template>
  <section>
    <base-card>
      <header>
        <h2>Request Received.</h2>
      </header>
      <ul v-if="hasRequests">
        <!-- We are going to render the requsts from vuex store that are coming form the getter received Request-->
        <!-- is binding the information coming from vuex, user email and message -->
        <!--  -->
        <request-item
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>

      <h3 v-else>You haven't receive any request yet.</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';



export default {
  components: { RequestItem },

  //*to used vuex data
  computed: {
    //* we are going to store the value of the message received.
    //* we are going to use the state of the requests module.
    receivedRequests() {
      return this.$store.getters['requests/requests'];
    },

    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>