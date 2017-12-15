require.config({
    paths: {
        text: 'https://cdn.bootcss.com/require-text/2.0.12/text'
    }
});

const routes = [
    {
        path: '/foo',
        component: {
            template: '<div>foo</div>'
        }
    },
    {
        path: '/bar',
        component: function (resolve, reject) {
            require(['text!./pages/home.html', './pages/home'], function (temp, cfg) {
                cfg.template = temp;
                console.log(cfg);
                resolve(cfg);
            });
        }
    }
];

const router = new VueRouter({
    routes
});