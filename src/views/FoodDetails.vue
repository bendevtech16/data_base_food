<template>
  <div class="about">
        <!-- ====== Hero Section Start -->
    <div
      class="relative pt-[40px] md:pt-[60px] lg:pt-[70px] bg-secondary pb-4"
    >
      <div class="z-50 mt-6 container">
        <div class="grid p-4 gap-4 grid-cols-1 md:grid-cols-6 bg-white  4">
          <div class=" md:col-span-2">
            <h2 class="text-center text-primary text-2xl"> {{ meal['Repas consommé'] }} </h2>
            <div class="border border-dark p-1 w-full">
              <!-- <img :src="meal['Photos du repas']" alt=""> -->
              <img src="https://thumbs.dreamstime.com/b/football-party-table-food-football-party-celebration-food-plates-chicken-buffalo-wings-meat-balls-hot-dogs-usa-party-238842221.jpg" alt="">
            </div>
          </div>
          <div class="col-span-4">
            <div class="mb-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                <div class="bg-dark bg-opacity-80 text-center p-2 group hover:bg-secondary" v-for="component in meal.components" :key="component">
                  <h3 class="text-white text-xl"> {{ component.name }} </h3>
                  <h3 class="text-white"> {{ component.value }} <span class="text-sm italic">{{ component.unit }}</span> </h3>
                </div>
            </div>
            <div class="w-full flex justify-between ">
              <span>
                <router-link class="hover:text-secondary"  :to="{name:'details', params:{id:(meal['id']-1)}}"> Repas précedent </router-link>
              </span>
              <span> 
                <router-link class="hover:text-secondary" :to="{name:'details', params:{id:(meal['id']+1)}}"> Repas Suivant  </router-link>
              </span>
            </div>  
          </div>
        </div>
      </div>
    </div>
    <!-- ====== Hero Section End -->
  </div>
</template>

<script>
export default {
  mounted () {
    /* Au chargement de la page on récupère le repas correspondant en fonction de son ID */ 
    this.meal = this.$store.getters.getByID(this.$route.params.id || '')
  },
  data () {
    return {
      meal:{}
    }
  },
  
}
</script>
