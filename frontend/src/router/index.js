import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import JoinView from "../views/JoinView.vue"
import LobbyView from "../views/LobbyView.vue"
import GameView from "../views/GameView.vue"
import PreGameView from "../views/PreGameView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/join/:id",
      name: "join",
      component: JoinView
    },
    {
      path: "/lobby",
      name: "lobby",
      component: LobbyView
    },
    {
      path: "/pregame",
      name: "pregame",
      component: PreGameView
    },
    {
      path: "/game",
      name: "game",
      component: GameView
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
