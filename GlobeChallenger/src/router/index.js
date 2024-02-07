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
    path: "/flagDrawGame",
    name: "flag-draw-game",
    component: () => import("../views/FlagDrawGameView.vue"),
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
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/populationGame",
    name: "population-game",
    component: () => import("../views/PopulationGameView.vue"),
  },
  {
    path: "/populationResult",
    name: "population-result",
    component: () => import("../views/PopulationResultView.vue"),
  },
  {
    path: "/capitalGame",
    name: "capital-game",
    component: () => import("../views/CapitalGameView.vue"),
  },
  {
    path: "/gameOver",
    name: "game-over",
    component: () => import("../views/GameOverView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
