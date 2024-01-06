class Subject {
  constructor () {
    this.observers = []
  }

  addObserver (observer) {
    this.observers.push(observer)
  }

  removeObserver (observer) {
    this.observers = this.observers.filter(observerItem => observerItem !== observer)
  }

  notifyObservers () {
    this.observers.forEach(item => item.update())
  }
}

class Observer {
  constructor (id) {
    this.id = id
  }

  update () {
    console.log(`Object ${this.id} was notified`)
  }
}

const obj1 = new Observer(1)
const obj2 = new Observer(2)
const obj3 = new Observer(3)
const obj4 = new Observer(4)

const subject = new Subject()

subject.addObserver(obj1)
subject.addObserver(obj2)
subject.addObserver(obj3)
subject.addObserver(obj4)

subject.notifyObservers()
