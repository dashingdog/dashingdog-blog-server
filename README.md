# dashingdog-blog-server
[![Build Status](https://travis-ci.com/dashingdog/dashingdog-blog-server.svg?branch=master)](https://travis-ci.com/dashingdog/dashingdog-blog-server)

## 项目介绍
blog服务端基于[lin-cms](https://doc.cms.talelin.com/start/koa/)/koa框架开发

dashingdog-blog需要安装以下三个系统配合使用：
### dashingdog-blog-nuxt（客户端）
代码仓库：[https://github.com/dashingdog/dashingdog-blog-nuxt](https://github.com/dashingdog/dashingdog-blog-nuxt)
### dashingdog-blog-admin（管理系统）
代码仓库：[https://github.com/dashingdog/dashingdog-blog-admin](https://github.com/dashingdog/dashingdog-blog-admin)
### dashingdog-blog-server（服务端）
 代码仓库：[https://github.com/dashingdog/dashingdog-blog-server](https://github.com/dashingdog/dashingdog-blog-server)
## 项目启动
1. 将根目录下的`secure.js.template`文件的`.template`后缀移除，移动到`app/config/secure.js`
，并在该配置文件中填写你的数据库相关配置 
2. `npm install`安装依赖包 
3. `npm run start:dev`启动项目
4. 执行根目录下的 schema.sql 创建超级管理员账户

## 项目部署
1. 项目部署使用`pm2`，在服务器上先安装`npm install -g pm2 `(当你已安装了Node)
2. 安装依赖 `npm install`
3. 启动代码 `npm run start:prod`

如果需要使用持续集成可以参考[Travis CI部署实践](https://www.dashingdog.cn/article/2)，根据需要修改`.travis.yml`和`script/deploy.sh`来配置自己的持续集成