import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/2-1",
    component: HomeView,
    children: [
      {
        path: "/homeindex",
        component: () => import("../views/homes/HomeIndex.vue"),
      },
      {
        path: "/2-1",
        name:"default",
        meta: ['文章管理', '文章列表'],
        component: () => import("../views/homes/HomePage.vue"),
      },
      {
        path: "/2-2",
        meta: ['文章管理', '多层级路由示例'],
        component: () => import("../views/homes/HomeRouter.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/MyLogin.vue'),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
const router = new VueRouter({
  routes,
});


export default router;
