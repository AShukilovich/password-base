import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VuetifyConfirm from 'vuetify-confirm'
import firebaseConfig from './config/firebase'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.use(VuetifyConfirm);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

Vue.$db = db;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('STATE_CHANGE', user)
    });

    this.$store.dispatch('LOAD_ACCESSES', {
      user: this.$store.getters.userUid
    });
  },
}).$mount('#app')
