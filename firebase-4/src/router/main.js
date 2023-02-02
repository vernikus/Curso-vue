import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { userStore } from "../store/user";
import Home from "../views/Home.vue";

import { useDataBase } from "../store/dataBase";
const requireAuth = async (to, from, next) => {
    // Se recomienda inicializar las importaciones de pinia dentro de una funcion y no direcctamente en el archivo
  const userStor = userStore();
  const { currentUser } = userStor;
  const { loader } = storeToRefs(userStor);
//   Inicializamos el loader para cargar un spinner
  loader.value = false;
  const user = await currentUser();
//   Forzamos las rutas
  if (user) {
    next();
  } else {
    next("/login");
  }
//   Terminamos el loader
  loader.value = true;
};

const redirection = async(to,from,next) =>{
  const dataBase = useDataBase()
  const name = await dataBase.getURL(to.params.pathMatch[0])
  if(!name){
    next()
  }else{
    window.location.href = name
    next()
  }

}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: requireAuth, //beforeEnter es una metodo para que se ejecute una funcion antes de pasar a la ruta, es una manera de projeter a la ruta, en este caso se utiliza para dar acceso al home, solo a los usuarios que esten previamente registrados
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("../views/Edit.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/perfil/",
      name: "perfil",
      component: () => import("../views/Perfil.vue"),
      beforeEnter: requireAuth
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/NotFound.vue"),
      beforeEnter: redirection
    },
  ],
});

export default router;
