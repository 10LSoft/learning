/*
  * O padrão mediator permite a notificação de vários objetos por meio de um,
  * através de uma interface (O mediator). Servindo como meio de comunicação
  * entre os objetos.
*/

// Mediator
class Tree {
  constructor () {
    this.branches = []
  }

  addBranch (branch) {
    this.branches.push(branch)
    branch.setTree(this)
  }

  removeBranch (branch) {
    const branchIndex = this.branches.indexOf(branch)

    if (branchIndex !== -1) {
      this.branches.splice(branchIndex, 1)
    }

    return this.branches
  }

  notifyBranches (sender, message) {
    this.branches.forEach(branch => {
      if (branch !== sender) {
        branch.reciveNotification(message)
      }
    })
  }
}

class Branch {
  constructor (name) {
    this.name = name
    this.tree = null
  }

  setTree (tree) {
    this.tree = tree
  }

  sendNotification (message) {
    console.log(`${this.name} enviou uma notificação: ${message}`)
    this.tree.notifyBranches(this, message)
  }

  reciveNotification (message) {
    console.log(`${this.name} recebeu uma notificação: ${message}`)
  }
}

const tree = new Tree()

const branch1 = new Branch('branch 1')
const branch2 = new Branch('branch 2')

tree.addBranch(branch1)
tree.addBranch(branch2)

branch1.sendNotification('Evento de recebimento de água')

// branch 1 enviou uma notificação: Evento de recebimento de água
// branch 2 recebeu uma notificação: Evento de recebimento de água
