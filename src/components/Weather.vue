<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex class=" mb-5" xs12 sm6 md4 v-for="weather of weatherList" :key="weather.date">  
        <v-card theme--light>
          <v-layout row >
            <v-flex xs9>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-2">{{ weather.date }}</h3>
                  <p class="mb-2">Average Temp: {{ weather.temp }}&deg;С</p>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs3>
              <v-img
                :src="`http://openweathermap.org/img/w/${weather.icon}.png`"
                height="125px"
                contain
              ></v-img>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      icon: '10n'
    }),
    computed: {
      weatherList () {
        return this.$store.getters.weather
      }
    }
  }
</script>

<style>

</style>
