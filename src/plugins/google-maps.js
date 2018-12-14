import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

console.log("All Env Vars:", process.env)
console.log("API key:", process.env.VUE_APP_GOOGLE_MAPS_API_KEY)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    // libraries: 'places',
  },
})
