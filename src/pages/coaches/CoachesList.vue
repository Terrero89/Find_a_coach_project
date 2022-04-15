<!-- We use props to send this list of coaches to the child components. -->
<!-- CoachItem-->
<template>
  <section>FILTER COACHES</section>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline"> Refresh</base-button>
        <base-button link to="register">Register a mentor</base-button>
      </div>

      <!--v-if to add evaluation to the stamente below-->
      <ul v-if="hasCoaches">
        <!--We are going to bind the data in child component CoachItem to display it     in the CoachList--->

        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
      <!--To display the No coahces found followed by the v-if --->
    </base-card>
  </section>
</template>

<!-- to use the getters in the template, is only within computed property -->

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
export default {
  components: {
    CoachItem,
  },
  computed: {
    //since is name spaced we grab the data from the namespace component
    filteredCoaches() {
      return this.$store.getters["coaches/coaches"]; //firsts is namespaced name,second the getter name
    },

    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
