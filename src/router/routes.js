
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') }
    ]
  },

  {
    name: "Login",
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    name: "Password Recovery",
    path: '/passwordrecovery',
    component: () => import('pages/passwordRecovery.vue'),
  },
  {
    name: "Managment",
    path: "/",
    meta: { requireLogin: false },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/managment/credits",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Managment/credits.vue"),
      },
      {
        path: "/managment/customers",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Managment/customers.vue"),
      },
      {
        path: "/managment/calculator",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Managment/calculator.vue"),
      },
      {
        path: "/managment/deadlines",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Managment/deadlines.vue"),
      }
    ],
  },

  {
    name: "Sales",
    path: "/",
    meta: { requireLogin: false },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/sales/credits",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Sales/credits.vue"),
      },
      {
        path: "/sales/queries",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Sales/queries.vue"),
      },
    ],
  },

  {
    name: "Portfolio",
    path: "/",
    meta: { requireLogin: false },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/portfolio/queries",
        meta: { requireLogin: false },
        component: () =>
          import("src/pages/Portfolio/queries.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
