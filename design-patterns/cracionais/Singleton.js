class Singleton {
  constructor () {
    if (Singleton.instance) {
      return Singleton.instance
    }

    this.someProperty = 'I am a singleton instance'
    Singleton.instance = this

    return this
  }

  someMethod () {
    console.log(this.someProperty)
  }
}

const obj1 = new Singleton()
const obj2 = new Singleton()

obj1.someMethod()
obj2.someProperty = 'Now I get another value inside property'
obj1.someMethod()

console.log(obj1 === obj2)
