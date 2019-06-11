# 参考文档

[JHipster生成单体架构的应用示例 - 羽客 - 博客园](https://www.cnblogs.com/yorkwu/p/9325659.html)

[jhipster - 标签 - 羽客 - 博客园](https://www.cnblogs.com/yorkwu/tag/jhipster/)

# app2

本应用是一个使用JHipster 6.0.1生成的单体应用，前端使用了angular 6,后端是spring。认证方式为JWT。产品模式数据库为mysql，开发模式数据库为H2。
创建了一个包含三个字段的实体role。
, 你可以在这里查看JHipster的帮助信息 [https://www.jhipster.tech/documentation-archive/v6.0.1](https://www.jhipster.tech/documentation-archive/v6.0.1).

## Development

在生成此项目之前，必须在计算机上安装和配置以下依赖项:

1. [Node.js][]: 我们使用Node运行开发Web服务器并构建项目.
   根据您的系统，您可以从源安装Node，也可以作为预打包包安装Node.

安装Node之后，您应该能够运行以下命令来安装开发工具.
仅当依赖项在 [package.json](package.json)中更改时才需要运行此命令.

    npm install

我们使用 npm 脚本和 [Webpack][] 来构建系统.

在两个独立的终端中运行以下命令，在浏览器中创建一个良好的开发体验：当硬盘上的文件更改时自动刷新.

    ./mvnw
    npm start

Npm 同样用来管理本系统中所依赖的 CSS 和 JavaScript . 你可以通过修改[package.json](package.json)文件来升级依赖包的版本. 你同样可以运行 `npm update` 和 `npm install` 来管理依赖.
添加 `help` 标志在npm命令之后可以查看如何使用这些命令. 例如, `npm help update`.

 `npm run` 命令将列出可为此项目运行的所有脚本.

### Service workers

Service workers在默认情况下被注释，若要启用它们，请取消注释以下代码.

- service worker 注册脚本在index.html文件中

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function() {
      console.log('Service Worker Registered');
    });
  }
</script>
```

注意: workbox 创建各自的服务工作者并动态生成 `service-worker.js`

### 管理依赖

例如, 要添加 [Leaflet][] 库作为你的语言的运行时依赖, 你可以运行下面的命令:

    npm install --save --save-exact leaflet

要从开发中的 [DefinitelyTyped][]存储库中的typescript类型定义中获益，您将运行以下命令：

    npm install --save-dev --save-exact @types/leaflet

你可以导入库安装说明中提及的 JS 和 CSS 文件，以便 [Webpack][] 知道:
编辑 [src/main/webapp/app/vendor.ts](src/main/webapp/app/vendor.ts) 文件:

```
import 'leaflet/dist/leaflet.js';
```

编辑 [src/main/webapp/content/css/vendor.css](src/main/webapp/content/css/vendor.css) 文件:

```
@import '~leaflet/dist/leaflet.css';
```

注意: 还有几件事要做，我们在这里不详述.

有关如何使用Jhipster开发的更多说明，请查看 [Using JHipster in development][].

### 使用 angular-cli

你还可以使用 [Angular CLI][] 来生成一些客户端代码.

例如, 下面的命令:

    ng generate component my-component

将会生成一些文件:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts

### 使用OpenAPI生成器进行API优先的开发

[OpenAPI-Generator]() 已经在本系统中正确配置。你可以从 `src/main/resources/swagger/api.yml` 文件定义生成 API 代码，只需要运行命令:

```bash
./mvnw generate-sources
```

然后实现生成的委托类使用 `@Service` 注解.

要编辑 `api.yml` 定义文件, 你可以使用一些工具如： [Swagger-Editor](). 使用如下的docker命令启动一个swagger-editor的本地实例: 
`docker-compose -f src/main/docker/swagger-editor.yml up -d`. 
该编辑器就可以在 [http://localhost:7742](http://localhost:7742)访问.

参考 [Doing API-First development][] 查看更多细节.

## 构建产品

### 数据库配置

#### 启动一个数据库容器

在命令行，任意目录下，启动一个mysql容器；如果本地没有mysql:5的镜像，容器启动时会自动去docker store下载镜像。

```shell
docker container run --name app2-mysql -e MYSQL_ROOT_PASSWORD=a1b2c3 -d -p 32768:3306 mysql:5
```

#### 在数据库中创建schema

通过客户端连接上刚启动的数据库容器，添加一个名为`app2`的schema。应用启动时会自动在这个schema里面创建数据表。

```shell
docker exec -it -u root app2-mysql bash
mysql -uroot -pa1b2c3
mysq>CREATE SCHEMA app2;
```

#### 修改应用的数据库配置

spring.datasource.url中的端口号`32768`，与步骤4.1中**-p**参数指定的值保持一致。
spring.datasource.url中的schema名称`app1`，与步骤4.2中添加的schema名称保持一致。
spring.datasource.password的值`my-secret-pw`，与步骤4.1中`MYSQL_ROOT_PASSWORD`参数指定的值保持一致。

```shell
$ cd app2/
$ vi src/main/resources/config/application-prod.yml
# 修改数据库连接相关配置
spring:
    datasource:
        url: jdbc:mysql://192.168.3.69:32768/app2?useUnicode=true&characterEncoding=utf8&useSSL=false
        username: root
        password: a1b2c3
```

### 打包为jar

要打包最终的jar 并优化本应用用于产品化部署, 运行:

    ./mvnw -Pprod clean verify

这将连接并缩小web客户端的CSS和JavaScript文件。它还将修改“index.html”，以便引用这些新文件。
确保一切正常, 运行:

    java -jar target/*.jar

然后在你的浏览器中访问 [http://localhost:8080](http://localhost:8080).

请参阅 [Using JHipster in production][] 查看更多细节.

### 打包为war

要打包本应用为war以便它部署到现有应用服务器, 运行:

    ./mvnw -Pprod,war clean verify

## 测试

要开始进行应用的测试, 运行:

    ./mvnw verify

### 客户端测试

单元测试是靠 [Jest][] 运行并且使用[Jasmine][]编写的. 他们位于 [src/test/javascript/](src/test/javascript/) 并能够被使用下面命令运行:

    npm test

更多细节请查阅 [Running tests page][].

### 代码质量

系统使用Sonar来分析代码质量. 你可以用docker启动一个本地的Sonar服务器 (访问 http://localhost:9001) 使用命令:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

你可以运行Sonar分析，使用[sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) 或者使用maven插件
然后, 运行一个Sonar分析:

```
./mvnw -Pprod clean verify sonar:sonar
```

果需要重新运行Sonar阶段，请确保至少指定“initialize”阶段，因为Sonar属性是从sonar-project.properties文件加载的。.

```
./mvnw initialize sonar:sonar
```

或者

更多详情请查阅 [Code quality page][].

## 使用Docker来简化开发 (可选)

你可以使用Docker来提升你的JHipster开发体验. 一系列位于 [src/main/docker](src/main/docker) 文件夹下的docker-compose配置文件来调用需要的第三方服务.

例如, 要在容器中启动mysql数据库, 运行:

    docker-compose -f src/main/docker/mysql.yml up -d

要停止并删除容器, 运行:

    docker-compose -f src/main/docker/mysql.yml down

您还可以将应用程序及其依赖的所有服务完全固定化.
要实现这一点，首先要通过运行:

    ./mvnw -Pprod verify jib:dockerBuild

然后运行:

    docker-compose -f src/main/docker/app.yml up -d

更多细节请查阅[Using Docker and Docker-Compose][], 此页还包含有关docker-compose子生成器（`jhipster docker-compose`）的信息，它能够为一个或多个Jhipster应用程序生成Docker配置.

## 持续集成 (可选)

要为本项目配置 CI , 运行 ci-cd sub-generator (`jhipster ci-cd`), 这将允许您为许多持续集成系统生成配置文件. 有关详细信息，请参阅 [Setting up Continuous Integration][] 页面.

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.0.1 archive]: https://www.jhipster.tech/documentation-archive/v6.0.1
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.0.1/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.0.1/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.0.1/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.0.1/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.0.1/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.0.1/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: http://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: http://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: http://leafletjs.com/
[definitelytyped]: http://definitelytyped.org/
[openapi-generator]: https://openapi-generator.tech
[swagger-editor]: http://editor.swagger.io
[doing api-first development]: https://www.jhipster.tech/documentation-archive/v6.0.1/doing-api-first-development/
