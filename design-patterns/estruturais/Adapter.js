/**
 * O padrão Adapter tem como proposta fornecer uma maneira de conectar sistemas
 * incompatíveis, de modo que a chamada original tenha outro escopo, mas que
 * isso seja o mais transparente possível.
 * */

class OldSystem {
  legacyRequest () {
    console.log('call inside the old system')
  }
}

class NewSystem {
  newRequest () {
    console.log('call for new system')
  }
}

class Adapter {
  constructor (NewSystem) {
    this.newSystem = new NewSystem()
  }

  legacyRequest () {
    return this.newSystem.newRequest()
  }
}

class SystemRunner {
  constructor (systemObject) {
    this.systemObject = systemObject
    this.runSystem()
  }

  runSystem () {
    this.systemObject.legacyRequest()
  }
}

// old way to run the system
const oldSystem = new OldSystem()
new SystemRunner(oldSystem)

// if I just change the object passed through the constructor of old system then I got a new way to run the system
// but the new system has an incompatible interface and there is the way when adapter comes!
const adapter = new Adapter(NewSystem)
new SystemRunner(adapter)
