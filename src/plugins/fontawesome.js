import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisH, faTable, faPalette } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { faChrome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEllipsisH, faTable, faBell, faPalette, faChrome)

Vue.component('font-awesome-icon', FontAwesomeIcon)
