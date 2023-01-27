module.exports = {
  // 网站的一些基本配置
  // base: './',   // 部署的路径配置
  dest: './dist',  // 设置输出目录
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
      {
        text: '框架插件',
        items: [
          { text: 'Element UI', link: '/blog/skill/element-ui/' },
          { text: 'Vue3', link: '/blog/skill/Vue3/Vue3_生命周期' },
        ]
      },
      { text: '常用命令', link: '/blog/command/' },
      { text: '博客', link: 'https://www.axjy.info' },
      { text: 'Github', link: 'https://github.com/olivivian' },
    ],
    sidebarDepth:2,
    sidebar:
      {
        //对象的默认路径 一个导航栏下对应多篇文章
        '/blog/js/': [
          '', //侧边栏第一个页面是：/blog/fontend/README.md,、链接文字自动获取(页面的第一个header)，即h1(前端技术)
          'func',
          'time',
          'verify',
          'until',
          'DOM',  //侧边栏第二个页面是：/blog/js/verify.md,链接文字自动获取(页面的第一个header)，即h2(html 二级标题)
          // ['func', '方法类'] //侧边栏第三个页面是：/blog/js/func.md ,指定链接的文字，使用一个格式为 [link, text] 的数组。
        ],
        //一个导航栏多篇文章，且要对文章起别名
        '/blog/skill/element-ui/':[
          ['','Element UI']
        ],
        '/blog/skill/Vue3/':[
          ['Vue3_生命周期','Vue3_生命周期'],
          ['Vue3_组合API','Vue3_组合API'],
          ['Vue3_ref和reactive','Vue3_ref和reactive'],
          ['Vue3_toRef和toRefs','Vue3_toRef和toRefs'],
          ['Vue3_watch详解','Vue3_watch详解'],
          ['Vue3_父子组件传值','Vue3_父子组件传值'],
          ['Vue3_计算属性computed详解','Vue3_计算属性computed详解'],
          ['Vue的渲染函数render&h','Vue的渲染函数render&h'],
        ],
        //一个导航栏下多篇文章进行分组
        '/blog/command/': [
          /*{
            title: '常用命令',
            children: [

              // ['docker','docker常用命令']
            ]
          },*/
          ['nginx','nginx常用命令'],
          ['git','git常用命令'],
          ['hexo','hexo常用命令'],
          ['docker','docker常用命令'],
          ['MySQL', 'MySQL常用命令']
        ]
      }
  },
}
