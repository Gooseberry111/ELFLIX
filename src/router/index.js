import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetail from "../views/MovieDetail.vue";
import SearchView from "../views/SearchView.vue";
import MyListView from "../views/MyListView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  {
    path: "/",
    redirect: "/profiles",
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/profiles",
    component: ProfileView,
  },
  {
    path: "/movie/:id",
    component: MovieDetail,
  },
  {
    path: "/search",
    component: SearchView,
  },
  {
    path: "/mylist",
    component: MyListView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
