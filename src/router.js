import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


const routes = [
    {
        path: "/",
        redirect: "/register",
    },
];


// 加载components目录下面的路由
importComponents(require.context('../components', true, /\.vue$/, 'lazy'))

function importComponents(r) {
    r.keys().forEach(key => {

        routes.push({
            path: key.substring(key.indexOf('/'), key.lastIndexOf('.')),
            component: () => r(key),
            meta: {requireAuth: false}
        })
    });
}


const router = new Router({
    routes,
    scrollBehavior() {
        return {x: 0, y: 0} //路由跳转置顶
    }
});



// 路由拦截器

router.beforeEach((to,from,next) => {
    next()
})


export default router;