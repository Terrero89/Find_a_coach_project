<!-- Template use to contain the coaches lists to be displayed in CoachList -->

<template>
  <li>
    <h3>
      {{ fullName }}
    </h3>

    <h4>${{ rate }}</h4>
    <div>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"> </base-badge>
    </div>

    <div class="actions">
      <!-- binded to the links in computed to be usedwhen clicked. -->
      <base-button link mode="outline" :to="coachContactLink"
        >Contact
      </base-button>
      <base-button link :to="coachDetailsLink">Mentor Details </base-button>
    </div>
  </li>
</template>

<script>
export default {
  //we pass down the array with the coaches in CoachesList
  //then we use the information in the props to display it in here.
  props: ["id", "firstName", "lastName", "rate", "areas"],

  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },

    coachContactLink() {
      //we can return + '/coaches/' + this.id + '/contact'  or
      //!to use the current path as starting point
      return this.$route.path + "/" + this.id + "/contact"; //! this refers to the dynamic link we are going to usee
    },

    coachDetailsLink() {
      // return '/coaches/' + this.id;   or
      //! to use the current path as starting point.
      return this.$route.path + "/" + this.id; //!we want to go to the details of that specific mentor.
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
