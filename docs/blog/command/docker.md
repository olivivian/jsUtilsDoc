

## 启动、停止、重启容器

```
docker start myjb51
docker stop myjb51
docker restart myjb51
```


## 列出docker容器
```
//显示所有的容器，包括未运行的
docker ps -a

//显示运行中的
docker ps -q
```

## 删除所有容器
```
docker rm $(docker ps -a -q)
```


## 查看docker是否处于启动状态
```
sudo systemctl status docker
```


## docker启动和停止
```
//启动
sudo systemctl start docker

//停止
sudo systemctl stop docker
```




> [Docker常用命令大全](http://edu.jb51.net/docker/docker-command-manual.html)
