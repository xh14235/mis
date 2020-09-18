import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const MisRrouter = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/login/Login")
    },
    {
      path: "/nav",
      name: "Nav",
      meta: {
        requireAuth: true
      },
      component: () => import(/* webpackChunkName: "nav" */ "@/views/nav/Nav")
    },
    {
      path: "/commuting",
      name: "Commuting",
      component: () =>
        import(
          /* webpackChunkName: "commuting" */ "@/views/commuting/Commuting"
        ),
      children: [
        {
          path: "/commuting/gotowork",
          name: "GoToWork",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "commuting/gotowork" */ "@/views/commuting/components/GoToWork.vue"
            )
        },
        {
          path: "/commuting/gooffwork",
          name: "GoOffWork",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "commuting/gooffwork" */ "@/views/commuting/components/GoOffWork.vue"
            )
        },
        {
          path: "/commuting/incomplete",
          name: "Incomplete",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "commuting/incomplete" */ "@/views/commuting/components/Incomplete.vue"
            )
        }
      ]
    },
    {
      path: "/audit",
      name: "Audit",
      meta: {
        requireAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "audit" */ "@/views/audit/Audit"),
      children: [
        {
          path: "/audit/commuting",
          name: "Commuting",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "audit/commuting" */ "@/views/audit/components/Commuting.vue"
            )
        }
      ]
    },
    {
      path: "/report",
      name: "Report",
      meta: {
        requireAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "report" */ "@/views/report/Report"),
      children: [
        {
          path: "/report/working",
          name: "Working",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "report/working" */ "@/views/report/components/Working.vue"
            )
        }
      ]
    },
    {
      path: "/limit",
      name: "Limit",
      meta: {
        requireAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "limit" */ "@/views/limit/Limit"),
      children: [
        {
          path: "/limit/commuting",
          name: "Commuting",
          meta: {
            requireAuth: true
          },
          component: () =>
            import(
              /* webpackChunkName: "limit/commuting" */ "@/views/limit/components/Commuting.vue"
            )
        }
      ]
    }
  ]
});

MisRrouter.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default MisRrouter;
