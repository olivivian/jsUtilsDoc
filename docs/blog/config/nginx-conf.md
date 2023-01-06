

> nginx的配置示例


# 配置SSL证书的 server

```
server
  {
    # 注意这里就是443 ssl, 不要把ssl删除了
    listen 443  ssl;
    # SSL绑定的域名
    server_name www.baidu.com;

    # 添加默认主目录和首页, 根据自己的路径修改
    root  /home/dist;
    index index.html index.htm index.php;


    # cert.pem和cert.key替换为上传文件的路径(最好使用完整路径)
    ssl_certificate  /cert/xxx.xxx.xxx_bundle.pem;
    ssl_certificate_key /cert/xxx.xxx.xxx.key;


    # 下面的不用动
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;


    #error_page   404   /404.html;
    include enable-php.conf;


    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
      {
        expires      30d;
      }

    location ~ .*\.(js|css)?$
      {
        expires      12h;
      }

    location ~ /\.
      {
        deny all;
      }

    access_log  /www/wwwlogs/access.log;
  }

server {
  listen 80;
  server_name www.baidu.com;  # 你的域名
  rewrite ^(.*)$ https://www.baidu.com/$1 permanent;  # 把http的域名请求转成https
}

```

