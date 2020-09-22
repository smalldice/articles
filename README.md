# 系列连载｜真·手撸前端工程设施（1）
## 写在开头

>本文是前端工程基础设置搭建的第一篇文章， 主要介绍一个基础工程项目从0到1搭建的流程以及所使用的工具的简单介绍

## 介绍

<ul>
  <li><a href="https://www.tslang.cn/">Typescript</a></li>
  <li><a href="https://www.tslang.cn/">webpack</a></li>
  <li><a href="https://eslint.org/docs/user-guide/getting-started">ESLint</a></li>
  <li><a href="https://github.com/typicode/husky#readme">Husky</a></li>
  <li><a href="https://github.com/okonet/lint-staged">lint-staged</a></li>
  <li><a href="https://github.com/commitizen/cz-cli">Commitizen</a></li>
</ul>

> 本文主要讲述的是如何使用上述提到的工具来规范 & 优化前端项目的工作流， 并且理解每个工具所起到的作用。<br/>
> 如果对上述所提到的工具的配置肥肠熟悉， 则可以跳过阅读。请从工程的角度决定是否继续要阅读相关内容

## Let's begin

<h3 style="text-align: center;font-size: 20px"><span style="border-bottom: 2px solid pink">Typescript</span></h3>

Why use?<br/>
社区对于使用 Typescript 的好处讨论甚多， 本文就不做过多阐述， 反正就是， 用就完事儿。

#### 首先： 初始化项目

```bash
mkdir awesome-project
cd awesome-project
npm init --yes
git init
# 安装依赖
yarn add -D typescript
```

在当前目录下添加 tsconfig.json 文件

> 本篇配置仅做基本设置， 其他设置请阅读<a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html">typescript 文档</a>

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
  "exclude": ["node_modules"]
}
```

<h3 style="text-align: center;font-size: 20px"><span style="border-bottom: 2px solid pink">Webpack</span></h3>

> 本文为了代码演示， 使用 webpack 搭建一个简单的 web 项目

```bash
# 安装webpack相关依赖
yarn add -D webpack webpack-dev-server webpack-cli html-webpack-plugin
```

配置 webpack.config.js 和 package.json scripts 脚本

> webpack.config.js

```js
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  output: {
    filename: '[name].[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: true
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 3000
  }
}
```

> package.json

```json
{
  // ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --config ./webpack.config.js"
  }
  // ...
}
```

<h3 style="text-align: center;font-size: 20px"><span style="border-bottom: 2px solid pink">ESLint</span></h3>

```
作为开发者来说， 对待代码的态度是：“代码是写给人看的，顺便交给机器去执行”， 代码的可读性一直以来是都是一个长期的、持续性的工作， 这一点在开发语言本身的演进过程中也能够体现出来。
```

eslint 是一个代码检测工具，它遵循一定的规则， 使用它能够很好的避免开发者写出 💩 一样的代码， eslint 基本的工作原理是 1.使用 parser 解析代码 2. 将代码转为 AST，分析代码模式 3.根据转换后的 AST 静态分析，对比规则来检测代码是否合法。

> 对于 eslint 的工作原理更深层次的探讨，请查看这一篇[文章](https://zhuanlan.zhihu.com/p/53680918)

话不多说，首先：

```bash
# 安装eslint依赖
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

