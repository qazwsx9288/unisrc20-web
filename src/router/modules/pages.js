const route = {
  path: "/",
  component: () => import("@/view/appLayout.vue"),
  children: [
    {
      // 用别名的方式，使得首页匹配为l2
      alias: "/",
      path: "/l2",
      name: "l2",
      component: () => import("@/view/pages/page-l2.vue"),
    },
    {
      path: "/market",
      name: "market",
      component: () => import("@/view/pages/page-market.vue"),
    },
    {
      path: "/inscribe",
      name: "inscribe",
      component: () => import("@/view/pages/page-inscribe.vue"),
    },
    {
      path: "/my-wallet",
      name: "my-wallet",
      component: () => import("@/view/pages/my/page-my-wallet.vue"),
    },
    {
      path: "/deploy-order",
      name: "deploy-order",
      component: () => import("@/view/pages/my/page-my-deploy-order.vue"),
    },
    {
      path: "/mint-order",
      name: "mint-order",
      component: () => import("@/view/pages/my/page-my-mint-order.vue"),
    },
    {
      path: "/earn-points",
      name: "earn-points",
      component: () => import("@/view/pages/page-earn-points.vue"),
    },
    {
      path: "/earn-points-rank",
      name: "earn-points-rank",
      component: () => import("@/view/pages/page-earn-points-rank.vue"),
    },
    {
      path: "/l2-info",
      name: "l2-info",
      component: () => import("@/view/pages/page-l2-info.vue"),
    },
  ],
}

export default route
