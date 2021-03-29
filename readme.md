在定义类或者类方法的时候，可以设置一些元数据，我们可以获取到在类与类方法上添加的元数据，用的方法就是 Reflect Metadata。元数据指的是描述东西时用的数据。

在 TypeScript 里使用 Reflect Metadata 需要做下面这样的配置：
```json
{
  "compilerOptions": {
    "experimentalDecorators": true ,
    "emitDecoratorMetadata": true
  },
}
```
然后在项目里安装 reflect-metadata 这个包：

npm install reflect-metadata --save
然后做个实验：
```ts
import 'reflect-metadata';

@Reflect.metadata('role', 'admin')
class Post {}

const metadata = Reflect.getMetadata('role', Post);

console.log(metadata);  // admin
```

先导入 reflect-metadata 这个包，然后在定义的 Post 类的上面用 Reflect.metadata 装饰器添加了一条元数据，role 是这条元数据的名字，admin 是我们给这条数据设置的对应的值。

稍后如果想获取到在类上添加的这些元数据，可以使用 Reflect.getMetadata 方法，role 是元数据的名字，Post 是对应的类的名字。执行上面代码，会返回 admin 这个字符串。

自定义装饰器
在上面的例子里我们用了 Reflect.metadata 设置的元数据。我们也可以自定义一个装饰器去完成同样的事情。像下面这样：
```ts
import 'reflect-metadata';

function Role(name: string): ClassDecorator {
  return target => {
    Reflect.defineMetadata('role', name, target);
  };
}

@Role('admin')
class Post {}

const metadata = Reflect.getMetadata('role', Post);

console.log(metadata);
```
Role 是自定义的一个装饰器，接收一个 name 参数，这是一个装饰器工厂，返回的是 ClassDecorator。返回的东西应该是个适合在类上使用的装饰器，所以接收一个 target 参数，这个东西就是类的构造方法。在方法里用 Reflect.defineMetadata 方法设置了一个自定义的元数据叫 role，对应的值是 name，也就是使用这个装饰器的时候提供的参数值，第三个参数是 target，就是要添加元数据的那个类。

有了这个自定义的装饰器，使用它的时候可以像这样： @Role('admin')，功能就是在它装饰的类的上面添加了一条叫 role 的元数据，设置的对应的值是 admin。
