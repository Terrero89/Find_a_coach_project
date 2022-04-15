<template>
<the-header></the-header>
<router-view></router-view>
</template>




<script>
import TheHeader from "./components/layout/TheHeader.vue"
export default {
  components:{TheHeader}

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
    box-sizing: border-box;
}

html {
    font-family: "Roboto", sans-serif;
}

body {
    margin: 0;
}
</style>



//COLORS AND


PRIMARY COLOR -> #062C30;
BORDERS      ->  #E2D784;
TEXT IN DARK  -> #DDDDDD;

// button
//   background-color: #0e3a3f;
//   border-color:  #133c41;