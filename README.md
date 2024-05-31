# Oauth2 认证
使用github oauth2,
https://github.com/settings/developers -> （new OAuth App）
设置回调为 {baseurl}/callback

## 项目基本
1. pnpm install express axios ejs
2. 配置index.html 中的 a标签中的 &client_id=xxxx (来源于github app)
3. 配置oauth2-token-uri.js 中的client-id 和 client-secret (来源于github app)
4. node app.js #启动项目

## oauth2基本流程
https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authenticating-to-the-rest-api-with-an-oauth-app#registering-your-app

## 项目流程-对应github 官网的流程
1. 点击index.html 中的按钮，重定向到github 申请授权
2. 在/callback 回调中 携带必要信息 以换取 access_token，最终显示token到 oauth2-token-uri.ejs 上

github RestApi https://docs.github.com/en/rest?apiVersion=2022-11-28
github RestApi Emails https://docs.github.com/en/rest/users/emails?apiVersion=2022-11-28#list-email-addresses-for-the-authenticated-user