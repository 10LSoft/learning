/**
 * O padrão Protype tem como objetivo a criação de um clone de determinado
 * objeto, mas que poderá ser alterado conforme necessário.
 *
 * O exemplo abaixo demonstra a clonagem por cópia rasa, mas  outras estratégias
 * de cópia podem ser usadas para a composição mais profunda do clone gerado
 * pelo padrão.
 * */

class Animal {
  constructor (name, category) {
    this.name = name
    this.category = category
  }

  clone () {
    return { ...this }
  }
}

const originalDog = new Animal('Rex', 'Dog')
const cloneDog = originalDog.clone()

console.log(originalDog)
console.log(cloneDog)

cloneDog.name = 'Buddy'

console.log(originalDog)
console.log(cloneDog)
