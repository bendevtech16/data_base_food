<template>
  <div id="app">
    <nav-bar/>
    <router-view :key="$route.fullPath"/>
    <app-footer />
  </div>
</template>
<script>
import NavBar from '@/components/Header.vue'
import AppFooter from '@/components/Footer.vue'
export default {
  components:{NavBar, AppFooter}
  
}
</script>

