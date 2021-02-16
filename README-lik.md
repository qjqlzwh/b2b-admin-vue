
```vue
# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

### 目录结构
```text
# 菜单结构
src/router/index.js


```


### 请求
```text
登录
http://localhost:9528/vue-admin-template/user/login
request: {"username":"admin","password":"111111"}
response: {code: 20000, data: {token: "admin-token"}}

获取用户信息
http://localhost:9528/vue-admin-template/user/info?token=admin-token
request: token: admin-token
response: {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}

```
