import "reflect-metadata";

// @Reflect.metadata("role", "admin")
// class Post {}

// const metadata = Reflect.getMetadata("role", Post);

// console.log(metadata);




function Role(name: string): ClassDecorator {
  return target => {
    Reflect.defineMetadata('role', name, target);
  };
}

@Role('admin')
class Post {}

const metadata = Reflect.getMetadata('role', Post);

console.log(metadata);