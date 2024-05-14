export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/chart', name: '图表分析', icon: 'barChart', component: './Chart' },
  { path: '/chart_async', name: '图表分析(异步)', icon: 'barChart', component: './ChartAsync' },
  { path: '/chart_list', name: '我的图标', icon: 'orderedList', component: './ChartList' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [{ path: '/admin/UserManager', name: '用户管理', component: './UserManager' }],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
