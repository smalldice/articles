# 系列连载｜真·手撸前端工程设施（2）-Typescript 接入

## 写在开头

> 工欲善其事，必先利其器

本文是前端工程基础设置搭建的第二篇文章， 主要介绍 Typescript 在项目中的接入方式， 对于 Typescript 的使用或入门，强烈推荐[《15 分钟入门 Typescript》](https://juejin.im/post/6883432548970545160)这篇文章， 本文仅讨论如何接入。

## Let's begin

**Typescript 代码无法直接在 Browser 和 Node 环境直接运行，需要编译为 javascript 才能运行。（Node 环境可以使用 ts-node 命令行工具运行，但是本质还是先转为 Javascript 再运行）**

一般情况下，接入 TS 的项目分为如下两类：

- 单页、多页 前端项目
- 工具库、 Nodejs 服务项目

这两类项目所使用的打包工具主要是 **webpack** 和 **rollup** ， 以及 Typescript 官方提供的命令行工具 **tsc**

现就针对这三种工具分别介绍如何在项目中接入

## tsconfig

上述提及的三种工具对 ts 文件打包时，会使用一些选项，这类选项是由项目根目录下的 tsconfig.json 这个文件配置的。

这里列举一些主要配置， 文末会对 tsconfig 做详细讲解

> tsconfig.json

```json
{
  "compilerOptions": {
    // 指定 ECMAScript 目标版本 "ES3"（默认）， "ES5"， "ES6" / "ES2015"， "ES2016"， "ES2017" 或 "ESNext"。
    "target": "ES5",
    // 构建的目标代码删除所有注释，除了以 /!* 开头的版权信息
    "removeComments": true,
    // 启用所有严格类型检查选项。启用 --strict 相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks, --strictFunctionTypes 和 --strictPropertyInitialization
    "strict": true,
    // 禁止对同一个文件的不一致的引用
    "forceConsistentCasingInFileNames": true,
    // 报错时不生成输出文件
    "noEmitOnError": true
  },
  "include": ["src"],
  "exclude": ["**/ignore.ts"], // 忽略任意文件夹下的ignore.ts
  "outDir": "dist" // 编译后的文件输出到dist目录
}
```

一级选项主要由三个配置项：

- **compilerOptions** 编译选项
- **include** 编译所包含目录下的 ts 文件
- **exclude** 排除编译所包含目录下的 ts 文件

## Tsc

#### 安装

```bash
npm install typescript -g
```

安装好之后命令行中就可以使用 tsc 编译 ts 文件了
