<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  } ,
    computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  //* since app is the first component created, we want to dispatch the tryLoggin first here.
  created(){
    this.$store.dispatch('tryLogin')
  }, 
//* watcher that watch the state of didautolog if changes will excute some fucntion etc..
//* we are going to see if the old value is different is it is is true and we are going to be redirected to coaches.
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/coaches');
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

/* animatinos. */
/*we add the enter and leave with opacity 0,  */
/* this means is invisible at the beggining. */
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/*we add the actives to make the motion elements when active.  */

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

/*we add the enter and leave with opacity 1,  */
/* this means is not going to be invisible  */
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>