配置.eslintrc.js

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']
}
```
配置vscode设置，在保存文件时格式化代码(此配置需要安装vscode eslint插件)

打开选项json文件
>settings.json

```json
{
  //...
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
  //...
}
```
> 通过 vscode 插件并不能够确保代码在构建前无任何错误信息，因此，为了在构建代码前， 添加额外的 eslint 校验能够确保在构建前将错误扼杀在摇篮中。

对此， 配置 package.json

```json
{
  // ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --config ./webpack.config.js",
    "lint": "eslint src --fix"
  }
  // ...
}
```

为了验证效果， 现在 在 src 目录下创建 index.ts中写一段代码:
<div>
  <img src="./static/images/eslint-1.jpg">
</div>

此时，vscode插件提示我们有错误， 让我们用eslint命令行修复一下。

```bash
yarn run lint
```
修复后的代码：
<div>
  <img src="./static/images/eslint-2.jpg">
</div>


<strong>至此、我们已经完成最基础的开发配置。</strong>

修改下index.ts的代码， 在浏览器上查看效果:
> index.ts

```js
document.write('Hello awesome-project')
```

此阶段，项目的目录包含：

```
awesome-project
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ README.md
├─ package.json
├─ public
│  └─ index.html
├─ src
│  └─ index.ts
├─ tsconfig.json
├─ webpack.config.js
└─ yarn.lock
```

来跑跑看：

```bash
yarn dev
```

浏览器打开：

<div>
  <img src="./static/images/helloworld.jpg"/>
</div>

如果你成功看到了这个，那么先给自己一个 👍！

不过先别急， 到目前位置， 代码还没有第一次提交。

<h3 style="text-align: center;font-size: 20px"><span style="border-bottom: 2px solid pink">Husky & lint-staged</span></h3>

```
husky是利用git hooks执行指定操作的工具, husky中文名称是哈士奇， 就像一只🐶咬住不放， 搭配eslint使用，有点咬💩的意思😂
```

```
lint-staged是在git暂存文件上运行已配置的linter 或者其他任务的工具。与husky搭配， 可以在git指定阶段对暂存文件进行linter。
```

接下来我们来看配置

首先安装依赖
```bash
yarn add -D husky lint-staged
```

> husky 配置

packages.json 
```json
{
  // ...
  "husky": {
    "hooks": {
      "pre-commit": "yarn run lint && git add ."
    }
  }
  // ...
}
```
这里我们使用pre-commit这个hook
使用bash: git add . 是因为yarn run lint 可能会更改暂存的文件， 因此将更改后的文件添加到暂存取区

跑一下命令查看效果
```bash
git add .
git commit -m "feat: husky 演示"
```
查看命令行：
<div>
  <img src="./static/images/husky.jpg"/>
</div>
可以看到在pre-commit阶段，执行了scripts中的lint 脚本

> 虽然本篇文章中未提到其他例如stylelint工具， 如果需要对css或scss 等css预处理语言编写的代码做检测，或者做一些其他工作，可以通过“pre-commit: scripts1 && script2 && script3 ....” 的方式在pre-commit阶段顺序执行。或者，根据接下来介绍的lint-staged对不同文件应用不同的脚本检测。

使用lint-staged 只对暂存区的文件进行检测工作

> package.json

```json
{
  // ...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged && git add ."
    }
  },
  "lint-staged": {
    "*.ts": ["yarn run lint"]
    // 对于其他文件的检测，只要在这里添加对应的规则即可
  }
  // ...
}
```

我们来提交一个不符合规范的代码看看
<div>
  <img src="./static/images/error.jpg" />
</div>
可以看到因为错误而终止了提交。

到了这一步， 我们完成了对代码质量和风格的检测。

<h3 style="text-align: center;font-size: 20px"><span style="border-bottom: 2px solid pink">Commitizen</span></h3>

>在我们把关注点放在代码质量和风格上时， 提交信息的规范往往会被忽略， 试想开发完成后， 提交的信息晦涩、不明确、追踪起来也很困难。 就像吃完一顿大餐后不新鲜的水果，会让人对之前的美味印象大打折扣

<strong>社区的commit message规范有很多， 接受程度比较广泛是Angular规范</strong>

<strong>规范的commit message给我们带来什么：</strong>

<ol>
  <li>commit message的作用是方便快速预览，查看者可以明确理解每次提交的目的.</li>
  <li>方便在快速查找信息的时候过滤某些commit</li>
  <li>可以通过commit 直接生成change log</li>
</ol>


<strong> commit message的格式:</strong>

```
<type(必须)>(<scope（可选）>): <subject(必须)>
// 空一行
<body>
// 空一行
<footer>
```


> 本文着重介绍header type 部分， 更多详情请移步<a href="https://gist.github.com/stephenparish/9941e89d80e2bc58a153"> Angular commit message conventions</a> 查看

type用于说明commit的类别，有以下七种标志
<ul>
  <li>feat: 新功能(feature)</li>
  <li>fix: 修改bug</li>
  <li>docs: 文档(documentation)</li>
  <li>style: 格式(不影响代码运行的变动)</li>
  <li>refactor: 重构(既不是新增功能，也不是修改bug的代码变动)</li>
  <li>test: 增加测试</li>
  <li>chore: 构建过程或者辅助工具的变动</li>
</ul>

但是， 如果通过原始的git commit 来提交commit message 的体验是肥肠差的， 此时需要借助工具commitizen， 使得我们能够在命令行中交互式的提交

commitizen配置:

安装依赖:
```bash
yarn global add commitizen
```

在当前项目下初始化changelog:
```bash
commitizen init cz-conventional-changelog --yarn --dev --exact
```

然后我们尝试提交一下:
> 此时提交的命令由git commit -m 修改为<strong>git cz</strong>

```bash
git add .
git cz
```

此时可以看到命令行中出现git commit message header type选择:
<div>
  <img src="./static/images/commitizen-1.jpg"/>
</div>
接下来只要根据命令行提示，一步步提交commit message即可。

我个人还是觉得提交流程是比较繁琐的， 可以自定义npm script 来简化提交流程
>package.json
```json
{
  // ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --config ./webpack.config.js",
    "lint": "eslint src --fix",
    "commit": "git add . && git cz"
  },
  // ...
}
```

此时只需要运行如下命令即可进入提交流程：
```bash
yarn commit
```

## 写在后面 (本系列持续更新)

> 工具的出现是为了解决开发过程中对代码管理各个方面的痛点，根据团队、业务的不同，对工具的需求也不同。本文只是介绍了部分工具在开发流程关键节点上如何搭配使用， 在开发的整条链路上，还有很多其他工具可以使用， 并且每个工具本身的实现、思路都是值得深究的。本文沿着<strong>从0到1</strong>的思路， 演示了如何搭建适合自己的工程基础设施，希望对看到这篇文章的你有所帮助。