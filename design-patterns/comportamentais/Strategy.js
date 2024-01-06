class Strategy1 {
  runStrategy () {
    return 'running strategy 1'
  }
}

class Strategy2 {
  runStrategy () {
    return 'running strategy 2'
  }
}

class Strategy3 {
  runStrategy () {
    return 'running strategy 3'
  }
}

class Context {
  run () {
    console.log(this.strategy.runStrategy())
  }

  setStrategy (Strategy) {
    this.strategy = new Strategy()
  }
}

const context = new Context()

context.setStrategy(Strategy1)
context.run()

context.setStrategy(Strategy2)
context.run()

context.setStrategy(Strategy3)
context.run()
