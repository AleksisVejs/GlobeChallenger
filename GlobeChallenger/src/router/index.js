import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/flagGame",
    name: "flag-game",
    component: () => import("../views/FlagGameView.vue"),
  },
  {
    path: "/endGame",
    name: "end-game",
    component: () => import("../views/EndGameView.vue"),
  },
  {
    path: "/wonGame",
    name: "won-game",
    component: () => import("../views/WonGameView.vue"),
  },
  {
    path: "/triedGame",
    name: "tried-game",
    component: () => import("../views/TriedGameView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
