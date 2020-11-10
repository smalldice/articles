### 本文为web安全系列第一篇文章

#### 写在前面

web安全问题是业界一直比较关心的领域， 如果你

#### CSRF 介绍

CSRF 全称为 Cross-site request forgery， 中文意思是跨站请求伪造。

通俗的解释就是： 用户在www.aaa.com登陆， 点击外链或者访问了攻击者www.attack.com域名下的网页或者图片， 攻击者使用了www.aaa.com的用户数据(cookie)， 发送请求到服务器，篡改用户数据，从而达到共计的目的。

