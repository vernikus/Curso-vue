import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/pokemons',
      name: 'pokemons',
      component :() => import('../views/PokemonsView.vue')
    },
    {
      path:'/pokemons/:name', 
      name: 'pokeInfo',
      component :() => import('../views/PokemonInfoView.vue')
    },{
      path: '/favorite', 
      name: 'favorite',
      component : () => import('../views/FavoritesPokemons.vue')
    },{
      path: '/:pathMatch(.*)*',  
      name: 'NotFound',
      component : () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
