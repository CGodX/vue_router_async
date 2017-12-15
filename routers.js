require.config({
    paths: {
        text: 'https://cdn.bootcss.com/require-text/2.0.12/text'
    }
});

const Bar = {
    templateUrl: './pages/bar/bar.html',
    componentUrl: './pages/bar/bar'
};

const Foo = {
    templateUrl: './pages/foo/foo.html',
    componentUrl: './pages/foo/foo'
};


const routesConfig = {
    '/bar': Bar,
    '/foo': Foo
};

const routes = [];
for (var i in routesConfig) {
    let router = {};
    let cur = routesConfig[i];
    router.path = i;
    let asyncArr = [];
    if (cur.templateUrl) {
        asyncArr.push('text!' + cur.templateUrl);
    }
    if (cur.componentUrl) {
        asyncArr.push(cur.componentUrl);
    }

    if (asyncArr.length > 0) {
        router.component = function (resolve, reject) {
            require(asyncArr, function (temp, cfg) {
                cfg.template = temp;
                resolve(cfg);
            });
        }
    } else {
        router.component = cur;
    }
    routes.push(router);
}

const router = new VueRouter({
    routes
});