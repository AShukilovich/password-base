import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Accesses from '@/views/Accesses.vue'
import CardAccess from '@/views/CardAccess.vue'
import Profile from '@/views/Profile.vue'
import Signin from '@/views/Signin.vue'
import Signup from '@/views/Signup.vue'
import Store from './store'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/accesses',
      name: 'accesses',
      component: Accesses,
      beforeEnter: AuthGuard
    },
    {
      path: '/accesses/:id',
      name: 'cardAccess',
      props: true,
      component: CardAccess,
      beforeEnter: AuthGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ],
  mode: 'history'
});

function AuthGuard(from, to, next) {
  if ( Store.getters.isUserAuthenticated ) {
    next();
  } else {
    next('/signin');
  }
}
