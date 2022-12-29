module.exports = {
  // 网站的一些基本配置
  // base:配置部署站点的基础路径，后续再介绍
  title: 'JinDoc', // 网站的标题
  description: '前端速查文档（日常实用向）', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.gif' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  themeConfig: {
    logo: '/dh_logo.png',//导航logo
    nav: [//导航
      { text: 'Home', link: '/' },
      // 可指定链接跳转模式：默认target: '_blank'新窗口打开，_self当前窗口打开
      { text: 'js工具库', link: '/blog/js/' },
      // 支持嵌套,形成下拉式的导航菜单
      /*{
        text: '语言',
        ariaLabel: 'Language Menu',
        items: [
          { text: '中文', link: '/language/chinese/' },
          { text: '英文', link: '/language/english/' }
        ]
      }*/
    ],
    // sidebar: 'auto'
    sidebar: {
      //对象的默认路径
      '/blog/js/': [
        '', //侧边栏第一个页面是：/blog/fontend/README.md,、链接文字自动获取(页面的第一个header)，即h1(前端技术)
        'func',
        'time',
        'until',
        'verify',
        'DOM',  //侧边栏第二个页面是：/blog/js/verify.md,链接文字自动获取(页面的第一个header)，即h2(html 二级标题)
        // ['func', '方法类'] //侧边栏第三个页面是：/blog/js/func.md ,指定链接的文字，使用一个格式为 [link, text] 的数组。
      ]
    },
  },
}
