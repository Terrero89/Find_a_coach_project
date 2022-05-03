<template>
<div>
<!-- Base dialog is to show a backfrop to give the option to close the dialog once error shows up -->
<!-- we can bind the show prop to show the error once error message is catched by the catch primise -->
<!-- we use !!error because once reverse the false, and 2 of them return a true boolean,not a true value  since is null what we are using in the property-->
<base-dialog :show="!!error" title="An error occurred" @close="handleError">
<p>{{ error }}</p>
</base-dialog>
  <!-- you can send the emit event and the method used in child component -->
  <coach-filter @change-filter="setFilter"></coach-filter>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button
        >
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="hasCoaches">
       <coach-item 
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import BaseButton from '../../components/ui/BaseButton.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
export default {
  data() {
    return {

      isLoading: false,
      error: null, //* is the data prop for the error
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    BaseButton,
    CoachFilter,
    BaseSpinner,
    BaseDialog
},

  computed: {
    //* this will check if user is a coach and if some features are shown to him or not.

    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
      });
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    
  },

  methods: {
    //*method to display the coaches once the page is loaded.
    created(){
        this.loadCoaches()
    },
    //! we receive updated filters from child component to be able to pass it as an argument to setFilter w
    //!which will be triggered when 'change-filter changes
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    //! we can add async in load coaches to make it a promise and wait for a specific situation to finish 
    //! we add an argument to use it with forceRefresh
    async loadCoaches(refresh = false) {
      //*isLoading will be set to true when load coaches is being rendered/
      //* force refresh property is added to force refresh is the conditions in the actions are true
      this.isLoading = true;
      try{
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh : refresh});
      }catch(error){
        this.error = error.message || 'something went wrong.'
        
      }
      //*load coaches: is the action created in coaches/actions.js that will create and show users in coachlist
      //*the await keyword would way to be completed in order to excecute the dispatch
      //*we can also tr with try and catch options in promises to return the error
     
      this.isLoading = null;
    }
  },
  handleError(){
    this.error = true
  }
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