import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    // key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    key: 'AIzaSyA_CyjjZ1VMw6pzAwFlBEXTufO7B64rD8w'
    // libraries: 'places',
  },
})
