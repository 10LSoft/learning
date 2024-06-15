/**
 * Por algum motivo em dados momentos é necessário fazer um mapeamento de escopo no Javascript.
 * Para isto nós usamos o bind. Funciona assim:
 * Primeira indicamos que uma chamada a um valor específico irá acionar uma função que estará sendo
 * bindada dentro do escopo superior e passando o this para o bind desta função, de modo que quando
 * chamarmos esta função, o que teremos neste caso é uma chamada ao bind que injeta o this nessa
 * função e nos permite que se faça o acesso da mesma no interior da função chamada. Vamos ver um
 * exemplo de um objeto que possui uma função em seu interior e que tenta acessar itens de fora
 * dela com o this:
 **/

const person = {
  name: 'José da Silva',
  age: 44,
  isMajor: function() {
    if (this.age > 18) {
      console.log(`O usuário ${this.name} é maior de idade`)
      return
    }

    console.log(`O usuário ${this.name} não é maior de idade`)
  }
}

const functionWithoutBind = person.isMajor
const onlyFunction = person.isMajor.bind(person)

functionWithoutBind()
onlyFunction()
