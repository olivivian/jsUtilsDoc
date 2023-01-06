

## 重启nginx

> 进入nginx安装目录sbin下，输入命令

```angular2
./nginx -s reload
```



## 查看配置

> 进入nginx安装目录sbin下，输入命令
>
> 看到
> nginx.conf syntax is ok
> nginx.conf test is successful
> 说明配置文件正确！

```
./nginx -t
```



## 验证nginx配置文件是否正确

> 进入nginx安装目录sbin下，输入命令

```
# 杀掉所有nginx进程
killall -9 nginx

#检查配置文件是否有错
./nginx -t

# 启动nginx
./nginx
```

