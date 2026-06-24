import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieDetail from "../views/MovieDetail.vue";
import SearchView from "../views/MovieDetail.vue";
import MyListView from "../views/MyListView.vue";
import ProfileView from "../views/ProfileView.vue";
const routes = [
  {
    path: "/",
    component: HomeView,
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
  {
    path: "/profiles",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
