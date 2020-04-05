import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      alias: "/",
      component: Home,
      meta: {
        title: "Home"
      }
    },
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/about",
      name: "about",
      meta: {
        title: "About"
      },
      component: () => import("./views/About.vue")
    },
    {
      path: "/corona",
      name: "corona",
      meta: {
        title: "Corona"
      },
      component: () => import("./views/Corona.vue")
    },
    {
      path: "/task/:id",
      name: "task",
      props: true,
      meta: {
        title: "Task",
        requiresAuth: false,
      },
      component: () => import("./views/Task.vue")
    },
    {
      path: "/profile/:username?",
      name: "profile",
      meta: {
        requiresAuth: false,
        title: "User profile"
      },

      component: () => import("./views/Profile.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});
export default router;
